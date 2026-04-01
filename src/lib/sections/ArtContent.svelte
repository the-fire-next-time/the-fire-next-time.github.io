<script lang="ts">
	import Gallery from '$lib/Gallery.svelte';
	import obeMandarin from '$lib/assets/images/obe-1.jpg';
	import obeBeyondMandarin from '$lib/assets/images/obe-2.jpg';
	import obeJapanese from '$lib/assets/images/obe-3.jpg';
	import pin1 from '$lib/assets/images/pin-1.JPG';
	import pin2 from '$lib/assets/images/pin-2.JPG';
	import pin3 from '$lib/assets/images/pin-3.JPG';
	import pin4 from '$lib/assets/images/pin-4.JPG';
	import pin5 from '$lib/assets/images/pin-5.JPG';
	import oc1 from '$lib/assets/images/oc-1.jpg';
	import oc2 from '$lib/assets/images/oc-2.jpg';
	import oc3 from '$lib/assets/images/oc-3.jpg';
	import oc4 from '$lib/assets/images/oc-4.jpg';
	import oc5 from '$lib/assets/images/oc-5.jpg';
	import oc6 from '$lib/assets/images/oc-6.jpg';

	const images = {
		obe: {
			cover: { alt: 'Orange Blossom Education - Mandarin', src: obeMandarin },
			items: [
				{ alt: 'Orange Blossom Education - Mandarin', src: obeMandarin },
				{ alt: 'Orange Blossom Education - Beyond Mandarin', src: obeBeyondMandarin },
				{ alt: 'Orange Blossom Education - Japanese', src: obeJapanese }
			]
		},
		pins: {
			cover: { alt: 'Pins - Angle 1', src: pin1 },
			items: [
				{ alt: 'Pins - Angle 1', src: pin1 },
				{ alt: 'Pins - Angle 2', src: pin2 },
				{ alt: 'Pins - Angle 3', src: pin3 },
				{ alt: 'Pins - Angle 4', src: pin4 },
				{ alt: 'Pins - Angle 5', src: pin5 }
			]
		},
		original: {
			cover: { alt: 'Original Characters #1', src: oc1 },
			items: [
				{ alt: 'Original Characters #1', src: oc1 },
				{ alt: 'Original Characters #2', src: oc2 },
				{ alt: 'Original Characters #3', src: oc3 },
				{ alt: 'Original Characters #4', src: oc4 },
				{ alt: 'Original Characters #5', src: oc5 },
				{ alt: 'Original Characters #6', src: oc6 }
			]
		}
	};
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

<Gallery cover={images.obe.cover} items={images.obe.items} />

<hr class="my-8" />

<div class="prose">
	<p>
		<li><b>LGBTQ Pin Set Design</b><br />2025</li>
	</p>
</div>

<Gallery cover={images.pins.cover} items={images.pins.items} />

<hr class="my-8" />

<div class="prose">
	<p>
		<li><b>Original Characters</b><br />2025</li>
	</p>
</div>

<Gallery cover={images.original.cover} items={images.original.items} />
