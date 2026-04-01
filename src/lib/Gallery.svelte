<script lang="ts">
	import type { ImgType } from 'flowbite-svelte';
	import { Gallery } from 'flowbite-svelte';
	interface Props {
		cover: ImgType;
		items: ImgType[];
	}

	let { cover, items }: Props = $props();

	let main = $state<ImgType>(cover);
</script>

<Gallery class="gap-4">
	<!-- MAIN IMAGE -->
	<enhanced:img
		src={main.src}
		alt={main.alt}
		class="h-[600px] w-full rounded-lg bg-gray-100 object-cover"
	/>

	<!-- THUMBNAILS -->
	<Gallery class="grid-cols-5" {items} {figure} />

	{#snippet figure(item)}
		<button
			type="button"
			class="cursor-pointer rounded-lg border-0 bg-transparent p-0 hover:opacity-80"
			onclick={() => (main = item)}
		>
			<enhanced:img src={item.src} alt={item.alt} class="h-[100px] rounded-lg object-cover" />
		</button>
	{/snippet}
</Gallery>
