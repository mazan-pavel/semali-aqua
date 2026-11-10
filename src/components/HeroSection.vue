<script setup lang="ts">
import { BRAND } from '@/data/brand'

const emit = defineEmits<{
  (e: 'open-booking', payload?: { serviceName?: string }): void
}>()
</script>

<template>
  <section id="top" class="hero-section" aria-labelledby="hero-heading">
    <div class="hero-media">
      <picture>
        <source srcset="/assets/images/hero/studio-hero.webp" type="image/webp" />
        <img
          src="/assets/images/hero/studio-hero.jpg"
          alt="Чистый автомобиль в детейлинг-боксе SEMALI AQUA"
          width="2200"
          height="1467"
          fetchpriority="high"
          class="hero-media__img"
        />
      </picture>
      <div class="hero-media__veil" aria-hidden="true"></div>
    </div>

    <div class="container hero-content">
      <p class="hero-brand">{{ BRAND.name }}</p>

      <h1 id="hero-heading" class="hero-title">
        Уход, который видно.
      </h1>

      <p class="hero-subtitle">
        Детейлинг автомобилей в Минске
      </p>

      <div class="hero-actions">
        <button
          type="button"
          class="btn btn-primary"
          @click="emit('open-booking')"
        >
          Записаться
        </button>

        <p class="hero-price">
          <span class="hero-price__label">Стоимость от</span>
          <strong class="price-mono hero-price__value">35 BYN</strong>
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  position: relative;
  min-height: min(100vh, 980px);
  display: flex;
  align-items: flex-end;
  padding: clamp(5rem, 12vw, 8rem) 0 clamp(3.5rem, 7vw, 5.5rem);
  border-bottom: 1px solid var(--border-subtle);
  overflow: hidden;
  background-color: var(--bg-deep);
}

.hero-media {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero-media picture,
.hero-media__img {
  width: 100%;
  height: 100%;
}

.hero-media__img {
  object-fit: cover;
  object-position: 55% 45%;
}

.hero-media__veil {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(10, 11, 12, 0.78) 0%, rgba(10, 11, 12, 0.28) 52%, rgba(10, 11, 12, 0.18) 100%),
    linear-gradient(0deg, rgba(10, 11, 12, 0.82) 0%, rgba(10, 11, 12, 0.08) 48%, rgba(10, 11, 12, 0.28) 100%);
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 36rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.hero-brand {
  font-family: var(--font-display);
  font-size: clamp(0.9rem, 1.3vw, 1.05rem);
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-primary);
}

.hero-title {
  font-family: var(--font-display);
  font-size: clamp(2.6rem, 7vw, 5rem);
  font-weight: 700;
  line-height: 0.98;
  letter-spacing: -0.045em;
  color: var(--text-primary);
  max-width: 9ch;
}

.hero-subtitle {
  font-size: clamp(1rem, 1.35vw, 1.12rem);
  color: rgba(242, 242, 239, 0.78);
  max-width: 26ch;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.25rem 1.75rem;
  margin-top: 0.85rem;
}

.hero-price {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.hero-price__label {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(242, 242, 239, 0.55);
}

.hero-price__value {
  font-size: 1.05rem;
  color: var(--text-primary);
}

@media (max-width: 720px) {
  .hero-section {
    min-height: min(92vh, 820px);
  }

  .hero-media__img {
    object-position: 62% 40%;
  }

  .hero-media__veil {
    background:
      linear-gradient(180deg, rgba(10, 11, 12, 0.2) 0%, rgba(10, 11, 12, 0.45) 42%, rgba(10, 11, 12, 0.92) 100%);
  }

  .hero-actions {
    flex-direction: column;
    align-items: flex-start;
  }

  .hero-actions .btn {
    width: 100%;
    max-width: 280px;
  }
}
</style>
