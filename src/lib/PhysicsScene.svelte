<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	export interface TextConfig {
		text: string;
		color: string;
		/** 0–1 fraction of viewport height where letters spawn. Default: 0.5 */
		startYRatio?: number;
		/** Multiplier on the base font size. Default: 1.0 */
		sizeFactor?: number;
	}

	let { texts }: { texts: TextConfig[] } = $props();

	let canvas: HTMLCanvasElement;
	let container: HTMLDivElement;

	const RESTITUTION = 0.45;
	const FRICTION = 0.25;
	const WALL_THICKNESS = 60;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let Matter: any;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let engine: any;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let runner: any;
	let renderCtx: CanvasRenderingContext2D | null = null;
	let animFrameId: number | null = null;
	let resizeTimeout: ReturnType<typeof setTimeout> | null = null;

	interface LetterBody {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		body: any;
		char: string;
		fontSize: number;
		color: string;
	}
	let letterBodies: LetterBody[] = [];

	function getBaseFontSize(width: number): number {
		return Math.max(52, Math.min(160, Math.round(width * 0.12)));
	}

	function measureChar(char: string, font: string): { w: number; h: number } {
		const offscreen = document.createElement('canvas');
		const ctx = offscreen.getContext('2d')!;
		ctx.font = font;
		const m = ctx.measureText(char);
		const w = m.width;
		const h = (m.actualBoundingBoxAscent ?? 0) + (m.actualBoundingBoxDescent ?? 0);
		return { w: Math.ceil(w), h: Math.ceil(h) || Math.round(parseInt(font) * 0.8) };
	}

	function spawnTextLine(config: TextConfig, W: number, H: number) {
		const baseFontSize = getBaseFontSize(W);
		const fontSize = Math.round(baseFontSize * (config.sizeFactor ?? 1.0));
		const font = `bold ${fontSize}px Helvetica, Arial, sans-serif`;
		const startY = H * (config.startYRatio ?? 0.5);
		const { color } = config;

		const chars = config.text.split('');
		const sizes = chars.map((c) =>
			c === ' ' ? { w: fontSize * 0.35, h: fontSize * 0.8 } : measureChar(c, font)
		);
		const totalWidth = sizes.reduce((acc, s) => acc + s.w, 0) + (chars.length - 1) * 4;
		let x = Math.max(10, (W - totalWidth) / 2);

		chars.forEach((char, i) => {
			const { w, h } = sizes[i];
			const cx = x + w / 2;
			x += w + 4;

			if (char === ' ') return;

			const body = Matter.Bodies.rectangle(
				cx + (Math.random() - 0.5) * 20,
				startY,
				w * 0.85,
				h * 0.9,
				{
					restitution: RESTITUTION,
					friction: FRICTION,
					frictionAir: 0.01,
					density: 0.002,
					angle: (Math.random() - 0.5) * 0.3,
					label: char,
					sleepThreshold: 60
				}
			);

			Matter.Composite.add(engine.world, body);
			letterBodies.push({ body, char, fontSize, color });
		});
	}

	function init() {
		if (!Matter || !canvas || !container) return;

		const W = container.clientWidth;
		const H = container.clientHeight;
		canvas.width = W;
		canvas.height = H;
		renderCtx = canvas.getContext('2d');

		engine = Matter.Engine.create({ gravity: { x: 0, y: 1.8 }, enableSleeping: true });
		runner = Matter.Runner.create();

		// Invisible walls
		Matter.Composite.add(engine.world, [
			Matter.Bodies.rectangle(W / 2, H + WALL_THICKNESS / 2, W * 2, WALL_THICKNESS, {
				isStatic: true,
				friction: 0.5
			}),
			Matter.Bodies.rectangle(-WALL_THICKNESS / 2, H / 2, WALL_THICKNESS, H * 2, {
				isStatic: true
			}),
			Matter.Bodies.rectangle(W + WALL_THICKNESS / 2, H / 2, WALL_THICKNESS, H * 2, {
				isStatic: true
			})
		]);

		letterBodies = [];
		for (const config of texts) {
			spawnTextLine(config, W, H);
		}

		// Mouse drag interaction
		const mouse = Matter.Mouse.create(canvas);
		Matter.Composite.add(
			engine.world,
			Matter.MouseConstraint.create(engine, {
				mouse,
				constraint: { stiffness: 0.2, render: { visible: false } }
			})
		);

		Matter.Runner.run(runner, engine);
		drawLoop();
	}

	function drawLoop() {
		if (!renderCtx || !canvas) return;
		renderCtx.clearRect(0, 0, canvas.width, canvas.height);

		for (const { body, char, fontSize, color } of letterBodies) {
			renderCtx.save();
			renderCtx.translate(body.position.x, body.position.y);
			renderCtx.rotate(body.angle);
			renderCtx.font = `bold ${fontSize}px Helvetica, Arial, sans-serif`;
			renderCtx.fillStyle = color;
			renderCtx.textAlign = 'center';
			renderCtx.textBaseline = 'middle';
			renderCtx.fillText(char, 0, 0);
			renderCtx.restore();
		}

		animFrameId = requestAnimationFrame(drawLoop);
	}

	function destroy() {
		if (!browser) return;
		if (animFrameId !== null) {
			cancelAnimationFrame(animFrameId);
			animFrameId = null;
		}
		if (runner && Matter) Matter.Runner.stop(runner);
		if (engine && Matter) {
			Matter.Composite.clear(engine.world, false);
			Matter.Engine.clear(engine);
		}
		letterBodies = [];
	}

	function handleResize() {
		if (resizeTimeout !== null) clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(() => {
			destroy();
			init();
		}, 150);
	}

	onMount(async () => {
		Matter = (await import('matter-js')).default;
		init();
		window.addEventListener('resize', handleResize);
	});

	onDestroy(() => {
		destroy();
		if (browser) {
			window.removeEventListener('resize', handleResize);
			if (resizeTimeout !== null) clearTimeout(resizeTimeout);
		}
	});
</script>

<div bind:this={container} class="scene">
	<canvas bind:this={canvas}></canvas>
</div>

<style>
	.scene {
		position: fixed;
		inset: 0;
		overflow: hidden;
		z-index: 2;
	}

	canvas {
		display: block;
		width: 100%;
		height: 100%;
	}
</style>
