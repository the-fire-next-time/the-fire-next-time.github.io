<script lang="ts">
  import Accordion from '../atoms/Accordion.svelte';
  import Link from '../atoms/Link.svelte';

  import { catalogue } from '$lib/catalogue/mock';
  import type { Entry } from '$lib/catalogue/type';

  const categories = ['Photography', 'Cinema', 'Zine'];
  const filterCategories = (category: string, entries: Entry[]): Entry[] =>
    entries.filter((entry) => entry.category === category.toLowerCase());
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
            {#each filterCategories(category, catalogue) as entry (entry.id)}
              <li>
                <Link href={`/book/${entry.id}`} classNames="hover:text-secondary"
                  >{entry.title}</Link
                >
              </li>
            {/each}
          </ul>
        </Accordion>
      </li>
    {/each}
    <li>
      <Link href="/index" classNames="hover:text-secondary">Index</Link>
    </li>
  </menu>
</nav>
