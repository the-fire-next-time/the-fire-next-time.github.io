<script lang="ts">
  import { base } from '$app/paths';
  import type { Snippet } from 'svelte';

  interface LinkProps {
    children: Snippet;
    href: string;
    classNames?: string;
    isExternal?: boolean;
  }

  let { children, href, isExternal = false, classNames = '' }: LinkProps = $props();
</script>

<a href={base + href} class:no-underline={!isExternal} class={classNames}>{@render children?.()}</a>
