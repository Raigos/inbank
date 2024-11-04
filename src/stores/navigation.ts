import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

export const useNavigationStore = defineStore('navigation', () => {
  const router = useRouter()

  const goToHome = () => {
    router.push('/')
  }

  return {
    goToHome,
  }
})

export const useScrollStore = defineStore('scroll', {
  state: () => ({
    targets: {
      calculator: 'calculator-section', // key is 'calculator', value is the ID
    },
  }),

  actions: {
    scrollTo(targetId: keyof typeof this.targets, offset: number = 0) {
      const element = document.getElementById(this.targets[targetId])

      if (element) {
        const elementPosition = element.offsetTop - offset
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth',
        })
      }
    },
  },
})
