<script setup lang="ts">
import { BRAND } from '@/data/brand'
</script>

<template>
  <section id="contacts" class="section-shell contacts-section" aria-labelledby="contacts-heading">
    <div class="container contacts-layout">
      <div class="contacts-intro">
        <p class="section-meta">
          <span class="section-meta__num">06</span>
          <span>Контакты</span>
        </p>
        <h2 id="contacts-heading" class="section-title section-title--display">
          Записаться
        </h2>
        <p class="section-lead">
          Позвоните или напишите — согласуем время.
        </p>
      </div>

      <div class="contacts-main">
        <a :href="`tel:${BRAND.phoneRaw}`" class="contact-phone">
          <span class="contact-phone__label">Телефон</span>
          <strong class="price-mono contact-phone__number">{{ BRAND.phoneDisplay }}</strong>
        </a>

        <div class="contact-channels">
          <a
            :href="BRAND.instagramUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="channel-link"
          >
            <span class="channel-link__label">Instagram</span>
            <strong>{{ BRAND.instagramHandle }}</strong>
          </a>
          <a
            :href="BRAND.threadsUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="channel-link"
          >
            <span class="channel-link__label">Threads</span>
            <strong>{{ BRAND.threadsHandle }}</strong>
          </a>
        </div>

        <div class="contact-address">
          <span class="contact-address__label">Адрес</span>
          <strong>{{ BRAND.fullAddress }}</strong>
          <span class="contact-address__sub">{{ BRAND.landmarks }}</span>
        </div>

        <div class="contact-maps">
          <a
            :href="BRAND.mapLinks.yandex"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-secondary"
          >
            Яндекс Карты
          </a>
          <a
            :href="BRAND.mapLinks.google"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-secondary"
          >
            Google Карты
          </a>
          <a :href="`tel:${BRAND.phoneRaw}`" class="btn btn-primary">
            Позвонить
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contacts-section {
  background-color: var(--bg-deep);
  border-bottom: none;
}

.contacts-layout {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: clamp(2rem, 4vw, 4rem);
  align-items: start;
}

.contacts-intro {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 28rem;
}

.contacts-main {
  display: flex;
  flex-direction: column;
  gap: 0;
  border-top: 1px solid var(--border-subtle);
}

.contact-phone {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  padding: 1.75rem 0;
  border-bottom: 1px solid var(--border-subtle);
}

.contact-phone__label,
.channel-link__label,
.contact-address__label {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.contact-phone__number {
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.02em;
}

.contact-phone:hover .contact-phone__number {
  color: var(--accent-lime);
}

.contact-channels {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem 2.5rem;
  padding: 1.5rem 0;
  border-bottom: 1px solid var(--border-subtle);
}

.channel-link {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.channel-link strong {
  font-size: 1.05rem;
  font-weight: 650;
}

.channel-link:hover strong {
  color: var(--text-secondary);
}

.contact-address {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 1.5rem 0;
  border-bottom: 1px solid var(--border-subtle);
}

.contact-address strong {
  font-size: 1.1rem;
  font-weight: 700;
}

.contact-address__sub {
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.contact-maps {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  padding-top: 1.5rem;
}

@media (max-width: 900px) {
  .contacts-layout {
    grid-template-columns: 1fr;
  }

  .contact-maps {
    flex-direction: column;
  }

  .contact-maps .btn {
    width: 100%;
  }
}
</style>
