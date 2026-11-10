export interface BrandInfo {
  name: string
  primaryWord: string
  secondaryWord: string
  legalName: string
  city: string
  streetAddress: string
  fullAddress: string
  landmarks: string
  phoneDisplay: string
  phoneRaw: string
  instagramUrl: string
  instagramHandle: string
  threadsUrl: string
  threadsHandle: string
  positioningQuote: string
  emotionalQuote: string
  coordinates: {
    lat: number
    lng: number
  }
  mapLinks: {
    yandex: string
    google: string
  }
}

export const BRAND: BrandInfo = {
  name: 'SEMALI AQUA',
  primaryWord: 'SEMALI',
  secondaryWord: 'AQUA',
  legalName: 'ООО «Авто Семали»',
  city: 'Минск',
  streetAddress: 'ул. Могилёвская, 39Б',
  fullAddress: 'Минск, ул. Могилёвская, 39Б',
  landmarks: 'ст. м. Институт культуры / Вокзальная',
  phoneDisplay: '+375 (29) 317-08-08',
  phoneRaw: '+375293170808',
  instagramUrl: 'https://www.instagram.com/semali_aqua.by/?hl=ru',
  instagramHandle: '@semali_aqua.by',
  threadsUrl: 'https://www.threads.com/@n.navicky',
  threadsHandle: '@n.navicky',
  positioningQuote: 'Профессиональный уход за автомобилем с качеством детейлинга по адекватной цене.',
  emotionalQuote: 'Машина должна выглядеть так, чтобы хотелось на неё смотреть.',
  coordinates: {
    lat: 53.8828,
    lng: 27.5322
  },
  mapLinks: {
    yandex: 'https://yandex.by/maps/?text=Минск%2C%20улица%20Могилёвская%2C%2039Б',
    google: 'https://www.google.com/maps/search/?api=1&query=Минск+улица+Могилёвская+39Б'
  }
}
