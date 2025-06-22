<script lang="ts">
  import Accordion from '../atoms/Accordion.svelte';
  import Link from '../atoms/Link.svelte';

  import { cataloguePhotography } from '$lib/catalogue/mock';

  const categories = ['Photography', 'Cinema', 'Zine&Others'];
</script>

<nav data-sveltekit-keepfocus>
  <menu pt-6>
    <li class="lg:hidden"><Link href="/">霧</Link></li>
    <li h-10 border="l-2 primary" class="lg:hidden"></li>
    <li>
      <Link href="/intro" classNames="hover:text-secondary">Introduction</Link>
    </li>
    {#each categories as category (category)}
      <li>
        <Accordion {category}>
          <ul border-l-2 border-primary pl-4 overflow-hidden>
            {#if category === 'Photography'}
              {#each cataloguePhotography as entry (entry.id)}
                <li>
                  <Link href={`/book/${entry.id}`} classNames="hover:text-secondary"
                    >{entry.title}</Link
                  >
                </li>
              {/each}
            {:else}
              <li>
                <Link href="/book/a" classNames="hover:text-secondary">Product A</Link>
              </li>
              <li>
                <Link href="/book/b" classNames="hover:text-secondary">Product B</Link>
              </li>
            {/if}
          </ul>
        </Accordion>
      </li>
    {/each}
    <li>
      <Link href="/index" classNames="hover:text-secondary">Index</Link>
    </li>
  </menu>
</nav>
