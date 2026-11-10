<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  SERVICES,
  VEHICLE_BODY_OPTIONS,
  type VehicleBodyType,
  type BodyPriceItem
} from '@/data/services'

const emit = defineEmits<{
  (e: 'open-booking', payload?: { serviceName?: string; bodyType?: VehicleBodyType }): void
}>()

const selectedBodyType = ref<VehicleBodyType>('all')

const washServices = computed(() =>
  SERVICES.filter((s) => s.categoryCode === '01' && s.id !== 'vip-complex')
)
const detailingService = computed(() => SERVICES.find((s) => s.id === 'detailing-wash')!)
const interiorService = computed(() => SERVICES.find((s) => s.id === 'interior-cleaning')!)
const polishCeramicService = computed(() => SERVICES.find((s) => s.id === 'polish-and-ceramic')!)

const ceramicProcess = [
  { label: 'Подготовка', detail: 'Мойка кузова, дисков и проёмов' },
  { label: 'Полировка', detail: 'Лёгкая восстановительная полировка ЛКП' },
  { label: 'Защита', detail: 'Керамическое покрытие кузова' },
  { label: 'Результат', detail: 'Глубина цвета и гидрофобный эффект' }
]

function isHighlightedBody(item: BodyPriceItem): boolean {
  return selectedBodyType.value !== 'all' && item.bodyType === selectedBodyType.value
}

function handleBookService(serviceTitle: string) {
  emit('open-booking', {
    serviceName: serviceTitle,
    bodyType: selectedBodyType.value
  })
}
</script>

<template>
  <section id="services" class="section-shell catalog-section" aria-labelledby="catalog-heading">
    <div class="container">
      <div class="section-header catalog-header">
        <p class="section-meta">
          <span class="section-meta__num">02</span>
          <span>Услуги и цены</span>
        </p>
        <h2 id="catalog-heading" class="section-title">Программы ухода</h2>
        <p class="section-lead">
          От регулярной трёхфазной мойки до детейлинга, химчистки и керамической защиты. Цены прозрачные —
          по типу кузова.
        </p>

        <div class="body-selector" role="group" aria-label="Фильтр цен по типу кузова">
          <span class="body-selector__label">Тип кузова</span>
          <div class="body-selector__pills">
            <button
              v-for="opt in VEHICLE_BODY_OPTIONS"
              :key="opt.id"
              type="button"
              class="body-pill"
              :class="{ 'body-pill--active': selectedBodyType === opt.id }"
              @click="selectedBodyType = opt.id"
            >
              {{ opt.shortLabel }}
            </button>
          </div>
        </div>
      </div>

      <!-- 01 Wash -->
      <div id="wash" class="category-block">
        <header class="category-head">
          <span class="category-head__num">01</span>
          <div>
            <h3 class="category-head__title">Мойка</h3>
            <p class="category-head__lead">
              Трёхфазная технология: кузов, диски, проёмы и коврики.
            </p>
          </div>
        </header>

        <div class="service-rows">
          <article v-for="service in washServices" :key="service.id" class="service-row">
            <div class="service-row__main">
              <h4 class="service-row__title">{{ service.title }}</h4>
              <p class="service-row__sub">{{ service.subtitle }}</p>
              <ul class="service-row__included">
                <li v-for="item in service.included" :key="item">{{ item }}</li>
              </ul>
            </div>
            <div class="service-row__side">
              <div v-if="service.pricesByBody" class="price-matrix">
                <div
                  v-for="priceRow in service.pricesByBody"
                  :key="priceRow.bodyLabel"
                  class="price-matrix__row"
                  :class="{ 'price-matrix__row--highlight': isHighlightedBody(priceRow) }"
                >
                  <span>{{ priceRow.bodyLabel }}</span>
                  <strong class="price-mono">{{ priceRow.priceDisplay }}</strong>
                </div>
              </div>
              <button
                type="button"
                class="btn btn-secondary service-row__cta"
                @click="handleBookService(service.title)"
              >
                Записаться
              </button>
            </div>
          </article>
        </div>
      </div>

      <!-- 02 Detailing -->
      <div id="detailing" class="category-block">
        <header class="category-head">
          <span class="category-head__num">02</span>
          <div>
            <h3 class="category-head__title">{{ detailingService.title }}</h3>
            <p class="category-head__lead">{{ detailingService.subtitle }}</p>
          </div>
        </header>

        <div class="detailing-layout">
          <div class="detailing-main">
            <details class="detailing-details">
              <summary class="detailing-details__summary">14 этапов детейлинг-мойки</summary>
              <ol class="step-list">
                <li v-for="(item, idx) in detailingService.included" :key="item">
                  <span class="step-list__num price-mono">{{ String(idx + 1).padStart(2, '0') }}</span>
                  <span>{{ item }}</span>
                </li>
              </ol>
            </details>
          </div>

          <aside class="detailing-aside">
            <h4 class="aside-title">Стоимость</h4>
            <div class="price-matrix">
              <div
                v-for="priceRow in detailingService.pricesByBody"
                :key="priceRow.bodyLabel"
                class="price-matrix__row"
                :class="{ 'price-matrix__row--highlight': isHighlightedBody(priceRow) }"
              >
                <span>{{ priceRow.bodyLabel }}</span>
                <strong class="price-mono">{{ priceRow.priceDisplay }}</strong>
              </div>
            </div>
            <button
              type="button"
              class="btn btn-primary"
              @click="handleBookService('Детейлинг-мойка')"
            >
              Записаться
            </button>
          </aside>
        </div>
      </div>

      <!-- 03 Interior -->
      <div id="interior" class="category-block">
        <header class="category-head">
          <span class="category-head__num">03</span>
          <div>
            <h3 class="category-head__title">{{ interiorService.title }}</h3>
            <p class="category-head__lead">{{ interiorService.subtitle }}</p>
          </div>
        </header>

        <div class="interior-compare">
          <article
            v-for="variant in interiorService.rangeOptions"
            :key="variant.variantTitle"
            class="compare-row"
          >
            <div class="compare-row__main">
              <h4 class="compare-row__title">{{ variant.variantTitle }}</h4>
              <p class="compare-row__desc">{{ variant.description }}</p>
              <ul class="service-row__included">
                <li v-for="point in variant.highlights" :key="point">{{ point }}</li>
              </ul>
            </div>
            <div class="compare-row__side">
              <strong class="price-mono compare-row__price">{{ variant.priceRangeDisplay }}</strong>
              <button
                type="button"
                class="btn btn-secondary"
                @click="handleBookService(`${variant.variantTitle} (${variant.priceRangeDisplay})`)"
              >
                Записаться
              </button>
            </div>
          </article>
        </div>
      </div>

      <!-- 04 Polish + Ceramic -->
      <div id="polish-ceramic" class="category-block">
        <header class="category-head">
          <span class="category-head__num">04</span>
          <div>
            <h3 class="category-head__title">{{ polishCeramicService.title }}</h3>
            <p class="category-head__lead">{{ polishCeramicService.subtitle }}</p>
          </div>
        </header>

        <div class="ceramic-layout">
          <div class="ceramic-copy">
            <ol class="ceramic-process">
              <li v-for="(step, idx) in ceramicProcess" :key="step.label">
                <span class="ceramic-process__num price-mono">{{ String(idx + 1).padStart(2, '0') }}</span>
                <div>
                  <strong>{{ step.label }}</strong>
                  <span>{{ step.detail }}</span>
                </div>
              </li>
            </ol>
          </div>

          <aside class="ceramic-aside">
            <h4 class="aside-title">Стоимость</h4>
            <div class="price-matrix price-matrix--large">
              <div
                v-for="priceRow in polishCeramicService.pricesByBody"
                :key="priceRow.bodyLabel"
                class="price-matrix__row"
                :class="{ 'price-matrix__row--highlight': isHighlightedBody(priceRow) }"
              >
                <span>{{ priceRow.bodyLabel }}</span>
                <strong class="price-mono">{{ priceRow.priceDisplay }}</strong>
              </div>
            </div>
            <button
              type="button"
              class="btn btn-primary ceramic-aside__cta"
              @click="handleBookService('Лёгкая полировка кузова + керамика')"
            >
              Записаться
            </button>
            <p class="ceramic-note">
              Точная стоимость фиксируется при осмотре на ул. Могилёвской, 39Б.
            </p>
          </aside>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.catalog-header {
  max-width: none;
}

.body-selector {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  margin-top: 0.5rem;
}

.body-selector__label {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.body-selector__pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.body-pill {
  padding: 0.45rem 0.85rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-subtle);
  background: transparent;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text-secondary);
  cursor: pointer;
  transition:
    color 0.2s ease,
    border-color 0.2s ease,
    background-color 0.2s ease;
}

.body-pill:hover {
  color: var(--text-primary);
  border-color: var(--border-strong);
}

.body-pill--active {
  background-color: var(--text-primary);
  color: var(--bg-deep);
  border-color: var(--text-primary);
}

.category-block {
  padding-top: clamp(2.75rem, 5vw, 4.5rem);
  margin-top: clamp(2rem, 4vw, 3.5rem);
  border-top: 1px solid var(--border-subtle);
}

.catalog-header + .category-block {
  margin-top: 0;
  border-top: none;
}

.category-head {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem 1.5rem;
  margin-bottom: clamp(1.75rem, 3vw, 2.5rem);
  max-width: 48rem;
}

.category-head__num {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--text-muted);
  letter-spacing: 0.08em;
  padding-top: 0.35rem;
}

.category-head__title {
  font-family: var(--font-sans);
  font-size: clamp(1.35rem, 2.4vw, 1.85rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 0.4rem;
}

.category-head__lead {
  color: var(--text-secondary);
  font-size: 0.98rem;
  line-height: 1.55;
}

.service-rows {
  display: flex;
  flex-direction: column;
}

.service-row {
  display: grid;
  grid-template-columns: 1.4fr 0.8fr;
  gap: clamp(1.5rem, 3vw, 3rem);
  padding: 1.75rem 0;
  border-bottom: 1px solid var(--border-subtle);
}

.service-row__title {
  font-size: 1.15rem;
  font-weight: 700;
  margin-bottom: 0.4rem;
}

.service-row__sub {
  color: var(--text-secondary);
  font-size: 0.92rem;
  margin-bottom: 1rem;
  max-width: 52ch;
}

.service-row__included {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.service-row__included li {
  position: relative;
  padding-left: 0.9rem;
  font-size: 0.88rem;
  color: var(--text-secondary);
}

.service-row__included li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.55em;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--text-muted);
}

.service-row__side {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: space-between;
  padding-left: clamp(1rem, 2vw, 1.75rem);
  border-left: 1px solid var(--border-subtle);
}

.service-row__cta {
  align-self: flex-start;
}

.price-matrix {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.price-matrix__row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
  padding: 0.35rem 0;
  font-size: 0.9rem;
  color: var(--text-secondary);
  border-bottom: 1px solid transparent;
}

.price-matrix__row strong {
  color: var(--text-primary);
  font-size: 0.95rem;
}

.price-matrix__row--highlight {
  color: var(--text-primary);
  border-bottom-color: var(--border-strong);
}

.price-matrix__row--highlight strong {
  color: var(--text-primary);
}

.detailing-layout,
.ceramic-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(0, 0.75fr);
  gap: clamp(1.75rem, 4vw, 3.5rem);
  align-items: start;
}

.step-list {
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
}

.step-list li {
  display: grid;
  grid-template-columns: 2.5rem 1fr;
  gap: 0.85rem;
  padding: 0.85rem 0;
  border-bottom: 1px solid var(--border-subtle);
  font-size: 0.92rem;
  color: var(--text-secondary);
}

.step-list__num {
  font-size: 0.78rem;
  color: var(--text-muted);
  padding-top: 0.15rem;
}

.detailing-aside,
.ceramic-aside {
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
  padding: 0;
  border-left: 1px solid var(--border-subtle);
  padding-left: clamp(1.35rem, 2.6vw, 2.15rem);
  align-self: start;
}

.aside-title {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin: 0;
  padding: 0;
}

.interior-compare {
  display: flex;
  flex-direction: column;
}

.compare-row {
  display: grid;
  grid-template-columns: 1.4fr 0.75fr;
  gap: clamp(1.5rem, 3vw, 3rem);
  padding: 1.75rem 0;
  border-bottom: 1px solid var(--border-subtle);
}

.compare-row__title {
  font-size: 1.12rem;
  font-weight: 700;
  margin-bottom: 0.45rem;
}

.compare-row__desc {
  color: var(--text-secondary);
  font-size: 0.92rem;
  margin-bottom: 1rem;
  max-width: 54ch;
}

.compare-row__side {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;
  padding-left: clamp(1rem, 2vw, 1.75rem);
  border-left: 1px solid var(--border-subtle);
}

.compare-row__price {
  font-size: 1.15rem;
  color: var(--text-primary);
}

.detailing-details {
  border-top: 1px solid var(--border-subtle);
}

.detailing-details__summary {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-secondary);
  cursor: pointer;
  list-style: none;
  padding: 1rem 0;
}

.detailing-details__summary::-webkit-details-marker {
  display: none;
}

.detailing-details__summary:hover {
  color: var(--text-primary);
}

.detailing-details[open] .detailing-details__summary {
  color: var(--text-primary);
}

.ceramic-process {
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--border-subtle);
  margin: 0;
  padding: 0;
  list-style: none;
}

.ceramic-process li {
  display: grid;
  grid-template-columns: 2.5rem 1fr;
  gap: 0.85rem;
  padding: 0.95rem 0;
  border-bottom: 1px solid var(--border-subtle);
}

.ceramic-process__num {
  font-size: 0.78rem;
  color: var(--text-muted);
  padding-top: 0.2rem;
}

.ceramic-process strong {
  display: block;
  font-size: 0.98rem;
  margin-bottom: 0.2rem;
}

.ceramic-process span {
  color: var(--text-secondary);
  font-size: 0.88rem;
}

.price-matrix--large {
  width: 100%;
}

.price-matrix--large .price-matrix__row {
  padding: 0.7rem 0;
  font-size: 0.95rem;
  gap: 0.75rem;
}

.price-matrix--large .price-matrix__row strong {
  font-size: 1.05rem;
  white-space: nowrap;
}

.ceramic-aside__cta {
  width: 100%;
  margin-top: 0.25rem;
}

.ceramic-note {
  font-size: 0.82rem;
  color: var(--text-muted);
  line-height: 1.5;
  margin: 0;
}

@media (max-width: 900px) {
  .service-row,
  .compare-row,
  .detailing-layout,
  .ceramic-layout {
    grid-template-columns: 1fr;
  }

  .service-row__side,
  .compare-row__side,
  .detailing-aside,
  .ceramic-aside {
    align-items: stretch;
    padding-left: 0;
    border-left: none;
    padding-top: 1.25rem;
    border-top: 1px solid var(--border-subtle);
  }

  .ceramic-process li:last-child,
  .step-list li:last-child {
    border-bottom: none;
  }

  .service-row__cta,
  .compare-row__side .btn,
  .detailing-aside .btn,
  .ceramic-aside .btn {
    width: 100%;
  }
}
</style>
