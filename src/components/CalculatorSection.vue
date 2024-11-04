<script lang="ts" setup>
import Container from '@/components/Container.vue'
import { ref, onMounted, computed } from 'vue'
import { useFormRules } from '@/composable/useFormRules'

const moneyValue = ref(0)
const timeValue = ref(0)

onMounted(() => {
  timeValue.value = 48
  moneyValue.value = 500
})

const isValid = computed(() => {
  return (
    moneyValue.value >= 300 &&
    moneyValue.value <= 7200 &&
    timeValue.value >= 2 &&
    timeValue.value <= 72
  )
})

const monthlyPayment = computed(() => {
  if (!timeValue.value || !moneyValue.value) return '0€'

  const payment = moneyValue.value / timeValue.value
  // Format to match "144.84€" style
  return (
    payment.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      useGrouping: false, //Prevents thousand separators
    }) + '€'
  )
})

const formattedMoneyValue = computed({
  get: () => {
    return moneyValue.value?.toLocaleString('en-US', {
      maximumFractionDigits: 0,
      useGrouping: true,
    })
  },
  set: value => {
    // Remove any non-digit characters and convert to number
    moneyValue.value = Number(value.replace(/[^0-9]/g, ''))
  },
})

const { rules } = useFormRules()
</script>

<template>
  <section class="calculator-section" id="calculator-section">
    <Container>
      <div class="calculator">
        <div class="calculator__text">
          <h1 class="calculator__heading">
            Calculate your <em>monthly payment</em>
          </h1>
          <p class="text-body-1">
            Estimate your monthly payments based on the chosen loan amount and
            time period.
          </p>
        </div>
        <div class="calculator__divider" />
        <div class="calculator__controls">
          <div class="slider__container">
            <div class="slider__wrapper">
              <div class="slider__track" />

              <v-slider
                v-model="moneyValue"
                thumb-label="always"
                :min="300"
                :max="7200"
                :step="100"
                hide-details
              >
                <template v-slot:thumb-label="{ modelValue }">
                  <div class="slider__thumb">
                    <img
                      alt="An arrow"
                      class="slider__arrow--left"
                      src="@/assets/icons/sliderArrow.svg"
                    />
                    <img
                      alt="An arrow"
                      class="slider__arrow--right"
                      src="@/assets/icons/sliderArrow.svg"
                    />
                  </div>
                </template>
              </v-slider>
              <div class="slider__placeholder-container">
                <span
                  class="text-subtitle-2 slider__value"
                  aria-label="Current value: 300 euros"
                  >300 €</span
                >
                <span
                  class="text-subtitle-2 slider__value"
                  aria-label="Current value: 7200 euros"
                  >7,200 €</span
                >
              </div>
            </div>
            <v-text-field
              v-model="formattedMoneyValue"
              label="Amount"
              variant="outlined"
              placeholder="500"
              suffix="€"
              :hide-spin-buttons="true"
              :rules="rules.loanAmount"
            />
          </div>
          <div class="slider__container">
            <div class="slider__wrapper">
              <div class="slider__track" />
              <v-slider
                thumb-label="always"
                v-model="timeValue"
                :min="2"
                :max="72"
                :step="2"
                hide-details
              >
                <template v-slot:thumb-label="{ modelValue }">
                  <div class="slider__thumb">
                    <img
                      alt="An arrow"
                      class="slider__arrow--left"
                      src="@/assets/icons/sliderArrow.svg"
                    />
                    <img
                      alt="An arrow"
                      class="slider__arrow--right"
                      src="@/assets/icons/sliderArrow.svg"
                    />
                  </div>
                </template>
              </v-slider>
              <div class="slider__placeholder-container">
                <span
                  class="text-subtitle-2 slider__value"
                  aria-label="Selected months: 2 months"
                  >2 months</span
                >
                <span
                  class="text-subtitle-2 slider__value"
                  aria-label="Selected months: 72 months"
                  >72 months</span
                >
              </div>
            </div>
            <v-select
              v-model="timeValue"
              :items="
                Array.from({ length: 36 }, (_, i) => ({
                  title: `${i * 2 + 2} months`,
                  value: i * 2 + 2,
                }))
              "
              item-title="title"
              item-value="value"
              :rules="[() => !!timeValue || 'This field is required']"
              label="Date"
              placeholder="Select..."
              required
              variant="outlined"
            />
          </div>
          <div class="calculator__info">
            <p>Monthly payment</p>
            <h1 class="calculator__heading">{{ monthlyPayment }}</h1>
            <v-btn
              size="large"
              :disabled="!isValid"
              class="calculator__button"
              @click="
                $emit('open-modal', {
                  'Loan amount': `${formattedMoneyValue} €`,
                  'Loan period': `${timeValue} months`,
                  'Monthly payment': monthlyPayment,
                })
              "
            >
              Apply now
            </v-btn>
            <p class="text-caption calculator__disclaimer">
              The calculation is approximate and may differ from the conditions
              offered to you. Please submit a loan application to receive a
              personal offer. Financial services are provided by AS Inbank
              Finance.
            </p>
          </div>
        </div>
      </div>
    </Container>
  </section>
</template>

<style scoped>
.calculator-section {
  background-color: var(--color-primary-pink);
}

.calculator {
  padding: var(--vertical-padding) var(--spacing-regular);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  gap: 2.5rem;
}

.calculator__text {
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  /* Design has a likely mistake, would need to confirm inside padding. Currently there is double spacing */
  padding: 0 clamp(0rem, -1.603rem + 4.274vw, 2.5rem);
  gap: var(--spacing-small);
}

.calculator__divider {
  width: 1px;
  height: 100%;
  background-color: var(--color-primary-black);
  opacity: 0.15;
  display: none;
}

.calculator__info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.slider__value {
  opacity: 0.6;
}

.calculator__button {
  background-color: var(--color-primary-purple);
  margin-bottom: 1rem;
}

.calculator__heading {
  margin-bottom: 1rem;
}

.calculator__disclaimer {
  opacity: 0.6;
}

.slider__container {
  display: grid;
  grid-template-columns: 1fr minmax(185px, auto);
  gap: 24px;
  align-items: center;
}

.slider__placeholder-container {
  margin-left: 0.5rem;
  margin-top: 0.5rem;
  display: flex;
  justify-content: space-between;
}

@media screen and (min-width: 37.5rem) /* 37.5rem === 600px */ {
  .calculator {
    grid-template-columns: 1fr auto 1fr;
  }

  .calculator__divider {
    display: block;
  }
}
</style>
