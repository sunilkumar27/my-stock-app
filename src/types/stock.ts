// src/types/stocks.ts
export interface StockMatch {
  "1. symbol": string;
  "2. name": string;
  "3. type": string;
  "4. region": string;
  "5. marketOpen": string;
  "6. marketClose": string;
  "7. timezone": string;
  "8. currency": string;
  "9. matchScore": string;
}

export interface SearchResponse {
  bestMatches: StockMatch[];
}

export interface Stock {
  symbol: string;
  name: string;
  type: string;
  region: string;
  currency: string;
  marketOpen: string;
  marketClose: string;
  timezone: string;
  matchScore: number;
}

export interface StockOverview {
  Symbol: string;
  Name: string;
  Description: string;
  Exchange: string;
  Sector: string;
  Industry: string;
  MarketCapitalization: string;
  PERatio: string;
  DividendYield: string;
  EPS: string;
  "52WeekHigh": string;
  "52WeekLow": string;
  "50DayMovingAverage": string;
  AnalystTargetPrice: string;
}
