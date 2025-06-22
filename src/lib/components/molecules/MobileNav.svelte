<script lang="ts">
  import Nav from './Nav.svelte';

  interface MobileNavProps {
    shouldExpand: boolean;
  }

  const { shouldExpand }: MobileNavProps = $props();
</script>

<div
  absolute
  w-full
  h-full
  p-4
  bg-white
  z-30
  right-full
  border="2 l-0 primary"
  class:translate-x-full={shouldExpand}
  class:translate-x-0={!shouldExpand}
  transition
  duration-400
  ease-out
>
  <Nav />
</div>
