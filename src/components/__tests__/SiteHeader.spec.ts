import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import SiteHeader from '../SiteHeader.vue'

const mockGoToHome = vi.fn()
const mockNavigationStore = {
  goToHome: mockGoToHome,
}

vi.mock('@/stores/navigation', () => ({
  useNavigationStore: () => mockNavigationStore,
}))

describe('SiteHeader', () => {
  it('renders properly', () => {
    const wrapper = mount(SiteHeader)

    const logo = wrapper.find('img')
    expect(logo.exists()).toBe(true)
    expect(logo.attributes('alt')).toBe('inbank logo')
    expect(logo.attributes('src')).toContain('logo.svg')
  })

  it('calls goToHome when logo is clicked', async () => {
    const wrapper = mount(SiteHeader)

    await wrapper.find('img').trigger('click')

    expect(mockGoToHome).toHaveBeenCalled()
  })
})
