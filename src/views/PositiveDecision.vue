<script setup lang="ts">
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import LoanApprovalDetails from '@/components/LoanApprovalDetails.vue'

const router = useRouter()

interface LoanDetailsType {
  'Loan amount': string
  'Loan period': string
  'Monthly payment': string
}

const loanDetails = computed<LoanDetailsType>(() => {
  const state = router.currentRoute.value.state
  const query = router.currentRoute.value.query

  if (state?.loanDetails) {
    return state.loanDetails
  }

  if (query.amount && query.period && query.payment) {
    return {
      'Loan amount': query.amount as string,
      'Loan period': query.period as string,
      'Monthly payment': query.payment as string,
    }
  }

  return {
    'Loan amount': 'NaN',
    'Loan period': 'NaN',
    'Monthly payment': 'Nan',
  }
})

const hasValidData = computed(() => {
  return (
    loanDetails.value['Loan amount'] !== '' &&
    loanDetails.value['Loan period'] !== '' &&
    loanDetails.value['Monthly payment'] !== ''
  )
})
</script>

<template>
  <v-sheet
    class="loan-decision card mx-auto"
    max-width="1200"
    rounded="xl-sm-xl"
  >
    <template v-if="!hasValidData">
      <div class="loading-state">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div>
    </template>
    <v-row no-gutters height="100%">
      <v-col cols="12" sm="6">
        <!-- Image Column -->
        <v-sheet
          class="loan-decision__image-container"
          :color="$vuetify.display.smAndUp ? 'ivory' : 'd-none'"
          rounded="xl"
          height="100%"
        >
          <div class="loan-decision__image-wrapper">
            <img
              src="/pictures/furnishing-552w.webp"
              alt="Furnishing illustration"
              class="loan-decision__image"
            />
          </div>
        </v-sheet>
      </v-col>

      <v-col cols="12" sm="6">
        <!-- Content Column -->
        <LoanApprovalDetails :loan-details="loanDetails" />
      </v-col>
    </v-row>
  </v-sheet>
</template>

<style scoped>
.loan-decision {
  border: solid 4px #fff;
  margin-top: 0;
  margin-bottom: 0;
}

.loan-decision__image-container {
  /* Specifically for offset design */
  padding: 19px;
}

.loan-decision__image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: left;
}

.loan-decision__image-wrapper {
  background: var(--color-primary-ivory);
  left: 0;
  border-radius: 100px;
  padding: 40px;
  margin: 20px 40px 0 40px;
}

/* 37.5rem = 600px */
@media screen and (min-width: 37.5rem) {
  .loan-decision {
    margin-top: 80px;
    margin-bottom: 80px;
  }

  .loan-decision__image-wrapper {
    position: relative;
    background-color: transparent;
    margin: 0;
    border-radius: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    /* @600px 0rem | @1536px 5rem */
    left: clamp(0rem, -3.205rem + 8.547vw, 5rem);
  }
}
</style>
