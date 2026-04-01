<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		title: string;
		color: string;
		isExpanded: boolean;
		isAnyExpanded: boolean;
		onToggle: () => void;
		summary: Snippet;
		content: Snippet;
	}

	let { title, color, isExpanded, isAnyExpanded, onToggle, summary, content }: Props = $props();

	let isHovered = $state(false);

	// Determine text color based on background luminance
	function isDark(hex: string): boolean {
		const c = hex.replace('#', '');
		const r = parseInt(c.substring(0, 2), 16);
		const g = parseInt(c.substring(2, 4), 16);
		const b = parseInt(c.substring(4, 6), 16);
		const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
		return luminance < 0.5;
	}

	let textColor = $derived(isDark(color) ? '#ffffff' : '#000000');
</script>

<div
	class="section-column"
	class:expanded={isExpanded}
	class:scroll={isExpanded}
	class:squished={isAnyExpanded && !isExpanded}
	role="button"
	tabindex="0"
	onclick={onToggle}
	onkeydown={(e) => {
		if (e.key === 'Enter' || e.key === ' ') onToggle();
	}}
	onmouseenter={() => (isHovered = true)}
	onmouseleave={() => (isHovered = false)}
>
	<!-- The oval/shape -->
	<div class="section-shape" style:background-color={color}>
		<!-- Hover title (visible on hover when not expanded) -->
		{#if !isExpanded}
			<span class="section-title" class:visible={isHovered} style:color={textColor}>
				{title}
			</span>
		{/if}

		<!-- Expanded header + content preview -->
		{#if isExpanded}
			<div class="expanded-header" style:color={textColor}>
				<h2 class="expanded-title">{title}</h2>
				<div
					class="expanded-content flex items-end justify-end [&_p]:w-3/4"
					style:color={textColor}
				>
					{@render summary()}
				</div>
				<div class="scroll-hint" style:color={textColor}>
					<span class="scroll-arrow">↓</span>
				</div>
			</div>
		{/if}
	</div>

	<!-- Overflow content (below the shape, visible when expanded) -->
	{#if isExpanded}
		<div class="overflow-content">
			{@render content()}
		</div>
	{/if}
</div>

<style>
	.section-column {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100%;
		min-width: 0;
		padding-top: 10rem;
		cursor: pointer;
		transition:
			flex var(--duration-expand) var(--ease-emphasized),
			min-width var(--duration-expand) var(--ease-emphasized);
		outline: none;
	}

	.section-column.expanded {
		flex: 3;
		cursor: default;
		align-items: stretch;
	}

	.section-column.squished {
		flex: 0.6;
	}

	.section-shape {
		position: relative;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		/* Default: tall ellipse */
		border-radius: 50%;
		min-height: 60vh;
		transition:
			border-radius var(--duration-expand) var(--ease-emphasized),
			min-height var(--duration-expand) var(--ease-emphasized),
			width var(--duration-expand) var(--ease-emphasized);
	}

	.expanded .section-shape {
		border-radius: 24px;
		min-height: 60vh;
		align-items: flex-start;
		justify-content: flex-start;
	}

	/* ── Hover title ── */
	.section-title {
		font-size: 1.75rem;
		font-weight: 400;
		opacity: 0;
		transform: scale(0.92);
		transition:
			opacity var(--duration-fade) ease,
			transform var(--duration-fade) ease;
		pointer-events: none;
		user-select: none;
	}

	.section-title.visible {
		opacity: 1;
		transform: scale(1);
	}

	/* ── Expanded content ── */
	.expanded-header {
		padding: 2.5rem;
		width: 100%;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		min-height: 100%;
		animation: contentFadeIn var(--duration-expand) var(--ease-emphasized) forwards;
	}

	.expanded-title {
		font-size: 1.75rem;
		font-weight: 400;
		margin: 0 0 2rem 0;
	}

	.expanded-content {
		flex: 1;
		font-size: 1rem;
		line-height: 1.6;
	}

	.scroll-hint {
		text-align: end;
		padding: 1rem 0;
		opacity: 0.6;
	}

	.scroll-arrow {
		font-size: 1.5rem;
	}

	.overflow-content {
		width: 100%;
		padding: 1rem;
	}

	@keyframes contentFadeIn {
		from {
			opacity: 0;
			transform: translateY(12px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
