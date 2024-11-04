<script setup lang="ts">
import { useScrollStore } from '@/stores/navigation'

const scrollStore = useScrollStore()

const handleApplyClick = () => {
  scrollStore.scrollTo('calculator', 80)
}
</script>

<template>
  <section class="hero-section">
    <div
      class="hero-section__cta d-flex flex-column align-center justify-center text-center"
    >
      <p class="font-weight-medium mb-4 w-100">Mini loan</p>
      <h1><em>Take charge</em> of unexpected costs</h1>
      <p class="mb-4 w-100">
        Finance unforeseen expenses with Inbank. A quick and easy application
        process with an instant credit decision.
      </p>
      <v-btn class="mt-2" size="large" @click="handleApplyClick">
        Apply now
      </v-btn>
    </div>
    <picture class="hero-section__media">
      <source
        type="image/webp"
        srcset="
          /pictures/washroom-568w.webp 568w,
          /pictures/washroom-840w.webp 840w
        "
        sizes="(max-width: 600px) 568px,
         808px"
      />
      <img
        src="/pictures/washroom-568w.png"
        alt="A person in a striped sweater and glasses loading a washing machine while their brown dog with a blue collar rests on the tiled floor beside them"
        fetchpriority="high"
        width="568"
        height="567"
      />
    </picture>
  </section>
</template>

<style scoped>
.hero-section {
  padding: 1rem var(--spacing-regular) var(--vertical-padding)
    var(--spacing-regular);
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  gap: var(--spacing-small);
}

.hero-section__media {
  order: -1;
  width: 100%;
  aspect-ratio: 1/1;
}

img {
  height: 100%;
  width: 100%;
  border-radius: var(--border-r-default);
  object-fit: cover;
}

.hero-section__cta {
  width: 100%;
  word-wrap: break-word;
  background-color: var(--color-primary-olive);
  border-radius: var(--border-r-default);
  padding: var(--spacing-medium);
  min-height: 416px;

  p:last-of-type {
    opacity: 0.9;
  }

  h1 {
    margin-bottom: var(--spacing-xsmall);
  }
}

/* 37.5rem = 600px */
@media screen and (min-width: 37.5rem) {
  .hero-section {
    grid-template-columns: minmax(280px, 592px) minmax(280px, 840px);
  }

  .hero-section__media {
    order: 1;
    aspect-ratio: auto;
    min-height: 100%;
  }
}
</style>
