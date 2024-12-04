// src/api/stockApi.ts
import { Stock, SearchResponse, StockMatch } from "../types/stock";

const BASE_URL = "https://www.alphavantage.co/query";
//const API_KEY = "RIBXT3XYLI69PC0Q";
const API_KEY = "64FOODU0WV7TGOMF"; // Mock data
const mockStocks = {
  bestMatches: [
    {
      "1. symbol": "TSCO.LON",
      "2. name": "Tesco PLC",
      "3. type": "Equity",
      "4. region": "United Kingdom",
      "5. marketOpen": "08:00",
      "6. marketClose": "16:30",
      "7. timezone": "UTC+01",
      "8. currency": "GBX",
      "9. matchScore": "0.7273",
    },
    {
      "1. symbol": "TSCDF",
      "2. name": "Tesco plc",
      "3. type": "Equity",
      "4. region": "United States",
      "5. marketOpen": "09:30",
      "6. marketClose": "16:00",
      "7. timezone": "UTC-04",
      "8. currency": "USD",
      "9. matchScore": "0.7143",
    },
    {
      "1. symbol": "TSCDY",
      "2. name": "Tesco plc",
      "3. type": "Equity",
      "4. region": "United States",
      "5. marketOpen": "09:30",
      "6. marketClose": "16:00",
      "7. timezone": "UTC-04",
      "8. currency": "USD",
      "9. matchScore": "0.7143",
    },
    {
      "1. symbol": "TCO2.FRK",
      "2. name": "TESCO PLC ADR/1 LS-05",
      "3. type": "Equity",
      "4. region": "Frankfurt",
      "5. marketOpen": "08:00",
      "6. marketClose": "20:00",
      "7. timezone": "UTC+02",
      "8. currency": "EUR",
      "9. matchScore": "0.5455",
    },
    {
      "1. symbol": "TCO0.FRK",
      "2. name": "TESCO PLC LS-0633333",
      "3. type": "Equity",
      "4. region": "Frankfurt",
      "5. marketOpen": "08:00",
      "6. marketClose": "20:00",
      "7. timezone": "UTC+02",
      "8. currency": "EUR",
      "9. matchScore": "0.5455",
    },
    {
      "1. symbol": "NNND.FRK",
      "2. name": "Tencent Holdings Ltd",
      "3. type": "Equity",
      "4. region": "Frankfurt",
      "5. marketOpen": "08:00",
      "6. marketClose": "20:00",
      "7. timezone": "UTC+02",
      "8. currency": "EUR",
      "9. matchScore": "0.5185",
    },
    {
      "1. symbol": "TCEHY",
      "2. name": "Tencent Holdings Ltd",
      "3. type": "Equity",
      "4. region": "United States",
      "5. marketOpen": "09:30",
      "6. marketClose": "16:00",
      "7. timezone": "UTC-04",
      "8. currency": "USD",
      "9. matchScore": "0.5185",
    },
    {
      "1. symbol": "TCTZF",
      "2. name": "Tencent Holdings Ltd",
      "3. type": "Equity",
      "4. region": "United States",
      "5. marketOpen": "09:30",
      "6. marketClose": "16:00",
      "7. timezone": "UTC-04",
      "8. currency": "USD",
      "9. matchScore": "0.5185",
    },
    {
      "1. symbol": "NNN1.FRK",
      "2. name": "Tencent Holdings Ltd ADR",
      "3. type": "Equity",
      "4. region": "Frankfurt",
      "5. marketOpen": "08:00",
      "6. marketClose": "20:00",
      "7. timezone": "UTC+02",
      "8. currency": "EUR",
      "9. matchScore": "0.4516",
    },
    {
      "1. symbol": "TME",
      "2. name": "Tencent Music Entertainment Group",
      "3. type": "Equity",
      "4. region": "United States",
      "5. marketOpen": "09:30",
      "6. marketClose": "16:00",
      "7. timezone": "UTC-04",
      "8. currency": "USD",
      "9. matchScore": "0.4000",
    },
    {
      "1. symbol": "63TA.FRK",
      "2. name": "Tencent Music Entertainment Group",
      "3. type": "Equity",
      "4. region": "Frankfurt",
      "5. marketOpen": "08:00",
      "6. marketClose": "20:00",
      "7. timezone": "UTC+02",
      "8. currency": "EUR",
      "9. matchScore": "0.3500",
    },
    {
      "1. symbol": "SAIC",
      "2. name": "Science Applications International Corp",
      "3. type": "Equity",
      "4. region": "United States",
      "5. marketOpen": "09:30",
      "6. marketClose": "16:00",
      "7. timezone": "UTC-04",
      "8. currency": "USD",
      "9. matchScore": "1.0000",
    },
    {
      "1. symbol": "SAICX",
      "2. name": "JPMORGAN SMARTALLOCATION INCOME FUND CLASS C",
      "3. type": "Mutual Fund",
      "4. region": "United States",
      "5. marketOpen": "09:30",
      "6. marketClose": "16:00",
      "7. timezone": "UTC-04",
      "8. currency": "USD",
      "9. matchScore": "0.8889",
    },
    {
      "1. symbol": "SAICAPI.BSE",
      "2. name": "SAI CAPITAL LTD.",
      "3. type": "Equity",
      "4. region": "India/Bombay",
      "5. marketOpen": "09:15",
      "6. marketClose": "15:30",
      "7. timezone": "UTC+5.5",
      "8. currency": "INR",
      "9. matchScore": "0.5714",
    },
    {
      "1. symbol": "600104.SHH",
      "2. name": "SAIC Motor Corporation Ltd",
      "3. type": "Equity",
      "4. region": "Shanghai",
      "5. marketOpen": "09:30",
      "6. marketClose": "15:00",
      "7. timezone": "UTC+08",
      "8. currency": "CNY",
      "9. matchScore": "0.2667",
    },
  ],
};

const transformStockMatch = (match: StockMatch): Stock => ({
  symbol: match["1. symbol"],
  name: match["2. name"],
  type: match["3. type"],
  region: match["4. region"],
  marketOpen: match["5. marketOpen"],
  marketClose: match["6. marketClose"],
  timezone: match["7. timezone"],
  currency: match["8. currency"],
  matchScore: parseFloat(match["9. matchScore"]),
});

/*export const stockApi = {
  searchStocks: async (query: string): Promise<Stock[]> => {
    try {
      const response = await fetch(
        `${BASE_URL}?function=SYMBOL_SEARCH&keywords=${encodeURIComponent(
          query
        )}&apikey=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error("Search failed");
      }

      const data: SearchResponse = await response.json();

      if (!data.bestMatches) {
        return [];
      }

      return data.bestMatches.map(transformStockMatch);
    } catch (error) {
      console.error("Search error:", error);
      throw new Error("Failed to search stocks");
    }
  },

  getStockDetails: async (symbol: string) => {
    try {
      const response = await fetch(
        `${BASE_URL}?function=OVERVIEW&symbol=${encodeURIComponent(
          symbol
        )}&apikey=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch stock details");
      }

      const data = await response.json();

      // Log the response to see what we're getting
      console.log("Stock details response:", data);

      if (Object.keys(data).length === 0) {
        throw new Error("No data available for this symbol");
      }

      return data;
    } catch (error) {
      console.error("Details error:", error);
      throw new Error("Failed to fetch stock details");
    }
  },
};*/

export const stockApi = {
  searchStocks: async (query: string): Promise<Stock[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Filter mock data based on query
    const filteredStocks = mockStocks.bestMatches.filter(
      (stock) =>
        stock["1. symbol"].toLowerCase().includes(query.toLowerCase()) ||
        stock["2. name"].toLowerCase().includes(query.toLowerCase())
    );

    return filteredStocks.map(transformStockMatch);
  },

  getStockDetails: async (symbol: string) => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const mockDetails = {
      Symbol: "IBM",
      AssetType: "Common Stock",
      Name: "International Business Machines",
      Description:
        "International Business Machines Corporation (IBM) is an American multinational technology company headquartered in Armonk, New York, with operations in over 170 countries. The company began in 1911, founded in Endicott, New York, as the Computing-Tabulating-Recording Company (CTR) and was renamed International Business Machines in 1924. IBM is incorporated in New York. IBM produces and sells computer hardware, middleware and software, and provides hosting and consulting services in areas ranging from mainframe computers to nanotechnology. IBM is also a major research organization, holding the record for most annual U.S. patents generated by a business (as of 2020) for 28 consecutive years. Inventions by IBM include the automated teller machine (ATM), the floppy disk, the hard disk drive, the magnetic stripe card, the relational database, the SQL programming language, the UPC barcode, and dynamic random-access memory (DRAM). The IBM mainframe, exemplified by the System/360, was the dominant computing platform during the 1960s and 1970s.",
      CIK: "51143",
      Exchange: "NYSE",
      Currency: "USD",
      Country: "USA",
      Sector: "TECHNOLOGY",
      Industry: "COMPUTER & OFFICE EQUIPMENT",
      Address: "1 NEW ORCHARD ROAD, ARMONK, NY, US",
      OfficialSite: "https://www.ibm.com",
      FiscalYearEnd: "December",
      LatestQuarter: "2024-09-30",
      MarketCapitalization: "210273518000",
      EBITDA: "14676000000",
      PERatio: "33.1",
      PEGRatio: "7.53",
      BookValue: "26.44",
      DividendPerShare: "6.66",
      DividendYield: "0.0294",
      EPS: "6.87",
      RevenuePerShareTTM: "68.11",
      ProfitMargin: "0.102",
      OperatingMarginTTM: "0.141",
      ReturnOnAssetsTTM: "0.0473",
      ReturnOnEquityTTM: "0.267",
      RevenueTTM: "62579999000",
      GrossProfitTTM: "32688000000",
      DilutedEPSTTM: "6.87",
      QuarterlyEarningsGrowthYOY: "0.141",
      QuarterlyRevenueGrowthYOY: "0.015",
      AnalystTargetPrice: "214.21",
      AnalystRatingStrongBuy: "2",
      AnalystRatingBuy: "5",
      AnalystRatingHold: "9",
      AnalystRatingSell: "3",
      AnalystRatingStrongSell: "1",
      TrailingPE: "33.1",
      ForwardPE: "21.1",
      PriceToSalesRatioTTM: "3.36",
      PriceToBookRatio: "8.6",
      EVToRevenue: "4.102",
      EVToEBITDA: "20.29",
      Beta: "0.71",
      "52WeekHigh": "235.52",
      "52WeekLow": "152.38",
      "50DayMovingAverage": "220.43",
      "200DayMovingAverage": "193.36",
      SharesOutstanding: "924645000",
      DividendDate: "2024-12-10",
      ExDividendDate: "2024-11-12",
    };

    return mockDetails;
  },
};
