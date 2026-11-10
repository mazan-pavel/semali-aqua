<script setup lang="ts">
import BrandLogo from './BrandLogo.vue'
import { BRAND } from '@/data/brand'
</script>

<template>
  <footer class="site-footer">
    <div class="container footer-grid">
      <div class="footer-brand">
        <BrandLogo />
        <p class="footer-positioning">{{ BRAND.positioningQuote }}</p>
        <p class="footer-legal">{{ BRAND.legalName }}</p>
      </div>

      <nav class="footer-nav-col" aria-label="Навигация в подвале">
        <h3 class="footer-col-title">Разделы</h3>
        <ul>
          <li><a href="#vip-offer">VIP-комплекс</a></li>
          <li><a href="#services">Услуги</a></li>
          <li><a href="#before-after">До / После</a></li>
          <li><a href="#extra-care">Дополнительно</a></li>
          <li><a href="#contacts">Контакты</a></li>
        </ul>
      </nav>

      <div class="footer-contact-col">
        <h3 class="footer-col-title">Связь</h3>
        <p class="footer-address">{{ BRAND.fullAddress }}</p>
        <a :href="`tel:${BRAND.phoneRaw}`" class="footer-phone">{{ BRAND.phoneDisplay }}</a>
        <div class="footer-socials">
          <a :href="BRAND.instagramUrl" target="_blank" rel="noopener noreferrer">Instagram</a>
          <span aria-hidden="true">·</span>
          <a :href="BRAND.threadsUrl" target="_blank" rel="noopener noreferrer">Threads</a>
        </div>
      </div>
    </div>

    <div class="container footer-bottom">
      <span>© {{ new Date().getFullYear() }} {{ BRAND.name }}</span>
      <a href="#top" class="back-to-top">Наверх</a>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background-color: var(--bg-deep);
  border-top: 1px solid var(--border-subtle);
  padding-top: 3.25rem;
  padding-bottom: calc(2.25rem + 64px);
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.3fr 0.85fr 1fr;
  gap: 2.5rem;
  padding-bottom: 2.25rem;
  border-bottom: 1px solid var(--border-subtle);
}

.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.footer-positioning {
  font-size: 0.9rem;
  color: var(--text-secondary);
  max-width: 38ch;
  line-height: 1.55;
}

.footer-legal {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-muted);
}

.footer-col-title {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--text-muted);
  margin-bottom: 0.9rem;
}

.footer-nav-col ul {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  font-size: 0.92rem;
  color: var(--text-secondary);
}

.footer-nav-col a:hover {
  color: var(--text-primary);
}

.footer-contact-col {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-address {
  font-weight: 650;
  font-size: 0.95rem;
}

.footer-phone {
  font-family: var(--font-mono);
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-primary);
}

.footer-phone:hover {
  color: var(--accent-lime);
}

.footer-socials {
  display: flex;
  gap: 0.55rem;
  font-size: 0.88rem;
  color: var(--text-secondary);
  margin-top: 0.25rem;
}

.footer-socials a:hover {
  color: var(--text-primary);
}

.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-top: 1.35rem;
  font-size: 0.8rem;
  color: var(--text-muted);
}

.back-to-top:hover {
  color: var(--text-primary);
}

@media (max-width: 900px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

@media (max-width: 720px) {
  .site-footer {
    padding-bottom: calc(5.5rem + env(safe-area-inset-bottom, 0px));
  }
}
</style>
