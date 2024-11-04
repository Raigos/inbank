// src/components/__tests__/setup/vuetify.ts
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Create vuetify instance
export const vuetify = createVuetify({
  components,
  directives,
})
