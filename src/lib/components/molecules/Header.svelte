<script lang="ts">
  import Button from '../atoms/Button.svelte';
  import Link from '../atoms/Link.svelte';

  interface HeaderProps {
    showMobileMenu: boolean;
  }

  let { showMobileMenu = $bindable() }: HeaderProps = $props();
</script>

<header h-10 grid="~ cols-2 lg:cols-3" gap-5 items-end border="b-2 primary">
  <!-- home anchor -->
  <Link href="/" classNames="lg:text-3xl">Omíkhlē</Link>

  <!-- news animation -->
  <aside class="hidden lg:block" h-full overflow-y-hidden>
    <div h-full flex items-end whitespace-nowrap overflow-x-hidden class="notification">
      Sat, Jul 26 · Momento X Omíkhlē @ OssFest
    </div>
    <div h-full flex items-end whitespace-nowrap overflow-x-hidden class="notification">
      New Arrival · 他们说你的歌有谁来听
    </div>
  </aside>

  <!-- mobile menu -->
  <Button
    class="color-secondary text-right lg:hidden"
    onclick={() => (showMobileMenu = !showMobileMenu)}>Catalogue</Button
  >
</header>

<style>
  @keyframes scroll {
    0% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-100%);
    }
    90% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(0);
    }
  }

  @keyframes flip {
    0% {
      transform: rotate3d(0, 0, 0, 0turn);
    }
    50% {
      transform: rotate3d(1, 0, 0, 0.25turn);
    }
    100% {
      transform: rotate3d(0, 0, 0, 0turn);
    }
  }

  .notification {
    animation: scroll 10s linear infinite;
  }
</style>
