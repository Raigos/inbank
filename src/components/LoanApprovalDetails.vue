<script lang="ts" setup>
import { useNavigationStore } from '@/stores/navigation'

const navigation = useNavigationStore()

interface LoanDetails {
  amount: string
  period: string
  monthlyPayment: string
}

const props = defineProps<{
  loanDetails: LoanDetails
}>()
</script>

<template>
  <div class="loan-card__content text-center">
    <h1 class="text-h4 text-sm-h2 mb-2"><em>Good news!</em></h1>
    <p class="text-body-1 mb-10">Your loan has been approved.</p>
    <div class="loan-summary mb-6">
      <hr class="loan-summary__line" />
      <div
        v-for="(value, key) in props.loanDetails"
        :key="key"
        class="loan-summary__row"
      >
        <span class="font-weight-medium my-3">{{ key }}</span>
        <span class="font-weight-regular my-3">{{ value }}</span>
        <hr class="loan-summary__line" />
      </div>
    </div>

    <v-btn
      class="mt-10"
      block
      color="primary"
      variant="flat"
      @click="navigation.goToHome"
    >
      Back to home page
    </v-btn>
  </div>
</template>

<style scoped>
.loan-card__content {
  padding: clamp(1.5rem, -3.949rem + 14.53vw, 10rem)
    clamp(1rem, -2.846rem + 10.256vw, 7rem);
}

.loan-summary {
  display: grid;
}

.loan-summary__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: start;
}

.loan-summary__line {
  grid-column: 1 / -1;
  width: 100%;
}
</style>
