<script setup lang="ts">
import { BRAND } from '@/data/brand'

defineProps<{
  compact?: boolean
}>()
</script>

<template>
  <a href="#top" class="brand-logo" :class="{ 'brand-logo--compact': compact }" aria-label="SEMALI AQUA — На главную">
    <span class="brand-mark" aria-hidden="true">
      <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="34" height="34" rx="4" fill="#16181A" stroke="rgba(255,255,255,0.16)" />
        <path d="M9 24L15 11H21.5L15.5 24H9Z" fill="#F2F2EF" />
        <path d="M18.5 24L24.5 11H28.5L22.5 24H18.5Z" fill="#D7FF38" />
      </svg>
    </span>
    <span class="brand-wordmark">
      <strong class="brand-wordmark__primary">{{ BRAND.primaryWord }}</strong>
      <span class="brand-wordmark__secondary">{{ BRAND.secondaryWord }}</span>
    </span>
  </a>
</template>

<style scoped>
.brand-logo {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  text-decoration: none;
}

.brand-mark {
  width: 34px;
  height: 34px;
  flex-shrink: 0;
}

.brand-wordmark {
  display: inline-flex;
  align-items: baseline;
  gap: 0.35rem;
  font-family: var(--font-display);
  font-size: 0.98rem;
  letter-spacing: -0.02em;
  line-height: 1;
}

.brand-wordmark__primary {
  font-weight: 700;
  color: var(--text-primary);
}

.brand-wordmark__secondary {
  font-weight: 600;
  color: var(--text-secondary);
}

.brand-logo--compact .brand-mark {
  width: 30px;
  height: 30px;
}

.brand-logo--compact .brand-wordmark {
  font-size: 0.9rem;
}
</style>
