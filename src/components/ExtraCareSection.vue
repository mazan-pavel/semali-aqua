<script setup lang="ts">
import { ref, computed } from 'vue'
import { EXTRA_CARE_ITEMS, type ExtraCareItem } from '@/data/services'

const emit = defineEmits<{
  (e: 'open-booking', payload?: { serviceName?: string }): void
}>()

type FilterCategory = 'all' | ExtraCareItem['category']

const activeCategory = ref<FilterCategory>('all')
const selectedIds = ref<string[]>([])

const categoryTabs: { id: FilterCategory; label: string }[] = [
  { id: 'all', label: 'Все' },
  { id: 'exterior', label: 'Кузов' },
  { id: 'glass', label: 'Стёкла' },
  { id: 'interior', label: 'Салон' },
  { id: 'wheels', label: 'Диски' }
]

const filteredItems = computed(() => {
  if (activeCategory.value === 'all') return EXTRA_CARE_ITEMS
  return EXTRA_CARE_ITEMS.filter((item) => item.category === activeCategory.value)
})

const selectedItems = computed(() =>
  EXTRA_CARE_ITEMS.filter((item) => selectedIds.value.includes(item.id))
)

const totalSelectedPrice = computed(() =>
  selectedItems.value.reduce((sum, item) => sum + item.numericPrice, 0)
)

const hasFromPriceSelected = computed(() =>
  selectedItems.value.some((item) => item.isFromPrice)
)

function toggleItem(id: string) {
  const index = selectedIds.value.indexOf(id)
  if (index === -1) {
    selectedIds.value.push(id)
  } else {
    selectedIds.value.splice(index, 1)
  }
}

function clearSelection() {
  selectedIds.value = []
}

function bookSelectedExtras() {
  if (selectedItems.value.length === 0) {
    emit('open-booking', { serviceName: 'Дополнительный уход' })
    return
  }
  const names = selectedItems.value.map((i) => `${i.name} (${i.priceDisplay})`).join(' + ')
  emit('open-booking', {
    serviceName: `Дополнительно: ${names}`
  })
}
</script>

<template>
  <section id="extra-care" class="section-shell extra-section" aria-labelledby="extra-care-heading">
    <div class="container">
      <div class="section-header extra-header">
        <p class="section-meta">
          <span class="section-meta__num">04</span>
          <span>Дополнительно</span>
        </p>
        <h2 id="extra-care-heading" class="section-title">Дополнительный уход</h2>
        <p class="section-lead">
          Отдельные процедуры или дополнения к основной программе. Отметьте позиции — посчитаем ориентир.
        </p>

        <div class="extra-tabs" role="tablist" aria-label="Фильтр дополнительных услуг">
          <button
            v-for="tab in categoryTabs"
            :key="tab.id"
            type="button"
            role="tab"
            :aria-selected="activeCategory === tab.id"
            class="extra-tab"
            :class="{ 'extra-tab--active': activeCategory === tab.id }"
            @click="activeCategory = tab.id"
          >
            {{ tab.label }}
          </button>
        </div>
      </div>

      <div class="extra-layout">
        <div class="extra-list" role="list">
          <button
            v-for="item in filteredItems"
            :key="item.id"
            type="button"
            class="extra-item"
            :class="{ 'extra-item--selected': selectedIds.includes(item.id) }"
            :aria-pressed="selectedIds.includes(item.id)"
            @click="toggleItem(item.id)"
          >
            <span class="extra-item__check" aria-hidden="true">
              {{ selectedIds.includes(item.id) ? '●' : '○' }}
            </span>
            <span class="extra-item__body">
              <span class="extra-item__name">{{ item.name }}</span>
              <span class="extra-item__zone">{{ item.categoryLabel }}</span>
            </span>
            <strong class="price-mono extra-item__price">{{ item.priceDisplay }}</strong>
          </button>
        </div>

        <aside class="extra-summary">
          <div class="extra-summary__top">
            <h3 class="extra-summary__title">Выбрано</h3>

            <div v-if="selectedItems.length > 0" class="selected-list-wrap">
              <div class="selected-list-header">
                <span>{{ selectedItems.length }} поз.</span>
                <button type="button" class="clear-btn" @click="clearSelection">Сбросить</button>
              </div>
              <ul class="selected-list">
                <li v-for="item in selectedItems" :key="item.id">
                  <span>{{ item.name }}</span>
                  <strong class="price-mono">{{ item.priceDisplay }}</strong>
                </li>
              </ul>
            </div>

            <p v-else class="empty-selection">Ничего не отмечено</p>
          </div>

          <div class="extra-summary__bottom">
            <div class="total-bar">
              <span>Итого</span>
              <strong class="price-mono total-bar__value">
                {{ hasFromPriceSelected ? 'от ' : '' }}{{ totalSelectedPrice }} BYN
              </strong>
            </div>

            <button type="button" class="btn btn-primary extra-summary__cta" @click="bookSelectedExtras">
              Записаться
            </button>
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>

<style scoped>
.extra-header {
  max-width: none;
}

.extra-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.25rem;
}

.extra-tab {
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

.extra-tab:hover {
  color: var(--text-primary);
  border-color: var(--border-strong);
}

.extra-tab--active {
  background-color: var(--text-primary);
  color: var(--bg-deep);
  border-color: var(--text-primary);
}

.extra-layout {
  display: grid;
  grid-template-columns: 1.4fr 0.7fr;
  gap: clamp(1.75rem, 4vw, 3rem);
  align-items: start;
}

.extra-list {
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--border-subtle);
}

.extra-item {
  display: grid;
  grid-template-columns: 1.5rem 1fr auto;
  gap: 0.85rem;
  align-items: baseline;
  width: 100%;
  text-align: left;
  padding: 1rem 0;
  border: none;
  border-bottom: 1px solid var(--border-subtle);
  background: transparent;
  cursor: pointer;
  color: inherit;
  transition: background-color 0.2s ease;
}

.extra-item__check {
  font-size: 0.75rem;
  color: var(--text-muted);
  line-height: 1.6;
}

.extra-item--selected .extra-item__check {
  color: var(--text-primary);
}

.extra-item__name {
  display: block;
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--text-primary);
}

.extra-item__zone {
  display: block;
  margin-top: 0.2rem;
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.extra-item__price {
  font-size: 0.95rem;
  color: var(--text-primary);
  white-space: nowrap;
}

.extra-summary {
  position: sticky;
  top: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 0 0 0 clamp(1rem, 2vw, 1.75rem);
  border-left: 1px solid var(--border-subtle);
  min-height: 220px;
}

.extra-summary__title {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 1rem;
}

.selected-list-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: var(--font-mono);
  font-size: 0.74rem;
  color: var(--text-secondary);
  margin-bottom: 0.75rem;
}

.clear-btn {
  background: none;
  border: none;
  color: var(--text-muted);
  text-decoration: underline;
  cursor: pointer;
  font-size: 0.74rem;
}

.selected-list {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  font-size: 0.88rem;
}

.selected-list li {
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  color: var(--text-secondary);
}

.selected-list strong {
  color: var(--text-primary);
  white-space: nowrap;
}

.empty-selection {
  font-size: 0.9rem;
  color: var(--text-muted);
}

.total-bar {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.85rem 0 0;
  border-top: 1px solid var(--border-subtle);
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.total-bar__value {
  font-size: 1.2rem;
  color: var(--text-primary);
}

.extra-summary__cta {
  width: 100%;
}

@media (max-width: 960px) {
  .extra-layout {
    grid-template-columns: 1fr;
  }

  .extra-item:last-child {
    border-bottom: none;
  }

  .extra-summary {
    position: static;
    padding: 1.5rem 0 0;
    border-left: none;
    border-top: 1px solid var(--border-subtle);
  }
}
</style>
