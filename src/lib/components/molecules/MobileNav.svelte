<script lang="ts">
  import Nav from './Nav.svelte';

  interface MobileNavProps {
    shouldExpand: boolean;
  }

  const { shouldExpand }: MobileNavProps = $props();
</script>

<div
  fixed
  top-0
  w-full
  h-dvh
  p-5
  bg-white
  dark:bg-dark
  z-30
  right-full
  class:translate-x-full={shouldExpand}
  class:translate-x-0={!shouldExpand}
  class="lg:hidden"
  transition
  duration-400
  ease-out
  overflow-y-scroll
  scrollbar-none
>
  <Nav />
</div>
