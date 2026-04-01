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

<div class="prose">
	<p>
		<em>Super Rabbit Person</em> is my first original character from my early attempts at drawing as a
		teenager. Inspired by artists such as Michael DeForge and Charles Schulz, my illustration is a way
		for me to express my observations, understanding, and experiences as a neurodivergent queer youth.
	</p>
	<p>
		I am also a freelance graphic designer. Building on this practical foundation, I now apply my
		academic background in gender equity and feminist advocacy to my design practice. My work
		focuses on helping programs and organisations clearly communicate their social justice values
		and demands through visual language. I provide social media post design, posters and flyers, and
		visual campaign strategies. I also offer design and promotional support for independent artists
		and organisations.
	</p>
	<p>
		I provide discounted rates for projects that are grounded in social justice, equity, and
		community advocacy.
	</p>

	<h3>Selected Works</h3>
	<p>
		<li>
			<b>Commissioned Poster Design for Orange Blossom Education</b><br />
			2025 - 2026
		</li>
	</p>
</div>

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
