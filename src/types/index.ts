export interface Country {
  name: { common: string; official: string }
  capital: string[]
  currencies: Record<string, { name: string; symbol: string }>
  languages: Record<string, string>
  region: string
  subregion: string
  population: number
  flags: { svg: string; png: string; alt: string }
  latlng: [number, number]
  cca2: string
  cca3: string
  tld: string[]
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
