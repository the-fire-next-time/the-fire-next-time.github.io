<script lang="ts">
  import { page } from '$app/state';
  import { fade } from 'svelte/transition';
  import Header from '$lib/components/molecules/Header.svelte';
  import Nav from '$lib/components/molecules/Nav.svelte';
  import MobileNav from '$lib/components/molecules/MobileNav.svelte';

  import 'virtual:uno.css';
  import '../app.css';
  import { onMount } from 'svelte';
  import { afterNavigate } from '$app/navigation';
  import { getBooksByLocale } from '$lib/sanity/fetch';
  import { useState } from '$lib/state.svelte';
  import Cursor from '$lib/components/atoms/Cursor.svelte';
  import { cursor } from '$lib/actions/useCursor.svelte';

  let { children, data } = $props();

  let navMobile = $state(false);
  let container: HTMLElement;

  onMount(() => {
    afterNavigate(() => {
      navMobile = false;
      // container.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // available books for the current locale
  const books = $derived(getBooksByLocale(data.books, useState.locale));
</script>

<div
  relative
  h-auto
  font-sans
  text="lg primary"
  p="x-5"
  class="dark:bg-dark lg:t-5"
  bind:this={container}
  {@attach cursor}
>
  <!-- header -->
  <div sticky top-0 h-10 w-full z-20>
    <Header bind:showMobileMenu={navMobile} />
  </div>

  <div flex relative>
    <!-- navigation -->
    <MobileNav class="lg:hidden" shouldExpand={navMobile} />
    <div class="hidden lg:block w-1/3 h-auto" relative sticky top-4 flex-none self-start>
      <Nav {books} />
    </div>

    <main relative min-h-dvh class="w-full lg:w-2/3 dark:bg-dark">
      {#key page.url.pathname}
        <div in:fade={{ duration: 500 }}>
          <div mt-34>
            {@render children()}
          </div>
          <!-- <footer w-full border="t-2 primary">雾中风景, 2025</footer> -->
        </div>
      {/key}
      <!-- Custom cursor -->
      <Cursor />
    </main>
  </div>
</div>
