<script setup lang="ts">
import { computed } from 'vue'
import { BRAND } from '@/data/brand'
import { SERVICES } from '@/data/services'

const emit = defineEmits<{
  (e: 'open-booking', payload?: { serviceName?: string }): void
}>()

const vip = computed(() => SERVICES.find((s) => s.id === 'vip-complex')!)

const includedBonuses = [
  {
    title: 'Очистка лобового стекла от водного камня',
    detail: 'Убираем минеральный налёт, который дворники не смывают.'
  },
  {
    title: 'Антидождь на лобовое стекло',
    detail: 'Гидрофобный эффект: вода и грязь уходят со стекла на скорости.'
  }
]
</script>

<template>
  <section id="vip-offer" class="section-shell vip-section" aria-labelledby="vip-heading">
    <div class="vip-visual" aria-hidden="true">
      <picture>
        <source srcset="/assets/images/services/vip-complex.webp" type="image/webp" />
        <img
          src="/assets/images/services/vip-complex.jpg"
          alt=""
          width="1600"
          height="1067"
          loading="lazy"
          class="vip-visual__img"
        />
      </picture>
      <div class="vip-visual__veil"></div>
    </div>

    <div class="container vip-layout">
      <div class="vip-intro">
        <p class="section-meta">
          <span class="section-meta__num">01</span>
          <span>Signature service</span>
        </p>

        <h2 id="vip-heading" class="vip-title">
          VIP-комплекс —
          <span class="price-mono vip-title__price">100 BYN</span>
        </h2>

        <blockquote class="vip-quote">
          «{{ vip.quote }}»
        </blockquote>

        <p class="vip-description">
          Кузов, салон и стёкла за один визит — без подсчёта мелких доплат.
        </p>

        <div class="vip-actions">
          <button
            type="button"
            class="btn btn-primary"
            @click="emit('open-booking', { serviceName: 'VIP-комплекс — 100 BYN' })"
          >
            Записаться
          </button>
          <a :href="`tel:${BRAND.phoneRaw}`" class="btn btn-secondary">
            {{ BRAND.phoneDisplay }}
          </a>
        </div>
      </div>

      <div class="vip-panel">
        <div class="vip-panel__block vip-panel__block--accent">
          <h3 class="vip-panel__heading">Включено бесплатно</h3>
          <ul class="vip-bonus-list">
            <li v-for="bonus in includedBonuses" :key="bonus.title">
              <strong>{{ bonus.title }}</strong>
              <span>{{ bonus.detail }}</span>
            </li>
          </ul>
        </div>

        <details class="vip-details">
          <summary class="vip-details__summary">Что входит в комплекс</summary>
          <ul class="vip-list">
            <li v-for="item in vip.included" :key="item">{{ item }}</li>
          </ul>
        </details>
      </div>
    </div>
  </section>
</template>

<style scoped>
.vip-section {
  position: relative;
  overflow: hidden;
  background-color: var(--bg-deep);
  padding-top: clamp(4.5rem, 8vw, 7rem);
  padding-bottom: clamp(4.5rem, 8vw, 7rem);
}

.vip-visual {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.vip-visual picture,
.vip-visual__img {
  width: 100%;
  height: 100%;
}

.vip-visual__img {
  object-fit: cover;
  object-position: 60% 40%;
  opacity: 0.42;
}

.vip-visual__veil {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(10, 11, 12, 0.94) 0%, rgba(10, 11, 12, 0.78) 48%, rgba(10, 11, 12, 0.55) 100%),
    linear-gradient(0deg, rgba(10, 11, 12, 0.75) 0%, transparent 40%, rgba(10, 11, 12, 0.35) 100%);
}

.vip-layout {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: clamp(2rem, 4vw, 4rem);
  align-items: start;
}

.vip-intro {
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
  max-width: 36rem;
}

.vip-title {
  font-family: var(--font-display);
  font-size: clamp(2.1rem, 4.5vw, 3.6rem);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.035em;
}

.vip-title__price {
  display: inline-block;
  white-space: nowrap;
}

.vip-quote {
  font-size: clamp(1.15rem, 1.8vw, 1.4rem);
  line-height: 1.4;
  color: var(--text-primary);
  font-weight: 500;
  max-width: 24ch;
}

.vip-description {
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.6;
  max-width: 36ch;
}

.vip-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 0.35rem;
}

.vip-panel {
  display: flex;
  flex-direction: column;
  gap: 0;
  border-top: 1px solid var(--border-subtle);
}

.vip-panel__block {
  padding: 1.35rem 0;
  border-bottom: 1px solid var(--border-subtle);
}

.vip-panel__heading {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 1rem;
}

.vip-bonus-list {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}

.vip-bonus-list li {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.vip-bonus-list strong {
  font-size: 1rem;
  font-weight: 650;
  color: var(--text-primary);
}

.vip-bonus-list span {
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

.vip-details {
  padding: 1rem 0 0;
}

.vip-details__summary {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-secondary);
  cursor: pointer;
  list-style: none;
  padding: 0.75rem 0;
}

.vip-details__summary::-webkit-details-marker {
  display: none;
}

.vip-details__summary:hover {
  color: var(--text-primary);
}

.vip-list {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  padding-bottom: 0.5rem;
}

.vip-list li {
  position: relative;
  padding-left: 1rem;
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.45;
}

.vip-list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.65em;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: var(--text-muted);
}

@media (max-width: 900px) {
  .vip-layout {
    grid-template-columns: 1fr;
    gap: 2.25rem;
  }

  .vip-panel {
    padding-left: 0;
    padding-right: 0;
  }

  .vip-visual__img {
    opacity: 0.32;
    object-position: 70% 35%;
  }

  .vip-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .vip-actions .btn {
    width: 100%;
  }
}
</style>
