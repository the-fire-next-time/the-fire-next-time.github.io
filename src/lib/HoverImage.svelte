<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		/** The image path to display on hover (must be a static asset importable by enhanced:img) */
		src: string;
		/** Alt text for the image */
		alt?: string;
		/** Explicit left position (px or any CSS unit). If omitted, a random position is chosen. */
		left?: string;
		/** Explicit top position (px or any CSS unit). If omitted, a random position is chosen. */
		top?: string;
		/** Max-width of the rendered image. Default: 240px */
		width?: string;
		/** The trigger element(s) */
		children: Snippet;
	}

	let { src, alt = '', left, top, width = '240px', children }: Props = $props();

	let visible = $state(false);
	let resolvedLeft = $state('0px');
	let resolvedTop = $state('0px');
	let wrapperEl = $state<HTMLElement | null>(null);

	function randomBetween(min: number, max: number) {
		return Math.random() * (max - min) + min;
	}

	function show() {
		if (left !== undefined) {
			resolvedLeft = left;
		} else {
			// Random horizontal position: 5%–65% relative to viewport width,
			// so the image stays comfortably on-screen for most widths.
			resolvedLeft = `${randomBetween(5, 65)}vw`;
		}

		if (top !== undefined) {
			resolvedTop = top;
		} else {
			// Random vertical position: 10%–55% relative to viewport height.
			resolvedTop = `${randomBetween(10, 55)}vh`;
		}

		visible = true;
	}

	function hide() {
		visible = false;
	}
</script>

<!--
	Wrap the trigger slot in a relatively-positioned container so that
	absolute children work correctly when explicit px values are intended
	to be relative to this wrapper rather than the viewport.

	The floating image is placed relative to the *fixed* viewport so it
	can escape any overflow-hidden ancestor if needed.
-->
<span
	bind:this={wrapperEl}
	class="hover-image-trigger"
	onmouseenter={show}
	onmouseleave={hide}
	onfocus={show}
	onblur={hide}
>
	{@render children()}

	{#if visible}
		<span
			class="hover-image-float z-20"
			style:left={resolvedLeft}
			style:top={resolvedTop}
			style:width
		>
			<enhanced:img {src} {alt} class="hover-image-img" />
		</span>
	{/if}
</span>

<style>
	.hover-image-trigger {
		position: relative;
		display: inline;
	}

	.hover-image-float {
		position: fixed;
		pointer-events: none;
		user-select: none;
		/* animation: hoverImageAppear 150ms cubic-bezier(0.2, 0, 0, 1) both; */
	}

	.hover-image-img {
		width: 100%;
		height: auto;
		display: block;
	}

	@keyframes hoverImageAppear {
		from {
			opacity: 0;
			transform: scale(0.94) translateY(6px);
		}
		to {
			opacity: 1;
			transform: scale(1) translateY(0);
		}
	}
</style>
