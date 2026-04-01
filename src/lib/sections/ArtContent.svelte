<script lang="ts">
	import { Gallery } from 'flowbite-svelte';
	import type { ImgType } from 'flowbite-svelte';

	const image1 = {
		alt: 'erbology',
		src: 'https://flowbite.s3.amazonaws.com/docs/gallery/featured/image.jpg'
	};

	const images2 = [
		{ alt: 'shoes', src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg' },
		{ alt: 'small bag', src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg' },
		{ alt: 'plants', src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg' },
		{ alt: 'watch', src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg' },
		{ alt: 'shoe', src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg' }
	];

	let main = $state<ImgType>({
		alt: image1.alt,
		src: image1.src
	});
</script>

<Gallery class="gap-4">
	<!-- MAIN IMAGE -->
	<img src={main.src} alt={main.alt} class="h-[450px] w-full rounded-lg bg-gray-100 object-cover" />

	<!-- THUMBNAILS -->
	<Gallery class="grid-cols-5" items={images2} {figure} />

	{#snippet figure(item)}
		<button
			type="button"
			class="cursor-pointer rounded-lg border-0 bg-transparent p-0 hover:opacity-80"
			onclick={() => (main = item)}
		>
			<img src={item.src} alt={item.alt} class="rounded-lg" />
		</button>
	{/snippet}
</Gallery>

<div class="section-content art-content">
	<p class="mb-8 text-lg leading-relaxed">
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cum sociis natoque penatibus et magnis
		dis parturient montes, nascetur ridiculus mus.
	</p>

	<div class="mt-12 grid grid-cols-2 gap-6">
		<div class="aspect-square rounded-lg bg-white/10"></div>
		<div class="aspect-square rounded-lg bg-white/10"></div>
		<div class="aspect-square rounded-lg bg-white/10"></div>
		<div class="aspect-square rounded-lg bg-white/10"></div>
	</div>

	<div class="mt-12">
		<p class="text-base leading-relaxed text-white/80">
			Donec sed odio dui. Maecenas faucibus mollis interdum. Nullam quis risus eget urna mollis
			ornare vel eu leo.
		</p>
	</div>

	<footer class="mt-24 border-t border-white/20 pt-8 text-right">
		<p><a href="mailto:lorrainepan@gmail.com" class="hover:underline">Email</a></p>
		<p><a href="#" class="hover:underline">Instagram</a></p>
		<p><a href="#" class="hover:underline">LinkedIn</a></p>
	</footer>
</div>
