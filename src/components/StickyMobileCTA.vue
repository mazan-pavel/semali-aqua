<script setup lang="ts">
import { BRAND } from '@/data/brand'

const emit = defineEmits<{
  (e: 'open-booking', payload?: { serviceName?: string }): void
}>()
</script>

<template>
  <div class="sticky-mobile-cta" role="region" aria-label="Быстрая связь и запись">
    <a :href="`tel:${BRAND.phoneRaw}`" class="sticky-btn sticky-btn--call">
      Позвонить
    </a>
    <button
      type="button"
      class="sticky-btn sticky-btn--book"
      @click="emit('open-booking')"
    >
      Записаться
    </button>
  </div>
</template>

<style scoped>
.sticky-mobile-cta {
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 70;
  background-color: var(--bg-deep);
  border-top: 1px solid var(--border-subtle);
  padding: 0.65rem 0.85rem calc(0.65rem + env(safe-area-inset-bottom, 0px));
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 0.65rem;
}

.sticky-btn {
  min-height: 46px;
  border-radius: var(--radius-sm);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-sans);
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  cursor: pointer;
}

.sticky-btn--call {
  background-color: transparent;
  color: var(--text-primary);
  border: 1px solid var(--border-strong);
}

.sticky-btn--book {
  background-color: var(--accent-lime);
  color: var(--bg-deep);
  border: 1px solid var(--accent-lime);
}

@media (max-width: 720px) {
  .sticky-mobile-cta {
    display: grid;
  }
}
</style>
