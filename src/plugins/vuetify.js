import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default createVuetify({
  components,
  directives,
  theme: {
    themes: {
      light: {
        colors: {
          // --color-primary-purple
          primary: '#AA93FF',
          // --color-primary-black
          'on-primary': '#21093a',
          'on-background': '#21093A',
          'on-surface': '#21093A',
          ivory: '#f0f0ea',
          'field-border': '#6956E5',
        },
      },
    },
  },
  defaults: {
    VBtn: {
      elevation: '0',
      rounded: 'xl',
      variant: 'flat',
      size: 'large',
      class: 'font-weight-regular',
    },

    VTextField: {
      bgColor: '#fff',
    },
    VCardTitle: {
      style: {
        padding:
          'var(--spacing-medium) var(--spacing-medium) 1.5rem var(--spacing-medium)',
      },
    },
    VForm: {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
      },
    },
    VCardActions: {
      style: {
        padding:
          '0.5rem var(--spacing-medium) var(--spacing-medium) var(--spacing-medium)',
      },
    },
    VDialog: {
      VCardText: {
        style: {
          padding: '0 var(--spacing-medium)',
        },
      },
    },
  },
})
