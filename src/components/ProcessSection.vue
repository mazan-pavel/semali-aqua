<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { BRAND } from '@/data/brand'
import { PROCESS_STEPS } from '@/data/services'
import { assetUrl } from '@/utils/assets'

const emit = defineEmits<{
  (e: 'open-booking', payload?: { serviceName?: string }): void
}>()

const videoRef = ref<HTMLVideoElement | null>(null)
const reduceMotion = ref(false)
const washVideo = assetUrl('assets/images/process/wash.mp4')
const washPoster = assetUrl('assets/images/process/wash-poster.jpg')

function syncMotionPreference() {
  reduceMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const video = videoRef.value
  if (!video) return
  if (reduceMotion.value) {
    video.pause()
  } else {
    video.play().catch(() => undefined)
  }
}

let motionQuery: MediaQueryList | null = null

onMounted(() => {
  syncMotionPreference()
  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  motionQuery.addEventListener('change', syncMotionPreference)
})

onUnmounted(() => {
  motionQuery?.removeEventListener('change', syncMotionPreference)
})
</script>

<template>
  <section id="process" class="section-shell process-section" aria-labelledby="process-heading">
    <div class="process-media" :style="{ '--process-poster': `url(${washPoster})` }">
      <video
        ref="videoRef"
        class="process-media__video"
        :src="washVideo"
        :poster="washPoster"
        muted
        loop
        playsinline
        preload="metadata"
        aria-label="Процесс мойки автомобиля в SEMALI AQUA"
      ></video>
      <div class="process-media__veil" aria-hidden="true"></div>
    </div>

    <div class="container process-layout">
      <div class="process-intro">
        <p class="section-meta">
          <span class="section-meta__num">05</span>
          <span>Как это проходит</span>
        </p>
        <h2 id="process-heading" class="section-title section-title--display">
          Процесс работы
        </h2>
        <blockquote class="process-quote">
          «{{ BRAND.emotionalQuote }}»
        </blockquote>
        <button
          type="button"
          class="btn btn-primary"
          @click="emit('open-booking')"
        >
          Записаться
        </button>
      </div>

      <ol class="process-list">
        <li
          v-for="step in PROCESS_STEPS"
          :key="step.number"
          class="process-step"
        >
          <span class="process-step__num price-mono">{{ step.number }}</span>
          <div>
            <h3 class="process-step__title">{{ step.title }}</h3>
            <p class="process-step__desc">{{ step.description }}</p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.process-section {
  position: relative;
  overflow: hidden;
  background-color: var(--bg-deep);
}

.process-media {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.process-media__video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  opacity: 0.38;
}

.process-media__veil {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(10, 11, 12, 0.92) 0%, rgba(10, 11, 12, 0.72) 45%, rgba(10, 11, 12, 0.55) 100%),
    linear-gradient(0deg, rgba(10, 11, 12, 0.7) 0%, transparent 45%, rgba(10, 11, 12, 0.4) 100%);
}

.process-layout {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: clamp(2rem, 4vw, 4rem);
  align-items: start;
}

.process-intro {
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
  max-width: 28rem;
}

.process-quote {
  font-size: clamp(1.15rem, 1.8vw, 1.4rem);
  line-height: 1.35;
  color: var(--text-primary);
  font-weight: 500;
  max-width: 18ch;
  margin: 0.2rem 0 0.35rem;
}

.process-list {
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--border-subtle);
}

.process-step {
  display: grid;
  grid-template-columns: 3rem 1fr;
  gap: 1rem;
  padding: 1.15rem 0;
  border-bottom: 1px solid var(--border-subtle);
}

.process-step__num {
  font-size: 0.85rem;
  color: var(--text-muted);
  padding-top: 0.2rem;
}

.process-step__title {
  font-size: 1.05rem;
  font-weight: 700;
  margin-bottom: 0.3rem;
}

.process-step__desc {
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.5;
  max-width: 42ch;
}

@media (max-width: 900px) {
  .process-layout {
    grid-template-columns: 1fr;
  }

  .process-list {
    padding-left: 0;
  }

  .process-media__video {
    opacity: 0.28;
  }

  .process-intro .btn {
    align-self: stretch;
  }
}

@media (prefers-reduced-motion: reduce) {
  .process-media__video {
    display: none;
  }

  .process-media {
    background: var(--process-poster) center / cover no-repeat;
  }

  .process-media::after {
    content: '';
    position: absolute;
    inset: 0;
    background:
      linear-gradient(90deg, rgba(10, 11, 12, 0.92) 0%, rgba(10, 11, 12, 0.72) 45%, rgba(10, 11, 12, 0.55) 100%);
  }
}
</style>
