<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  BEFORE_AFTER_CATEGORIES,
  BEFORE_AFTER_CASES,
  type BeforeAfterCategorySlug
} from '@/data/beforeAfter'

const emit = defineEmits<{
  (e: 'open-booking', payload?: { serviceName?: string }): void
}>()

const activeCategory = ref<BeforeAfterCategorySlug>('interior')
const sliderPercent = ref<number>(50)
const isDragging = ref<boolean>(false)
const stageRef = ref<HTMLElement | null>(null)

const currentCase = computed(
  () =>
    BEFORE_AFTER_CASES.find((c) => c.categorySlug === activeCategory.value) ??
    BEFORE_AFTER_CASES[0]
)

function selectCategory(slug: BeforeAfterCategorySlug) {
  activeCategory.value = slug
  sliderPercent.value = 50
}

function updateFromPointer(clientX: number) {
  if (!stageRef.value) return
  const rect = stageRef.value.getBoundingClientRect()
  const raw = ((clientX - rect.left) / rect.width) * 100
  sliderPercent.value = Math.max(4, Math.min(96, Math.round(raw)))
}

function onPointerDown(e: PointerEvent) {
  isDragging.value = true
  ;(e.currentTarget as HTMLElement)?.setPointerCapture?.(e.pointerId)
  updateFromPointer(e.clientX)
}

function onPointerMove(e: PointerEvent) {
  if (!isDragging.value) return
  updateFromPointer(e.clientX)
}

function onPointerUp(e: PointerEvent) {
  if (!isDragging.value) return
  isDragging.value = false
  ;(e.currentTarget as HTMLElement)?.releasePointerCapture?.(e.pointerId)
}

function onKeyDown(e: KeyboardEvent) {
  if (e.key === 'ArrowLeft') {
    e.preventDefault()
    sliderPercent.value = Math.max(4, sliderPercent.value - 5)
  } else if (e.key === 'ArrowRight') {
    e.preventDefault()
    sliderPercent.value = Math.min(96, sliderPercent.value + 5)
  }
}
</script>

<template>
  <section id="before-after" class="section-shell ba-section" aria-labelledby="ba-heading">
    <div class="container">
      <div class="section-header ba-header">
        <p class="section-meta">
          <span class="section-meta__num">03</span>
          <span>До и после</span>
        </p>
        <h2 id="ba-heading" class="section-title section-title--display">Результат работы</h2>

        <div class="ba-categories" role="tablist" aria-label="Категории До и После">
          <button
            v-for="cat in BEFORE_AFTER_CATEGORIES"
            :key="cat.slug"
            type="button"
            role="tab"
            :aria-selected="activeCategory === cat.slug"
            class="ba-cat-btn"
            :class="{ 'ba-cat-btn--active': activeCategory === cat.slug }"
            @click="selectCategory(cat.slug)"
          >
            {{ cat.label }}
          </button>
        </div>
      </div>

      <div class="ba-stage">
        <div
          ref="stageRef"
          class="ba-viewport"
          role="slider"
          tabindex="0"
          :aria-label="`Сравнение До и После: ${currentCase.categoryLabel}`"
          :aria-valuemin="4"
          :aria-valuemax="96"
          :aria-valuenow="sliderPercent"
          @pointerdown="onPointerDown"
          @pointermove="onPointerMove"
          @pointerup="onPointerUp"
          @pointercancel="onPointerUp"
          @keydown="onKeyDown"
        >
          <img
            :src="currentCase.afterImage"
            :alt="`${currentCase.categoryLabel} — после ухода в SEMALI AQUA`"
            width="1400"
            height="900"
            loading="lazy"
            class="ba-image ba-image--after"
            draggable="false"
          />

          <div
            class="ba-before-layer"
            :style="{ clipPath: `inset(0 ${100 - sliderPercent}% 0 0)` }"
          >
            <img
              :src="currentCase.beforeImage"
              :alt="`${currentCase.categoryLabel} — до ухода`"
              width="1400"
              height="900"
              loading="lazy"
              class="ba-image ba-image--before"
              draggable="false"
            />
          </div>

          <div class="ba-divider" :style="{ left: `${sliderPercent}%` }" aria-hidden="true">
            <div class="ba-handle">
              <span></span>
            </div>
          </div>

          <div class="ba-labels" aria-hidden="true">
            <span>До</span>
            <span>После</span>
          </div>
        </div>

        <div class="ba-controls">
          <button type="button" class="ba-quick-btn" @click="sliderPercent = 85">До</button>
          <input
            v-model.number="sliderPercent"
            type="range"
            min="4"
            max="96"
            class="ba-range-input"
            :aria-label="`Ползунок сравнения: ${currentCase.categoryLabel}`"
          />
          <button type="button" class="ba-quick-btn" @click="sliderPercent = 15">После</button>
        </div>
      </div>

      <div class="ba-case">
        <div class="ba-case__meta">
          <span class="ba-case__zone">{{ currentCase.categoryLabel }}</span>
          <span class="price-mono ba-case__price">{{ currentCase.priceReference }}</span>
        </div>
        <h3 class="ba-case__title">{{ currentCase.title }}</h3>
        <p class="ba-case__service">{{ currentCase.serviceReference }}</p>

        <button
          type="button"
          class="btn btn-primary ba-case__cta"
          @click="emit('open-booking', { serviceName: currentCase.serviceReference })"
        >
          Записаться
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ba-section {
  background-color: var(--bg-deep);
}

.ba-header {
  max-width: none;
}

.ba-categories {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.35rem;
}

.ba-cat-btn {
  padding: 0.48rem 0.9rem;
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

.ba-cat-btn:hover {
  color: var(--text-primary);
  border-color: var(--border-strong);
}

.ba-cat-btn--active {
  background-color: var(--text-primary);
  color: var(--bg-deep);
  border-color: var(--text-primary);
}

.ba-stage {
  margin-bottom: clamp(1.75rem, 3vw, 2.5rem);
}

.ba-viewport {
  position: relative;
  aspect-ratio: 16 / 9;
  min-height: min(62vh, 720px);
  user-select: none;
  touch-action: pan-y;
  cursor: ew-resize;
  overflow: hidden;
  background-color: var(--bg-primary);
}

.ba-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}

.ba-before-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.ba-divider {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 1px;
  background-color: rgba(255, 255, 255, 0.85);
  transform: translateX(-50%);
  pointer-events: none;
}

.ba-handle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: var(--text-primary);
  color: var(--bg-deep);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0, 0, 0, 0.15);
}

.ba-handle span {
  width: 14px;
  height: 1.5px;
  background: currentColor;
  position: relative;
}

.ba-handle span::before,
.ba-handle span::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 6px;
  height: 6px;
  border-top: 1.5px solid currentColor;
  border-right: 1.5px solid currentColor;
}

.ba-handle span::before {
  left: -2px;
  transform: translateY(-50%) rotate(-135deg);
}

.ba-handle span::after {
  right: -2px;
  transform: translateY(-50%) rotate(45deg);
}

.ba-labels {
  position: absolute;
  left: 1rem;
  right: 1rem;
  bottom: 1rem;
  display: flex;
  justify-content: space-between;
  pointer-events: none;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.75);
}

.ba-controls {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.85rem 0 0;
}

.ba-quick-btn {
  padding: 0.4rem 0.7rem;
  border: 1px solid var(--border-subtle);
  background: transparent;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-secondary);
  cursor: pointer;
}

.ba-quick-btn:hover {
  color: var(--text-primary);
  border-color: var(--border-strong);
}

.ba-range-input {
  flex: 1;
  accent-color: var(--text-primary);
  cursor: pointer;
}

.ba-case {
  max-width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  padding-top: 0.35rem;
}

.ba-case__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.ba-case__zone {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.ba-case__price {
  font-size: 0.9rem;
  color: var(--text-primary);
}

.ba-case__title {
  font-size: clamp(1.25rem, 2vw, 1.55rem);
  font-weight: 700;
  letter-spacing: -0.02em;
}

.ba-case__service {
  font-size: 0.92rem;
  color: var(--text-secondary);
}

.ba-case__cta {
  align-self: flex-start;
  margin-top: 0.65rem;
}

@media (max-width: 720px) {
  .ba-viewport {
    aspect-ratio: 4 / 3;
    min-height: 0;
  }

  .ba-case__cta {
    width: 100%;
  }
}
</style>
