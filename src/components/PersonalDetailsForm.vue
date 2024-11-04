<script setup lang="ts">
import { ref } from 'vue'
import { useFormRules } from '@/composable/useFormRules'
import type { VForm } from 'vuetify/components'

interface FormData {
  firstName: string
  lastName: string
  mobileNumber: string
  email: string
  monthlyIncome: string
}

const props = defineProps<{
  modelValue: FormData
}>()

const emit = defineEmits<{
  'update:modelValue': [value: FormData]
}>()

const form = ref<InstanceType<typeof VForm> | null>(null)

defineExpose({
  validate: () => form.value?.validate(),
})

const { rules } = useFormRules()
</script>

<template>
  <v-form ref="form">
    <v-text-field
      :model-value="modelValue.firstName"
      @update:model-value="
        emit('update:modelValue', { ...modelValue, firstName: $event })
      "
      label="First name"
      :rules="[rules.required]"
      variant="outlined"
    />

    <v-text-field
      :model-value="modelValue.lastName"
      @update:model-value="
        emit('update:modelValue', { ...modelValue, lastName: $event })
      "
      label="Last name"
      :rules="[rules.required]"
      variant="outlined"
    />

    <v-text-field
      :model-value="modelValue.mobileNumber"
      @update:model-value="
        emit('update:modelValue', { ...modelValue, mobileNumber: $event })
      "
      label="Mobile number"
      :rules="[rules.required, rules.mobile]"
      variant="outlined"
    />

    <v-text-field
      :model-value="modelValue.email"
      @update:model-value="
        emit('update:modelValue', { ...modelValue, email: $event })
      "
      label="E-mail"
      :rules="[rules.required, rules.email]"
      variant="outlined"
    />

    <v-text-field
      :model-value="modelValue.monthlyIncome"
      @update:model-value="
        emit('update:modelValue', { ...modelValue, monthlyIncome: $event })
      "
      label="Monthly income"
      type="number"
      :rules="[rules.required, rules.income]"
      variant="outlined"
      :hide-spin-buttons="true"
    />
  </v-form>
</template>
