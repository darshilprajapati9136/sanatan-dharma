/** Provider boundary. Never infer live values from a fixture or an LLM. */
export interface PanchangContext {
  date: string | null;
  location: string;
  timeZone: string;
  latitude: number;
  longitude: number;
}
export interface PanchangData {
  status: 'sample' | 'live' | 'unavailable';
  context: PanchangContext;
  provenance: {
    provider: string;
    calculatedAt: string | null;
    convention: string | null;
  };
  values: Record<
    | 'tithi'
    | 'nakshatra'
    | 'paksha'
    | 'sunrise'
    | 'sunset'
    | 'rahu'
    | 'muhurat'
    | 'observance',
    {en: string; hi: string} | null
  >;
  details: Partial<
    Record<
      | 'tithiTransitions'
      | 'nakshatraTransitions'
      | 'yoga'
      | 'karana'
      | 'moonrise'
      | 'moonset'
      | 'choghadiya'
      | 'hora'
      | 'yamaganda'
      | 'gulika'
      | 'abhijit'
      | 'month'
      | 'samvat',
      string
    >
  >;
}
export interface PanchangProvider {
  getDay(context: PanchangContext): Promise<PanchangData>;
}
export const samplePanchang: PanchangData = {
  status: 'sample',
  context: {
    date: null,
    location: 'New Delhi',
    timeZone: 'Asia/Kolkata',
    latitude: 28.6139,
    longitude: 77.209
  },
  provenance: {
    provider: 'illustrative-fixture',
    calculatedAt: null,
    convention: null
  },
  values: {
    tithi: {en: 'Shukla Panchami', hi: 'शुक्ल पंचमी'},
    nakshatra: {en: 'Rohini', hi: 'रोहिणी'},
    paksha: {en: 'Shukla', hi: 'शुक्ल'},
    sunrise: {en: '06:15', hi: '०६:१५'},
    sunset: {en: '18:30', hi: '१८:३०'},
    rahu: {en: '10:50–12:20', hi: '१०:५०–१२:२०'},
    muhurat: null,
    observance: null
  },
  details: {}
};
