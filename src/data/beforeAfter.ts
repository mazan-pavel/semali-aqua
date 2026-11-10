export type BeforeAfterCategorySlug = 'body' | 'interior' | 'wheels' | 'engine' | 'headlights'

export interface BeforeAfterCase {
  id: string
  categorySlug: BeforeAfterCategorySlug
  categoryLabel: string
  title: string
  serviceReference: string
  priceReference: string
  description: string
  beforeLabel: string
  afterLabel: string
  beforeDetails: string
  afterDetails: string
  beforeImage: string
  afterImage: string
  isTemporaryPlaceholder: boolean
}

export const BEFORE_AFTER_CATEGORIES: { slug: BeforeAfterCategorySlug; label: string }[] = [
  { slug: 'body', label: 'Кузов' },
  { slug: 'interior', label: 'Салон' },
  { slug: 'wheels', label: 'Диски' },
  { slug: 'engine', label: 'Подкапотное пространство' },
  { slug: 'headlights', label: 'Фары' }
]

export const BEFORE_AFTER_CASES: BeforeAfterCase[] = [
  {
    id: 'case-body',
    categorySlug: 'body',
    categoryLabel: 'Кузов',
    title: 'Восстановление глубины цвета и зеркального глянца',
    serviceReference: 'Лёгкая полировка кузова + керамика',
    priceReference: 'от 600 BYN',
    description:
      'Убираем паутинку и матовость лака — возвращаем чёткое отражение света и глубину чёрного.',
    beforeLabel: 'До',
    afterLabel: 'После',
    beforeDetails: 'Паутинка, голограммы и мутный блик на чёрном ЛКП.',
    afterDetails: 'Глубокий глянец и чистое зеркальное отражение.',
    beforeImage: '/assets/images/before-after/body-before.svg',
    afterImage: '/assets/images/before-after/body-after.svg',
    isTemporaryPlaceholder: true
  },
  {
    id: 'case-interior',
    categorySlug: 'interior',
    categoryLabel: 'Салон',
    title: 'Глубокая химчистка кожи и текстиля',
    serviceReference: 'Химчистка салона',
    priceReference: 'от 300 BYN',
    description:
      'Выводим въевшуюся грязь и масла с кожи — возвращаем чистую фактуру перфорации и швов.',
    beforeLabel: 'До',
    afterLabel: 'После',
    beforeDetails: 'Засаленность, серый налёт и грязь в перфорации.',
    afterDetails: 'Чистая светлая кожа без липкости и налёта.',
    beforeImage: '/assets/images/before-after/interior-before.webp',
    afterImage: '/assets/images/before-after/interior-after.webp',
    isTemporaryPlaceholder: false
  },
  {
    id: 'case-wheels',
    categorySlug: 'wheels',
    categoryLabel: 'Диски',
    title: 'Отбеливание дисков и чернение резины',
    serviceReference: 'Отбеливание дисков + Чернение резины',
    priceReference: '45 BYN + 15 BYN',
    description:
      'Удаляем тормозную пыль со спиц и внутренней полки, возвращаем ухоженный вид резине.',
    beforeLabel: 'До',
    afterLabel: 'После',
    beforeDetails: 'Въевшаяся колодочная пыль и посеревшая резина.',
    afterDetails: 'Чистый металл и ровный тон шин.',
    beforeImage: '/assets/images/before-after/wheels-before.svg',
    afterImage: '/assets/images/before-after/wheels-after.svg',
    isTemporaryPlaceholder: true
  },
  {
    id: 'case-engine',
    categorySlug: 'engine',
    categoryLabel: 'Подкапотное пространство',
    title: 'Безопасная мойка моторного отсека',
    serviceReference: 'Мойка подкапотного пространства',
    priceReference: '70 BYN',
    description:
      'Аккуратно снимаем пыль и налёт с пластика и агрегатов — без риска для электроники.',
    beforeLabel: 'До',
    afterLabel: 'После',
    beforeDetails: 'Слой пыли на крышках, патрубках и пластике.',
    afterDetails: 'Чистый отсек, читаемые маркировки, ухоженный пластик.',
    beforeImage: '/assets/images/before-after/engine-before.webp',
    afterImage: '/assets/images/before-after/engine-after.webp',
    isTemporaryPlaceholder: false
  },
  {
    id: 'case-headlights',
    categorySlug: 'headlights',
    categoryLabel: 'Фары',
    title: 'Полировка оптики',
    serviceReference: 'Полировка фар',
    priceReference: '70 BYN',
    description:
      'Убираем матовость и пескоструй поликарбоната — возвращаем прозрачность и свет.',
    beforeLabel: 'До',
    afterLabel: 'После',
    beforeDetails: 'Мутный рассеиватель и рассеянный свет.',
    afterDetails: 'Прозрачная оптика и чёткая светотеневая граница.',
    beforeImage: '/assets/images/before-after/headlights-before.svg',
    afterImage: '/assets/images/before-after/headlights-after.svg',
    isTemporaryPlaceholder: true
  }
]
