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
  let container: HTMLElement;

  function handleMouseMove(event: MouseEvent) {
    x = event.clientX;
    y = event.clientY;
  }

  onMount(() => {
    afterNavigate(() => {
      navMobile = false;
      container.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
</script>

<div
  relative
  font-sans
  text="lg primary"
  p="x-5"
  class="dark:bg-dark lg:t-5"
  h-dvh
  overflow-y-scroll
  scrollbar-none
  bind:this={container}
>
  <!-- header -->
  <div sticky top-0 h-10 w-full z-30>
    <Header bind:showMobileMenu={navMobile} />
  </div>

  <div flex relative>
    <!-- navigation -->
    <MobileNav shouldExpand={navMobile} />
    <div class="hidden lg:block w-1/3" h-full relative>
      <div fixed class="w-1/3">
        <Nav />
      </div>
    </div>

    <main
      relative
      class:cursor-none={hovering}
      class="w-full lg:w-2/3 dark:bg-dark"
      onmousemove={handleMouseMove}
      onmouseenter={() => (hovering = true)}
      onmouseleave={() => (hovering = false)}
    >
      {#key page.url.pathname}
        <div absolute z-0 in:fade out:fade>
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
