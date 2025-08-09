<script lang="ts">
  import Accordion from '../atoms/Accordion.svelte';
  import Link from '../atoms/Link.svelte';

  import { catalogue } from '$lib/catalogue/mock';
  import type { Entry } from '$lib/catalogue/type';

  const categories: Record<string, string> = {
    Photography: 'photography',
    Cinema: 'cinema',
    Independent: 'self'
  };
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
    {#each Object.keys(categories) as category (category)}
      <li>
        <Accordion {category}>
          <ul border-l-2 border-primary pl-4 overflow-hidden leading-none>
            {#each filterCategories(categories[category], catalogue) as entry (entry.id)}
              <li my-2>
                <Link href={`/book/${entry.id}`} classNames="hover:text-secondary leading-none"
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
