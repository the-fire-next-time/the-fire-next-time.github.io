<script lang="ts">
  import { getBaseName } from '$lib/utils/path';
  interface ImageSliderProps {
    entryId: string;
  }
  const { entryId }: ImageSliderProps = $props();
  const images = import.meta.glob(
    '$lib/assets/images/catalogue/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp,svg}',
    {
      eager: true,
      query: {
        enhanced: true
      }
    }
  );
  const getEntryId = (imgName: string) => imgName.split('-')[0];
  const filteredImages = Object.fromEntries(
    // here urls is a tuple of [path string, actual module]
    Object.entries(images).filter((urls) => entryId === getEntryId(getBaseName(urls[0])))
  );
</script>

<div class="lg:fixed" bg-black w-80 h-64>
  <ul
    text-white
    m-0
    w-full
    h-full
    flex
    overflow-x-scroll
    scrollbar-none
    snap-x
    snap-mandatory
    class="p-[20px]"
  >
    {#each Object.entries(filteredImages) as [path, module] (path)}
      <li class="flex-[0_0_100%]" relative>
        <enhanced:img
          class="w-[50%] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
          src={module.default}
          alt="some alt text"
        />
      </li>
    {/each}
  </ul>
</div>

<style scoped>
  ul::scroll-button(*) {
    display: none;
    border: 0;
    font-size: 1em;
    background: none;
    /* color: rgb(0 0 0 / 0.7); */
    color: #e0e0e0;
    cursor: pointer;
  }
  @media (min-width: 1024px) {
    ul::scroll-button(*) {
      display: block;
    }
  }

  ul::scroll-button(*):hover,
  ul::scroll-button(*):focus {
    color: rgb(0 0 0 / 1);
  }

  ul::scroll-button(*):active {
    translate: 1px 1px;
  }

  ul::scroll-button(*):disabled {
    /* color: rgb(0 0 0 / 0.2); */
    color: #7a7a7a;
    cursor: unset;
  }

  ul::scroll-button(left) {
    content: 'Prev';
  }

  ul::scroll-button(right) {
    content: 'Next';
  }

  ul {
    anchor-name: --myCarousel;
  }

  ul::scroll-button(*) {
    position: absolute;
    position-anchor: --myCarousel;
  }

  ul::scroll-button(left) {
    left: calc(anchor(right) - 4.6em);
    top: calc(anchor(bottom) + 13px);
  }

  ul::scroll-button(right) {
    left: calc(anchor(right) - 2.3em);
    top: calc(anchor(bottom) + 13px);
  }
</style>
