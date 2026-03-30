<script lang="ts">
	import SectionOval from '$lib/SectionOval.svelte';
	import AboutContent from '$lib/sections/AboutContent.svelte';
	import WritingsContent from '$lib/sections/WritingsContent.svelte';
	import ActivismContent from '$lib/sections/ActivismContent.svelte';
	import ArtContent from '$lib/sections/ArtContent.svelte';

	const sections = [
		{ id: 'about', title: 'About', color: 'var(--color-about)' },
		{ id: 'writings', title: 'Writings', color: 'var(--color-writings)' },
		{ id: 'activism', title: 'Activism', color: 'var(--color-activism)' },
		{ id: 'art', title: 'Art', color: 'var(--color-art)' }
	] as const;

	let expandedSection = $state<string | null>(null);

	function toggleSection(id: string) {
		expandedSection = expandedSection === id ? null : id;
	}
</script>

<svelte:head>
	<title>Lorraine Pan</title>
	<meta
		name="description"
		content="Lorraine Pan — writer, activist, and graphic designer."
	/>
</svelte:head>

<div class="page-wrapper">
	<!-- Fixed sidebar -->
	<aside class="sidebar">
		<div class="sidebar-content">
			<h1 class="site-title">Lorraine Pan</h1>
			<p class="site-email">lorrainepan [at] gmail [dot] com</p>
		</div>
	</aside>

	<!-- Main content area with sections -->
	<main class="content-area">
		<div class="sections-row">
			{#each sections as section (section.id)}
				<SectionOval
					title={section.title}
					color={section.color}
					isExpanded={expandedSection === section.id}
					isAnyExpanded={expandedSection !== null}
					onToggle={() => toggleSection(section.id)}
				>
					{#if section.id === 'about'}
						<AboutContent />
					{:else if section.id === 'writings'}
						<WritingsContent />
					{:else if section.id === 'activism'}
						<ActivismContent />
					{:else if section.id === 'art'}
						<ArtContent />
					{/if}
				</SectionOval>
			{/each}
		</div>
	</main>
</div>

<style>
	.page-wrapper {
		display: flex;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
	}

	.sidebar {
		width: var(--sidebar-width);
		flex-shrink: 0;
		display: flex;
		align-items: center;
		padding: 3rem;
		box-sizing: border-box;
	}

	.sidebar-content {
		position: sticky;
		top: 50%;
	}

	.site-title {
		font-size: 2rem;
		font-weight: 400;
		margin: 0 0 0.5rem 0;
		line-height: 1.2;
	}

	.site-email {
		font-size: 0.85rem;
		color: #666;
		margin: 0;
		font-family: monospace;
	}

	.content-area {
		width: var(--content-width);
		height: 100vh;
		overflow: hidden;
	}

	.sections-row {
		display: flex;
		gap: 0;
		height: 100%;
		align-items: center;
		padding: 3rem 2rem;
		box-sizing: border-box;
	}
</style>
