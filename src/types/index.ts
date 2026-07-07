export interface Country {
  names: {
    common: string
  }
  codes: {
    alpha_2: string
    alpha_3: string
  }
  subregion: string
  flag: {
    emoji: string
    url_svg: string // Add this if you want to use the SVG image
  }
}

export interface WeatherWindow {
  dateFrom: string
  dateTo: string
  avgTempC: number
  minTempC: number
  maxTempC: number
  totalPrecipMm: number
  dominantCondition: string
}

export interface CurrencyRate {
  baseCurrency: string
  targetCurrency: string
  targetSymbol: string
  rate: number
  lastUpdated: string
}

export interface FCOAdvice {
  country: string
  slug: string
  safetyStatus: 'low' | 'medium' | 'high' | 'critical'
  summary: string
  lastUpdated: string
}

export interface BriefInputs {
  destination: string
  country: Country
  travelDates: { from: string; to: string }
  passportCountry: string
  weather: WeatherWindow
  currency: CurrencyRate
  fco: FCOAdvice
}

export interface TravelBrief {
  id: string
  destination: string
  countryCode: string
  countryFlag: string
  travelDates: { from: string; to: string }
  passportCountry: string
  weather: WeatherWindow
  currency: CurrencyRate
  fco: FCOAdvice
  synthesis: string
  createdAt: string
}

export interface SavedTrip {
  id: string
  brief: TravelBrief
  savedAt: string
}

export interface FreemiumState {
  briefsUsedThisMonth: number
  monthKey: string
  isPro: boolean
}

export type BriefStatus =
  | 'idle'
  | 'fetching-country'
  | 'fetching-data'
  | 'synthesising'
  | 'complete'
  | 'error'
