import { describe, it, expect } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import CalculatorSection from '../CalculatorSection.vue'
import { vuetify } from './setup/vuetify'

// Define the expected component interface
interface CalculatorInstance {
  timeValue: number
  moneyValue: number
  monthlyPayment: string
  formattedMoneyValue: string
  isValid: boolean
}

describe('CalculatorSection', () => {
  const createWrapper = () => {
    return mount(CalculatorSection, {
      global: {
        plugins: [vuetify],
      },
    }) as VueWrapper<CalculatorInstance>
  }

  it('initializes with correct default values', async () => {
    const wrapper = createWrapper()

    // Wait for mounted hook to complete
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.timeValue).toBe(48)
    expect(wrapper.vm.moneyValue).toBe(500)
  })

  describe('computed properties', () => {
    it('calculates monthly payment correctly', async () => {
      const wrapper = createWrapper()

      wrapper.vm.moneyValue = 1200
      wrapper.vm.timeValue = 12
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.monthlyPayment).toBe('100.00€')
    })

    it('returns 0.00€ for monthly payment when values are missing', async () => {
      const wrapper = createWrapper()

      wrapper.vm.moneyValue = 0
      wrapper.vm.timeValue = 0
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.monthlyPayment).toBe('0€')
    })

    it('formats money value correctly', async () => {
      const wrapper = createWrapper()

      wrapper.vm.moneyValue = 1234567
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.formattedMoneyValue).toBe('1,234,567')
    })

    it('validates input ranges correctly', async () => {
      const wrapper = createWrapper()

      // Invalid case
      wrapper.vm.moneyValue = 200
      wrapper.vm.timeValue = 1
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.isValid).toBe(false)

      // Valid case
      wrapper.vm.moneyValue = 1000
      wrapper.vm.timeValue = 24
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.isValid).toBe(true)
    })
  })

  describe('user interactions', () => {
    it('updates money value through slider', async () => {
      const wrapper = createWrapper()
      const slider = wrapper.findComponent({ name: 'v-slider' })

      await slider.vm.$emit('update:modelValue', 1000)
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.moneyValue).toBe(1000)
    })

    it('updates time value through select', async () => {
      const wrapper = createWrapper()
      const select = wrapper.findComponent({ name: 'v-select' })

      await select.vm.$emit('update:modelValue', 24)
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.timeValue).toBe(24)
    })

    it('emits open-modal event with correct data when Apply button is clicked', async () => {
      const wrapper = createWrapper()

      wrapper.vm.moneyValue = 1000
      wrapper.vm.timeValue = 12
      await wrapper.vm.$nextTick()

      const applyButton = wrapper.find('.calculator__button')
      await applyButton.trigger('click')

      expect(wrapper.emitted('open-modal')).toBeTruthy()
      expect(wrapper.emitted('open-modal')?.[0]?.[0]).toEqual({
        'Loan amount': '1,000 €',
        'Loan period': '12 months',
        'Monthly payment': '83.33€',
      })
    })

    it('disables Apply button when values are invalid', async () => {
      const wrapper = createWrapper()

      wrapper.vm.moneyValue = 200
      wrapper.vm.timeValue = 1
      await wrapper.vm.$nextTick()

      const applyButton = wrapper.find('.calculator__button')
      expect(applyButton.attributes('disabled')).toBeDefined()
    })
  })

  describe('input validation', () => {
    it('enforces minimum and maximum money values', async () => {
      const wrapper = createWrapper()
      const textField = wrapper.findComponent({ name: 'v-text-field' })

      const rules = textField.props('rules') as Function[]

      expect(rules[0]('200')).toBe('Minimum amount is 300€')
      expect(rules[0]('300')).toBe(true)

      expect(rules[1]('7300')).toBe('Maximum amount is 7200€')
      expect(rules[1]('7200')).toBe(true)
    })

    it('handles text field input correctly', async () => {
      const wrapper = createWrapper()
      const textField = wrapper.findComponent({ name: 'v-text-field' })

      await textField.vm.$emit('update:modelValue', '1,000')
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.moneyValue).toBe(1000)

      await textField.vm.$emit('update:modelValue', '2,000')
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.moneyValue).toBe(2000)
    })
  })
})
