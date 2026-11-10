import { assetUrl } from '@/utils/assets'

export type VehicleBodyType = 'all' | 'sedan' | 'suv' | 'minibus'

export interface VehicleBodyOption {
  id: VehicleBodyType
  label: string
  shortLabel: string
  subtitle: string
}

export const VEHICLE_BODY_OPTIONS: VehicleBodyOption[] = [
  { id: 'all', label: 'Все типы кузова', shortLabel: 'Все кузова', subtitle: 'Полный прайс по всем классам' },
  { id: 'sedan', label: 'Седан / Универсал', shortLabel: 'Седан', subtitle: 'Седаны, хэтчбеки, купе, универсалы' },
  { id: 'suv', label: 'Внедорожник / Кроссовер', shortLabel: 'Внедорожник', subtitle: 'SUV, кроссоверы и пикапы' },
  { id: 'minibus', label: 'Микроавтобус / Минивэн', shortLabel: 'Микроавтобус', subtitle: 'Бусы, V-Class, Multivan и аналоги' }
]

export interface BodyPriceItem {
  bodyType: Exclude<VehicleBodyType, 'all'>
  bodyLabel: string
  priceDisplay: string
  numericFrom: number
}

export interface ServiceItem {
  id: string
  categoryCode: '01' | '02' | '03' | '04'
  categorySlug: 'wash' | 'detailing' | 'interior' | 'polish-ceramic'
  title: string
  subtitle: string
  tag?: string
  isFlagship?: boolean
  isPremiumTier?: boolean
  quote?: string
  included: string[]
  includedGroups?: {
    groupTitle: string
    items: string[]
  }[]
  bonuses?: string[]
  fixedPriceDisplay?: string
  fixedPriceNumeric?: number
  pricesByBody?: BodyPriceItem[]
  rangeOptions?: {
    variantTitle: string
    variantBadge: string
    priceRangeDisplay: string
    numericFrom: number
    description: string
    highlights: string[]
  }[]
  imagePlaceholder: string
}

export interface ServiceCategory {
  code: '01' | '02' | '03' | '04'
  slug: 'wash' | 'detailing' | 'interior' | 'polish-ceramic'
  name: string
  enName: string
  summary: string
  priceStartDisplay: string
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    code: '01',
    slug: 'wash',
    name: 'Мойка и VIP-комплекс',
    enName: 'МОЙКА',
    summary: 'Бережная трёхфазная технология мойки кузова, дисков и проёмов + флагманский VIP-комплекс за 100 BYN.',
    priceStartDisplay: 'от 25 BYN'
  },
  {
    code: '02',
    slug: 'detailing',
    name: 'Детейлинг-мойка',
    enName: 'DETAILING',
    summary: 'Глубокая 14-этапная проработка кузова кистями, подкапотного пространства, дисков, салона и защитное покрытие.',
    priceStartDisplay: 'от 300 BYN'
  },
  {
    code: '03',
    slug: 'interior',
    name: 'Химчистка салона',
    enName: 'INTERIOR',
    summary: 'Деликатная глубокая очистка текстиля, кожи, потолка, ковролина и пластика — без разбора или с полным разбором.',
    priceStartDisplay: 'от 300 BYN'
  },
  {
    code: '04',
    slug: 'polish-ceramic',
    name: 'Полировка и керамика',
    enName: 'POLISH & CERAMIC',
    summary: 'Восстановление глубокого зеркального глянца ЛКП и долговременная гидрофобная керамическая защита кузова.',
    priceStartDisplay: 'от 600 BYN'
  }
]

export const SERVICES: ServiceItem[] = [
  {
    id: 'wash-no-dry',
    categoryCode: '01',
    categorySlug: 'wash',
    title: 'Мойка «Без сушки»',
    subtitle: 'Быстрая бережная трёхфазная мойка для регулярного поддержания чистоты автомобиля.',
    tag: 'БАЗОВЫЙ УХОД',
    included: [
      'Трёхфазная мойка кузова',
      'Мойка колёсных дисков',
      'Мойка дверных проёмов',
      'Мойка ковриков'
    ],
    pricesByBody: [
      { bodyType: 'sedan', bodyLabel: 'Седан', priceDisplay: '25 BYN', numericFrom: 25 },
      { bodyType: 'suv', bodyLabel: 'Внедорожник', priceDisplay: '30 BYN', numericFrom: 30 },
      { bodyType: 'minibus', bodyLabel: 'Микроавтобус', priceDisplay: '50 BYN', numericFrom: 50 }
    ],
    imagePlaceholder: assetUrl('assets/images/services/wash-three-phase.svg')
  },
  {
    id: 'wash-standard',
    categoryCode: '01',
    categorySlug: 'wash',
    title: 'Стандартная мойка кузова',
    subtitle: 'Полноценная трёхфазная мойка с деликатной сушкой кузова и проёмов без разводов и царапин.',
    tag: 'ОПТИМАЛЬНО НА КАЖДЫЙ ДЕНЬ',
    included: [
      'Трёхфазная мойка кузова',
      'Бережная сушка кузова',
      'Мойка и протирка проёмов',
      'Мойка ковриков'
    ],
    pricesByBody: [
      { bodyType: 'sedan', bodyLabel: 'Седан / универсал', priceDisplay: '35 BYN', numericFrom: 35 },
      { bodyType: 'suv', bodyLabel: 'Внедорожник', priceDisplay: '40 BYN', numericFrom: 40 }
    ],
    imagePlaceholder: assetUrl('assets/images/services/wash-standard.svg')
  },
  {
    id: 'vip-complex',
    categoryCode: '01',
    categorySlug: 'wash',
    title: 'VIP-комплекс',
    subtitle: 'Комплексный уход за автомобилем по единой фиксированной цене + 2 бонусные процедуры в подарок.',
    tag: 'Signature service',
    isFlagship: true,
    quote: 'Вы отдаёте нам грязную машину, мы возвращаем её идеально чистой.',
    included: [
      'Комплексная трёхфазная мойка кузова и дисков',
      'Тщательная сушка кузова и дверных проёмов',
      'Комплексная уборка салона и ковриков',
      'Приведение стёкол и поверхностей в идеальный вид'
    ],
    bonuses: [
      'Очистка лобового стекла от водного камня',
      'Нанесение гидрофобного состава «Антидождь»'
    ],
    fixedPriceDisplay: '100 BYN',
    fixedPriceNumeric: 100,
    imagePlaceholder: assetUrl('assets/images/services/vip-complex.svg')
  },
  {
    id: 'detailing-wash',
    categoryCode: '02',
    categorySlug: 'detailing',
    title: 'Детейлинг-мойка',
    subtitle: 'Максимально глубокая комплексная очистка каждой детали экстерьера, подкапотного пространства и интерьера.',
    tag: '14 ЭТАПОВ ДЕТЕЙЛИНГА',
    included: [
      'Трёхфазная мойка кузова с использованием кистей',
      'Отбеливание дисков',
      'Мойка подкапотного пространства',
      'Бережная сушка кузова и труднодоступных зон',
      'Очистка дверных проёмов',
      'Мойка и сушка ковриков',
      'Тщательный пылесос салона и багажника',
      'Влажная уборка салона',
      'Чистка всего пластика в салоне',
      'Обработка пластика матовой полиролью',
      'Идеальная очистка всех стёкол',
      'Нанесение твёрдого воска на кузов',
      'Чернение резины',
      'Антидождь на переднюю полусферу'
    ],
    includedGroups: [
      {
        groupTitle: 'Экстерьер и подкапотное пространство',
        items: [
          'Трёхфазная мойка кузова с использованием детейлинг-кистей',
          'Отбеливание колёсных дисков',
          'Безопасная мойка подкапотного пространства',
          'Промывка дверных проёмов и ковриков',
          'Деликатная бесконтактная и микрофибровая сушка'
        ]
      },
      {
        groupTitle: 'Интерьер и уход за поверхностями',
        items: [
          'Глубокий пылесос пола, сидений и ниш',
          'Влажная уборка всего салона',
          'Детальная чистка всего пластика',
          'Обработка пластика благородной матовой полиролью',
          'Очистка стёкол изнутри и снаружи без бликов'
        ]
      },
      {
        groupTitle: 'Защита и финальный стайлинг',
        items: [
          'Покрытие кузова твёрдым воском',
          'Антидождь на переднюю полусферу стёкол',
          'Консервация и чернение резины'
        ]
      }
    ],
    pricesByBody: [
      { bodyType: 'sedan', bodyLabel: 'Седан', priceDisplay: '300 BYN', numericFrom: 300 },
      { bodyType: 'suv', bodyLabel: 'Внедорожник', priceDisplay: '330 BYN', numericFrom: 330 },
      { bodyType: 'minibus', bodyLabel: 'Микроавтобус', priceDisplay: '360 BYN', numericFrom: 360 }
    ],
    imagePlaceholder: assetUrl('assets/images/services/detailing-wash.svg')
  },
  {
    id: 'interior-cleaning',
    categoryCode: '03',
    categorySlug: 'interior',
    title: 'Химчистка салона',
    subtitle: 'Профессиональное выведение пятен, запахов и глубоких загрязнений безопасными составами для кожи, алькантары, текстиля и пластика.',
    tag: 'ДВА ФОРМАТА ГЛУБИНЫ',
    included: [
      'Глубокая очистка сидений (кожа / ткань / комбинированные)',
      'Деликатная чистка потолка и стоек',
      'Химчистка ковролина, пола и багажного отделения',
      'Очистка ремней безопасности, дверных карт и приборной панели',
      'Бережная сушка салона'
    ],
    rangeOptions: [
      {
        variantTitle: 'Химчистка салона без разбора',
        variantBadge: 'БЕЗ РАЗБОРА',
        priceRangeDisplay: 'от 300 до 505 BYN',
        numericFrom: 300,
        description: 'Оптимально для планового освежения интерьера, удаления локальных пятен и следов повседневной эксплуатации без демонтажа кресел.',
        highlights: [
          'Полная проработка сидений, дверных карт, потолка и центральной консоли',
          'Глубокая экстракция доступных зон ковролина',
          'Безопасная профессиональная автохимия без резкого запаха',
          'Итоговая стоимость зависит от класса авто и степени загрязнения'
        ]
      },
      {
        variantTitle: 'Химчистка салона с разбором',
        variantBadge: 'С разбором',
        priceRangeDisplay: 'от 450 до 705 BYN',
        numericFrom: 450,
        description: 'Полная перезагрузка интерьера: аккуратный демонтаж сидений и элементов отделки для 100% доступа к скрытым полостям, салазкам и ковролину.',
        highlights: [
          'Бережный демонтаж и последующая установка сидений',
          'Очистка труднодоступных зон под креслами и вдоль центрального тоннеля',
          'Устранение въевшихся загрязнений, пролитых жидкостей и источников запаха',
          'Идеальный выбор после покупки авто с пробегом или перед продажей'
        ]
      }
    ],
    imagePlaceholder: assetUrl('assets/images/services/interior-dryclean.svg')
  },
  {
    id: 'polish-and-ceramic',
    categoryCode: '04',
    categorySlug: 'polish-ceramic',
    title: 'Лёгкая полировка кузова + керамика',
    subtitle: 'Премиальный комплекс восстановления глубины цвета, устранения мелкой риски («паутинки») и запечатывания лака прочным керамическим составом.',
    tag: 'Полировка и защита',
    isPremiumTier: true,
    included: [
      'Тщательная подготовительная мойка кузова',
      'Детальная мойка колёсных дисков',
      'Мойка дверных проёмов',
      'Полная сушка и подготовка поверхности',
      'Лёгкая восстановительная полировка кузова',
      'Нанесение защитного керамического покрытия'
    ],
    pricesByBody: [
      { bodyType: 'sedan', bodyLabel: 'Седан', priceDisplay: 'от 600 BYN', numericFrom: 600 },
      { bodyType: 'suv', bodyLabel: 'Внедорожник', priceDisplay: 'от 700 BYN', numericFrom: 700 },
      { bodyType: 'minibus', bodyLabel: 'Микроавтобус', priceDisplay: 'от 900 BYN', numericFrom: 900 }
    ],
    imagePlaceholder: assetUrl('assets/images/services/polish-ceramic.svg')
  }
]

export interface ExtraCareItem {
  id: string
  name: string
  category: 'exterior' | 'glass' | 'interior' | 'wheels'
  categoryLabel: string
  priceDisplay: string
  numericPrice: number
  isFromPrice?: boolean
}

export const EXTRA_CARE_ITEMS: ExtraCareItem[] = [
  {
    id: 'extra-wheels-whitening',
    name: 'Отбеливание дисков — 4 шт.',
    category: 'wheels',
    categoryLabel: 'Диски и резина',
    priceDisplay: '45 BYN',
    numericPrice: 45
  },
  {
    id: 'extra-engine-wash',
    name: 'Мойка подкапотного пространства',
    category: 'exterior',
    categoryLabel: 'Подкапотное и кузов',
    priceDisplay: '70 BYN',
    numericPrice: 70
  },
  {
    id: 'extra-quartz-coat',
    name: 'Кварцевое покрытие',
    category: 'exterior',
    categoryLabel: 'Подкапотное и кузов',
    priceDisplay: '30 BYN',
    numericPrice: 30
  },
  {
    id: 'extra-hard-wax-sedan',
    name: 'Твёрдый воск — седан',
    category: 'exterior',
    categoryLabel: 'Подкапотное и кузов',
    priceDisplay: '100 BYN',
    numericPrice: 100
  },
  {
    id: 'extra-hard-wax-suv',
    name: 'Твёрдый воск — внедорожник',
    category: 'exterior',
    categoryLabel: 'Подкапотное и кузов',
    priceDisplay: '120 BYN',
    numericPrice: 120
  },
  {
    id: 'extra-hard-wax-minibus',
    name: 'Твёрдый воск — микроавтобус',
    category: 'exterior',
    categoryLabel: 'Подкапотное и кузов',
    priceDisplay: '150 BYN',
    numericPrice: 150
  },
  {
    id: 'extra-anti-rain-front',
    name: 'Антидождь — передняя полусфера',
    category: 'glass',
    categoryLabel: 'Стёкла и оптика',
    priceDisplay: '130 BYN',
    numericPrice: 130
  },
  {
    id: 'extra-glass-wash',
    name: 'Мойка стёкол',
    category: 'glass',
    categoryLabel: 'Стёкла и оптика',
    priceDisplay: '15 BYN',
    numericPrice: 15
  },
  {
    id: 'extra-vacuum',
    name: 'Пылесос салона',
    category: 'interior',
    categoryLabel: 'Салон',
    priceDisplay: '20 BYN',
    numericPrice: 20
  },
  {
    id: 'extra-wet-clean-plastic',
    name: 'Влажная уборка + полироль пластика',
    category: 'interior',
    categoryLabel: 'Салон',
    priceDisplay: '25 BYN',
    numericPrice: 25
  },
  {
    id: 'extra-bitumen-removal',
    name: 'Удаление битума — 1 элемент',
    category: 'exterior',
    categoryLabel: 'Подкапотное и кузов',
    priceDisplay: '15 BYN',
    numericPrice: 15
  },
  {
    id: 'extra-tire-blackening',
    name: 'Чернение резины',
    category: 'wheels',
    categoryLabel: 'Диски и резина',
    priceDisplay: '15 BYN',
    numericPrice: 15
  },
  {
    id: 'extra-headlight-polish',
    name: 'Полировка фар',
    category: 'glass',
    categoryLabel: 'Стёкла и оптика',
    priceDisplay: '70 BYN',
    numericPrice: 70
  },
  {
    id: 'extra-water-spot-removal',
    name: 'Удаление водного камня — 1 сфера',
    category: 'glass',
    categoryLabel: 'Стёкла и оптика',
    priceDisplay: 'от 100 BYN',
    numericPrice: 100,
    isFromPrice: true
  }
]

export interface BenefitItem {
  code: string
  title: string
  description: string
  tag: string
}

export const BENEFITS: BenefitItem[] = [
  {
    code: '01',
    title: 'Премиальная автохимия',
    description: 'Используем деликатные проверенные составы, которые эффективно растворяют дорожный налёт, реагенты и битум, сохраняя блеск ЛКП, хром и резиновые уплотнители.',
    tag: 'SAFE CHEMISTRY'
  },
  {
    code: '02',
    title: 'Качество детейлинга в каждой услуге',
    description: 'Даже базовая мойка за 25–35 BYN выполняется по строгой трёхфазной технологии с промывкой дисков, ковриков и дверных проёмов.',
    tag: '3-PHASE STANDARD'
  },
  {
    code: '03',
    title: 'Безопасность при работе с подкапотным пространством',
    description: 'Деликатная технология очистки моторного отсека (70 BYN или в составе Детейлинг-мойки) с пониманием узлов и защитой уязвимых элементов.',
    tag: 'ENGINE BAY SAFETY'
  },
  {
    code: '04',
    title: 'Профессиональный подход и ответственность за результат',
    description: 'Не работаем на поток ради скорости: внимательно осматриваем автомобиль при приёмке и контролируем чистоту каждой зоны при выдаче.',
    tag: 'QUALITY CONTROL'
  },
  {
    code: '05',
    title: 'Широкий спектр услуг в одном месте',
    description: 'От быстрой трёхфазной мойки и VIP-комплекса до глубокой химчистки с разбором салона, полировки фар и керамической защиты кузова.',
    tag: 'FULL CARE CYCLE'
  },
  {
    code: '06',
    title: 'Доступная стоимость относительно уровня ухода',
    description: 'Вы получаете студийное отношение к автомобилю по честным и открытым ценам без скрытых доплат — весь прайс зафиксирован на сайте.',
    tag: 'FAIR PRICING'
  }
]

export interface ProcessStep {
  number: string
  title: string
  description: string
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Записываетесь',
    description: 'Звоните по номеру +375 (29) 317-08-08 или пишите в Instagram / Threads — согласуем удобное время.'
  },
  {
    number: '02',
    title: 'Приезжаете',
    description: 'Ждём вас по адресу: Минск, ул. Могилёвская, 39Б (рядом со ст. м. Институт культуры и Вокзальная).'
  },
  {
    number: '03',
    title: 'Мы оцениваем автомобиль',
    description: 'Осматриваем состояние кузова, стёкол или салона, подтверждаем перечень работ и фиксируем точную стоимость.'
  },
  {
    number: '04',
    title: 'Выполняем работы',
    description: 'Бережно проводим мойку, детейлинг, химчистку или полировку с соблюдением технологии и безопасной автохимией.'
  },
  {
    number: '05',
    title: 'Вы забираете чистый автомобиль',
    description: 'Проверяете результат при студийном освещении и получаете ухоженный автомобиль, на который приятно смотреть.'
  }
]
