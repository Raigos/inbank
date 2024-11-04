import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import HeroSection from '../HeroSection.vue'
import { vuetify } from './setup/vuetify'

const mockScrollTo = vi.fn()
const mockScrollStore = {
  scrollTo: mockScrollTo,
}

vi.mock('@/stores/navigation', () => ({
  useScrollStore: () => mockScrollStore,
}))

describe('HeroSection', () => {
  it('renders properly', () => {
    const wrapper = mount(HeroSection, {
      global: {
        plugins: [vuetify],
      },
    })
    expect(wrapper.find('h1').text()).toContain('Take charge')
    expect(wrapper.find('img').attributes('alt')).toContain(
      'A person in a striped sweater',
    )
  })

  it('calls scrollTo when Apply button is clicked', async () => {
    const wrapper = mount(HeroSection, {
      global: {
        plugins: [vuetify],
      },
    })

    await wrapper.find('.v-btn').trigger('click')

    expect(mockScrollTo).toHaveBeenCalledWith('calculator', 80)
  })
})
