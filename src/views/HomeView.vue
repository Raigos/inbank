<script setup lang="ts">
import { ref } from 'vue'
import Hero from '@/components/HeroSection.vue'
import Container from '@/components/Container.vue'
import Calculator from '@/components/CalculatorSection.vue'
import DetailsModal from '@/components/DetailsModal.vue'

const modalRef = ref(null)
const loanDetails = ref(null)
const showDetailsModal = ref(false)

const openDetailsModal = details => {
  loanDetails.value = details
  showDetailsModal.value = true
  modalRef.value?.onModalOpen()
}
</script>

<template>
  <main>
    <Container>
      <Hero />
      <section>
        <DetailsModal v-model="showDetailsModal" :loan-details="loanDetails" />
      </section>
    </Container>

    <Calculator @open-modal="openDetailsModal" />
  </main>
</template>
