<script lang="ts">
  import type { PageProps } from './$types';
  import { catalogue } from '$lib/catalogue/mock';
  import { toDate } from '$lib/utils/time';
  import ImageSlider from '$lib/components/atoms/ImageSlider.svelte';
  import type { Entry } from '$lib/catalogue/type';

  // TODO: rename the data to something more semantic?
  let { data }: PageProps = $props();

  const search = catalogue.filter((entry: Entry) => entry.id === data.id);
  const entry = search[0];

  const publishedMonth = entry?.publishedMonth
    ? toDate(entry.publishedYear, entry.publishedMonth).toLocaleString('default', {
        month: 'short'
      })
    : null;
  const size = entry?.unit && `${entry.width} x ${entry.height} ${entry.unit}`;
</script>

<svelte:head>
  <title>{entry?.title} · Omíkhlē</title>
  <meta name="description" content={`Details on the ${entry?.category} book – ${entry?.title}`} />
</svelte:head>

<article prose class="max-w-[100ch]">
  {#if entry}
    <h1>{entry.title}</h1>
    <div grid="~ cols-2" gap-5>
      <div class="col-span-2 lg:col-span-1">
        <!-- publication details -->
        <section grid="~ cols-2">
          <ul col-start-2 m-0 class="leading-[1.25]">
            <li>{entry.publisher}</li>
            <li>{entry.pages} pp</li>
            <li>{publishedMonth} {entry.publishedYear}</li>
            {#if size}
              <li>{size}</li>
            {/if}
          </ul>
        </section>

        <!-- description -->
        <section>
          <!-- TODO: Not really a good practice to use index as key... -->
          {#each entry.description as paragraph, i (i)}
            <p>{paragraph}</p>
          {/each}
        </section>
      </div>

      <div relative overflow-hidden class="col-span-2 row-start-1 lg:col-start-2">
        <ImageSlider entryId={data.id} />
      </div>
    </div>
  {:else}
    <p>Requested book cannot be found at the moment.</p>
  {/if}
</article>
