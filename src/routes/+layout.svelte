<script lang="ts">
  import { page } from '$app/state';
  import { fade } from 'svelte/transition';
  import Header from '$lib/components/molecules/Header.svelte';
  import Nav from '$lib/components/molecules/Nav.svelte';

  import 'virtual:uno.css';
  import '../app.css';
  import { onMount } from 'svelte';
  import { afterNavigate } from '$app/navigation';
  import MobileNav from '$lib/components/molecules/MobileNav.svelte';

  let { children } = $props();

  let x = $state(0);
  let y = $state(0);
  let hovering = $state(false);
  let navMobile = $state(false);

  function handleMouseMove(event: MouseEvent) {
    x = event.clientX;
    y = event.clientY;
  }

  onMount(() => {
    afterNavigate(() => {
      navMobile = false;
    });
  });
</script>

<div
  relative
  font-sans
  text="lg primary"
  p="x-5 t-5"
  grid="~ cols-3"
  class="grid-rows-[auto_1fr] dark:bg-dark"
  h-screen
  overflow-hidden
>
  <!-- header -->
  <div sticky col-span-3>
    <Header bind:showMobileMenu={navMobile} />
  </div>

  <!-- navigation -->
  <MobileNav shouldExpand={navMobile} />
  <div class="hidden lg:block lg:row-span-2">
    <Nav />
  </div>

  <main
    relative
    col-span-3
    class="lg:col-span-2"
    class:cursor-none={hovering}
    onmousemove={handleMouseMove}
    onmouseenter={() => (hovering = true)}
    onmouseleave={() => (hovering = false)}
  >
    {#key page.url.pathname}
      <div absolute z-0 in:fade out:fade h-full w-full overflow-y-scroll scrollbar-none>
        <div mt-34>
          {@render children()}
        </div>
        <!-- <footer w-full border="t-2 primary">雾中风景, 2025</footer> -->
      </div>
    {/key}
    {#if hovering}
      <div z-20 class="cursor hidden lg:block" style="top: {y}px; left: {x}px;"></div>
    {/if}
    <div z-20 class="cursor lg:hidden top-1/2 left-full"></div>
  </main>
</div>

<style>
  .cursor {
    pointer-events: none;
    position: fixed;
    width: 15em;
    height: 15em;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255, 255, 255, 1) 0%, transparent 70%);
    mix-blend-mode: difference;
  }
</style>
