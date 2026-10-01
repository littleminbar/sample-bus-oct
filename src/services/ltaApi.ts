/**
 * Client Service for LTA DataMall v3 Bus Arrival & Health Check APIs
 */

export interface LtaNextBusData {
  OriginCode: string;
  DestinationCode: string;
  EstimatedArrival: string;
  Monitored: number;
  Latitude?: string;
  Longitude?: string;
  VisitNumber?: string;
  Load?: 'SEA' | 'SDA' | 'LSD';
  Feature?: 'WAB' | string;
  Type?: 'SD' | 'DD' | 'BD';
  VehicleTypeLabel?: string;
  LoadInfo?: {
    code: 'SEA' | 'SDA' | 'LSD';
    label: string;
    level: number;
  };
  IsWab?: boolean;
  MinutesUntilArrival?: number | null;
  SecondsRemaining?: number;
  FormattedArrival?: string;
}

export interface LtaServiceData {
  ServiceNo: string;
  Operator?: string;
  NextBus?: LtaNextBusData | null;
  NextBus2?: LtaNextBusData | null;
  NextBus3?: LtaNextBusData | null;
}

export interface LtaBusArrivalResponse {
  source: 'lta_datamall' | 'simulated_fallback';
  BusStopCode: string;
  Services: LtaServiceData[];
  timestamp?: string;
  hasAccountKeyConfigured?: boolean;
  message?: string;
  warning?: string;
}

export interface ApiHealthResponse {
  status: 'healthy' | 'degraded';
  timestamp: string;
  uptimeSeconds: number;
  apis: {
    busArrival: {
      endpoint: string;
      status: string;
      version: string;
      hasLtaAccountKey: boolean;
      ltaAccountKeyMasked: string | null;
    };
    health: {
      endpoint: string;
      status: string;
    };
  };
}

/**
 * Fetches real-time bus arrivals for a bus stop from the /api/bus-arrival endpoint
 * @param busStopCode 5-digit bus stop code (e.g. "83139", "76191")
 * @param serviceNo Optional service number (e.g. "15", "65")
 */
export async function fetchBusArrivals(
  busStopCode: string,
  serviceNo?: string
): Promise<LtaBusArrivalResponse> {
  const params = new URLSearchParams();
  params.set('BusStopCode', busStopCode);
  if (serviceNo) {
    params.set('ServiceNo', serviceNo);
  }

  const res = await fetch(`/api/bus-arrival?${params.toString()}`);
  if (!res.ok) {
    throw new Error(`Bus arrival API returned HTTP ${res.status}`);
  }
  return res.json();
}

/**
 * Checks API health from /api/health
 */
export async function checkApiHealth(): Promise<ApiHealthResponse> {
  const res = await fetch('/api/health');
  if (!res.ok) {
    throw new Error(`Health check API returned HTTP ${res.status}`);
  }
  return res.json();
}
