<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { useNavigationStore } from '@/stores/navigation'

const route = useRoute()
const userData = route.query

const navigation = useNavigationStore()
</script>

<template>
  <v-card class="card text-center" max-width="792">
    <v-card-text>
      <h1 class="text-h3 mb-4"><em>Dear</em> {{ userData.firstName }}</h1>

      <p class="text-body-1 mb-10">Unfortunately, your loan was denied.</p>

      <hr class="mb-4" />
      <p class="text-body-2 text-medium-emphasis">
        In addition to your income and expenses, a number of other factors play
        a role in loan decisions.
      </p>
      <hr class="mt-4 mb-8" />

      <v-btn
        class="mt-10"
        block
        color="primary"
        variant="flat"
        @click="navigation.goToHome"
      >
        Exit
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.card {
  padding: 2.5rem clamp(1rem, -6.532rem + 20.085vw, 12.75rem);
}

@media screen and (min-width: 37.5rem) /* 37.5rem === 600px */ {
  .card {
    /* Clamp: 2.5rem at 37.5rem viewport | 5rem at 96rem viewport */
    padding: clamp(2.5rem, 0.897rem + 4.274vw, 5rem)
      clamp(1rem, -6.532rem + 20.085vw, 12.75rem);
  }
}
</style>
/
