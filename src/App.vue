<script setup lang="ts">
import HeaderBar from './components/HeaderBar.vue'
import HeroSection from './components/HeroSection.vue'
import VipOfferSection from './components/VipOfferSection.vue'
import ServiceCatalogSection from './components/ServiceCatalogSection.vue'
import ExtraCareSection from './components/ExtraCareSection.vue'
import BeforeAfterSection from './components/BeforeAfterSection.vue'
import ProcessSection from './components/ProcessSection.vue'
import ContactSection from './components/ContactSection.vue'
import FooterSection from './components/FooterSection.vue'
import StickyMobileCTA from './components/StickyMobileCTA.vue'

function handleOpenBooking() {
  const contactsEl = document.getElementById('contacts')
  if (contactsEl) {
    contactsEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<template>
  <div class="app-root">
    <HeaderBar @open-booking="handleOpenBooking" />

    <main>
      <HeroSection @open-booking="handleOpenBooking" />
      <VipOfferSection @open-booking="handleOpenBooking" />
      <ServiceCatalogSection @open-booking="handleOpenBooking" />
      <BeforeAfterSection @open-booking="handleOpenBooking" />
      <ExtraCareSection @open-booking="handleOpenBooking" />
      <ProcessSection @open-booking="handleOpenBooking" />
      <ContactSection />
    </main>

    <FooterSection />
    <StickyMobileCTA @open-booking="handleOpenBooking" />
  </div>
</template>
