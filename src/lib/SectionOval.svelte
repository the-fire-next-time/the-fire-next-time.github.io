<script lang="ts">
	import type { Snippet } from 'svelte';
	import ArrowDownOutline from 'flowbite-svelte-icons/ArrowDownOutline.svelte';

	interface Props {
		title: string;
		color: string;
		isExpanded: boolean;
		isAnyExpanded: boolean;
		onToggle: () => void;
		summary: Snippet;
		content: Snippet;
		dark: boolean;
	}

	let { title, color, dark, isExpanded, isAnyExpanded, onToggle, summary, content }: Props =
		$props();

	let isHovered = $state(false);

	let textColor = $derived(dark ? '#ffffff' : '#000000');
</script>

<div
	class="section-column"
	class:expanded={isExpanded}
	class:scroll={isExpanded}
	class:squished={isAnyExpanded && !isExpanded}
	role="tab"
	tabindex="0"
	onmouseenter={() => (isHovered = true)}
	onmouseleave={() => (isHovered = false)}
>
	<!-- The oval/shape -->
	<div
		class="section-shape"
		style:background-color={color}
		role="button"
		tabindex="0"
		onclick={onToggle}
		onkeydown={(e) => {
			if (e.key === 'Enter' || e.key === ' ') onToggle();
		}}
	>
		<!-- Hover title (visible on hover when not expanded, always visible on mobile) -->
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
				<div class="mt-8 flex justify-end" style:color={textColor}>
					<ArrowDownOutline class="h-8 w-8 shrink-0 opacity-80" />
				</div>
			</div>
		{/if}
	</div>

	<!-- Overflow content (below the shape, visible when expanded) -->
	{#if isExpanded}
		<div class="overflow-content mt-8">
			{@render content()}
		</div>

		<footer class="mt-8 flex flex-col pt-8 text-right">
			<hr class="mb-4" />
			<a href="mailto:lorrainepan@gmail.com" class="hover:underline">Email</a>
			<a href="https://www.instagram.com/1lorrainepan/" class="hover:underline">Instagram</a>
			<a href="https://ca.linkedin.com/in/lorraine-pan-1132442b4" class="hover:underline"
				>LinkedIn</a
			>
		</footer>
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

	/* ── Mobile: vertical stacking ── */
	@media (max-width: 768px) {
		.section-column {
			flex: none;
			height: auto;
			width: 100%;
			padding-top: 0;
			align-items: stretch;
			transition: none;
		}

		.section-column.expanded {
			flex: none;
			cursor: default;
			align-items: stretch;
		}

		.section-column.squished {
			flex: none;
		}
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

	/* ── Mobile: landscape ellipse, expands vertically ── */
	@media (max-width: 768px) {
		.section-shape {
			min-height: 80px;
			max-height: 80px;
			width: 100%;
			border-radius: 50%;
			transition:
				border-radius var(--duration-expand) var(--ease-emphasized),
				min-height var(--duration-expand) var(--ease-emphasized),
				max-height var(--duration-expand) var(--ease-emphasized);
		}

		.expanded .section-shape {
			border-radius: 24px;
			min-height: 30vh;
			max-height: none;
			align-items: flex-start;
			justify-content: flex-start;
		}
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

	/* On mobile, always show the title (no hover on touch) */
	@media (max-width: 768px) {
		.section-title {
			opacity: 1;
			transform: scale(1);
			font-size: 1.25rem;
		}
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
