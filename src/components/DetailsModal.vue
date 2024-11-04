<script setup lang="ts">
import { ref, watch } from 'vue'
import router from '../router'
import type { VForm } from 'vuetify/components'
import PersonalDetailsForm from '@/components/PersonalDetailsForm.vue'

const INCOME_THRESHOLD = 1000

interface LoanDetails {
  'Loan amount': string
  'Loan period': string
  'Monthly payment': string
}

const props = defineProps<{
  modelValue: boolean
  loanDetails: LoanDetails
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const dialog = ref(false)
const personalDetailsForm = ref<InstanceType<typeof VForm> | null>(null)
const formData = ref({
  firstName: '',
  lastName: '',
  mobileNumber: '',
  email: '',
  monthlyIncome: '',
})

watch(
  () => props.modelValue,
  newValue => {
    dialog.value = newValue
  },
)

watch(
  () => dialog.value,
  newValue => {
    emit('update:modelValue', newValue)
  },
)

const onSubmit = async () => {
  const { valid } = await personalDetailsForm.value?.validate() // Call validate on the form ref

  if (valid) {
    dialog.value = false
    const plainLoanDetails = {
      'Loan amount': props.loanDetails['Loan amount'],
      'Loan period': props.loanDetails['Loan period'],
      'Monthly payment': props.loanDetails['Monthly payment'],
    }

    if (Number(formData.value.monthlyIncome) >= INCOME_THRESHOLD) {
      await router.push({
        name: 'PositiveDecision',
        query: {
          firstName: formData.value.firstName,
          lastName: formData.value.lastName,
          amount: props.loanDetails['Loan amount'],
          period: props.loanDetails['Loan period'],
          payment: props.loanDetails['Monthly payment'],
        },
        state: { loanDetails: plainLoanDetails }, // This passes the loan calculator data
      })
    } else {
      await router.push({
        name: 'NegativeDecision',
        query: {
          firstName: formData.value.firstName,
        },
      })
    }
  }
}

const resetForm = () => {
  formData.value = {
    firstName: '',
    lastName: '',
    mobileNumber: '',
    email: '',
    monthlyIncome: '',
  }
}

watch(dialog, newValue => {
  if (!newValue) {
    resetForm()
  }
})

const onModalOpen = () => {
  dialog.value = true
}

const onModalClose = () => (dialog.value = false)
defineExpose({ onModalOpen })
</script>

<template>
  <v-dialog v-model="dialog" width="540" class="details-modal">
    <v-card class="details-modal__card">
      <v-card-title
        class="details-modal__header d-flex justify-space-between align-center"
      >
        <h6 class="text-h6">Personal details</h6>
        <v-btn
          icon="mdi-plus"
          size="x-small"
          variant="plain"
          @click="onModalClose"
        >
          <img
            alt="The close icon"
            class="close-icon"
            src="@/assets/icons/close.svg"
          />
        </v-btn>
      </v-card-title>

      <v-card-text>
        <PersonalDetailsForm
          v-model="formData"
          ref="personalDetailsForm"
          class="details-modal__form"
        />
      </v-card-text>

      <v-card-actions>
        <v-btn block color="primary" variant="flat" @click="onSubmit">
          Submit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
/* funky selectors to overwrite Vuetify */
.v-dialog > .v-overlay__content {
  bottom: 0;
  max-width: 100%;
  margin: 0;
}

.v-dialog > .v-overlay__content > .v-card {
  border-radius: 1.875rem 1.875rem 0 0; /* 1.875 === 30px */
}

@media screen and (min-width: 37.5rem) /* 37.5rem === 600px */ {
  .v-dialog > .v-overlay__content {
    max-width: calc(100% - 48px);
    bottom: auto;
    margin: 1.5rem;
  }

  .v-dialog > .v-overlay__content > .v-card {
    border-radius: 1.875rem;
  }
}
</style>
