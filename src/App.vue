<script setup lang="ts">
import Header from '@/components/SiteHeader.vue'
import { RouterView } from 'vue-router'
import Container from '@/components/Container.vue'
</script>

<template>
  <Container>
    <Header />
  </Container>

  <RouterView />
</template>
