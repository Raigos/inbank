<script setup lang="ts">
import { useNavigationStore } from '@/stores/navigation'

const navigation = useNavigationStore()

const handleLogoClick = () => {
  navigation.goToHome()
}
</script>

<template>
  <header class="header cursor-pointer">
    <img
      alt="inbank logo"
      class="logo"
      src="@/assets/logo.svg"
      @click="handleLogoClick"
    />
  </header>
</template>

<style scoped>
.header {
  padding: var(--spacing-small) var(--spacing-regular);
}

img {
  height: clamp(2.5rem, -2.614rem + 13.636vw, 4rem);
}
</style>
