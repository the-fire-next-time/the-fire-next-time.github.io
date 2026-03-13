<script lang="ts">
	import PhysicsScene from '$lib/PhysicsScene.svelte';
</script>

<svelte:head>
	<title>Coming Soon</title>
	<meta name="description" content="Something exciting is coming. Stay tuned." />
</svelte:head>

<div>
	<PhysicsScene texts={[{ text: 'COMING SOON', color: '#000000', startYRatio: 0.3 }]} />
	<div class="fixed inset-2 flex items-center">
		<div>
			<p>Lorraine Pan.</p>
			<br />
			<p>Writer</p>
			<p>& Graphics Designer.</p>
		</div>
	</div>
</div>
