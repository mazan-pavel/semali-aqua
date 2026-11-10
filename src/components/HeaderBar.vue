<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import BrandLogo from './BrandLogo.vue'
import { BRAND } from '@/data/brand'

const emit = defineEmits<{
  (e: 'open-booking', payload?: { serviceName?: string }): void
}>()

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const navLinks = [
  { label: 'VIP', href: '#vip-offer' },
  { label: 'Услуги', href: '#services' },
  { label: 'До / После', href: '#before-after' },
  { label: 'Дополнительно', href: '#extra-care' },
  { label: 'Контакты', href: '#contacts' }
]

function handleScroll() {
  isScrolled.value = window.scrollY > 24
}

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false
}

function handleBookClick() {
  closeMobileMenu()
  emit('open-booking')
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header class="site-header" :class="{ 'site-header--scrolled': isScrolled }">
    <div class="top-bar">
      <div class="container top-bar__inner">
        <div class="top-bar__location">
          <span>{{ BRAND.fullAddress }}</span>
          <span class="top-bar__divider" aria-hidden="true">·</span>
          <span class="top-bar__landmark">{{ BRAND.landmarks }}</span>
        </div>
        <div class="top-bar__socials">
          <a :href="BRAND.instagramUrl" target="_blank" rel="noopener noreferrer" class="top-bar__link">
            Instagram
          </a>
          <span class="top-bar__divider" aria-hidden="true">/</span>
          <a :href="BRAND.threadsUrl" target="_blank" rel="noopener noreferrer" class="top-bar__link">
            Threads
          </a>
        </div>
      </div>
    </div>

    <div class="container header-main">
      <BrandLogo />

      <nav class="desktop-nav" aria-label="Основная навигация">
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          class="desktop-nav__link"
        >
          {{ link.label }}
        </a>
      </nav>

      <div class="header-actions">
        <a :href="`tel:${BRAND.phoneRaw}`" class="header-phone" aria-label="Позвонить в SEMALI AQUA">
          {{ BRAND.phoneDisplay }}
        </a>

        <button type="button" class="btn btn-primary header-cta" @click="handleBookClick">
          Записаться
        </button>

        <button
          type="button"
          class="burger-btn"
          :aria-expanded="isMobileMenuOpen"
          aria-controls="mobile-nav-drawer"
          aria-label="Открыть меню навигации"
          @click="toggleMobileMenu"
        >
          <span class="burger-btn__line" :class="{ 'is-open': isMobileMenuOpen }"></span>
          <span class="burger-btn__line" :class="{ 'is-open': isMobileMenuOpen }"></span>
        </button>
      </div>
    </div>

    <div
      id="mobile-nav-drawer"
      class="mobile-drawer"
      :class="{ 'mobile-drawer--open': isMobileMenuOpen }"
      :aria-hidden="!isMobileMenuOpen"
    >
      <div class="container mobile-drawer__content">
        <div class="mobile-drawer__meta">
          <p class="mobile-drawer__address">{{ BRAND.fullAddress }}</p>
          <p class="mobile-drawer__landmark">{{ BRAND.landmarks }}</p>
        </div>

        <nav class="mobile-nav" aria-label="Мобильная навигация">
          <a
            v-for="link in navLinks"
            :key="link.href"
            :href="link.href"
            class="mobile-nav__link"
            @click="closeMobileMenu"
          >
            {{ link.label }}
          </a>
        </nav>

        <div class="mobile-drawer__footer">
          <a :href="`tel:${BRAND.phoneRaw}`" class="btn btn-secondary mobile-drawer__btn">
            {{ BRAND.phoneDisplay }}
          </a>
          <button type="button" class="btn btn-primary mobile-drawer__btn" @click="handleBookClick">
            Записаться
          </button>
          <div class="mobile-drawer__socials">
            <a :href="BRAND.instagramUrl" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a :href="BRAND.threadsUrl" target="_blank" rel="noopener noreferrer">Threads</a>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 60;
  background-color: var(--bg-primary);
  border-bottom: 1px solid transparent;
  transition: border-color 0.25s ease;
}

.site-header--scrolled {
  border-bottom-color: var(--border-subtle);
}

.top-bar {
  border-bottom: 1px solid var(--border-subtle);
  background-color: var(--bg-deep);
  font-size: 0.74rem;
  color: var(--text-muted);
}

.top-bar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 32px;
  gap: 1rem;
}

.top-bar__location {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  flex-wrap: wrap;
}

.top-bar__divider {
  color: var(--text-muted);
  opacity: 0.6;
}

.top-bar__landmark {
  color: var(--text-secondary);
}

.top-bar__socials {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.04em;
}

.top-bar__link:hover {
  color: var(--text-primary);
}

.header-main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: var(--header-height);
  gap: 1.25rem;
}

.desktop-nav {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.desktop-nav__link {
  font-size: 0.88rem;
  font-weight: 560;
  color: var(--text-secondary);
  transition: color 0.2s ease;
  padding: 0.35rem 0;
}

.desktop-nav__link:hover {
  color: var(--text-primary);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header-phone {
  font-family: var(--font-mono);
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--text-primary);
  letter-spacing: -0.01em;
}

.header-phone:hover {
  color: var(--text-secondary);
}

.header-cta {
  min-height: 42px;
  padding: 0.6rem 1.1rem;
  font-size: 0.76rem;
}

.burger-btn {
  display: none;
  width: 44px;
  height: 44px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-subtle);
  background-color: transparent;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 6px;
  cursor: pointer;
}

.burger-btn__line {
  width: 18px;
  height: 1.5px;
  background-color: var(--text-primary);
  transition: transform 0.25s ease;
}

.burger-btn__line.is-open:first-child {
  transform: translateY(3.75px) rotate(45deg);
}

.burger-btn__line.is-open:last-child {
  transform: translateY(-3.75px) rotate(-45deg);
}

.mobile-drawer {
  display: none;
  border-top: 1px solid var(--border-subtle);
  background-color: var(--bg-primary);
}

.mobile-drawer--open {
  display: block;
}

.mobile-drawer__content {
  padding-top: 1.25rem;
  padding-bottom: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.mobile-drawer__meta {
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-subtle);
}

.mobile-drawer__address {
  font-weight: 650;
  font-size: 0.95rem;
}

.mobile-drawer__landmark {
  font-size: 0.82rem;
  color: var(--text-secondary);
  margin-top: 0.25rem;
}

.mobile-nav {
  display: flex;
  flex-direction: column;
}

.mobile-nav__link {
  padding: 0.95rem 0;
  border-bottom: 1px solid var(--border-subtle);
  font-weight: 600;
  font-size: 1.05rem;
  color: var(--text-primary);
}

.mobile-drawer__footer {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-top: 0.5rem;
}

.mobile-drawer__btn {
  width: 100%;
}

.mobile-drawer__socials {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  padding-top: 0.35rem;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--text-secondary);
}

@media (max-width: 1120px) {
  .desktop-nav {
    display: none;
  }

  .burger-btn {
    display: inline-flex;
  }
}

@media (max-width: 720px) {
  .top-bar__socials {
    display: none;
  }

  .header-phone {
    display: none;
  }

  .header-cta {
    display: none;
  }
}
</style>
