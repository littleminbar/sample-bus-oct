export type CapacityLoad = 'SEA' | 'SDA' | 'LSD'; // Seats Available, Standing Available, Limited Standing
export type VehicleDeckType = 'Double Decker' | 'Single Deck' | 'Single Deck Loop' | 'Bendy';

export interface BusArrivalInfo {
  order: 1 | 2 | 3;
  minutesText: string; // e.g. "Arr", "2", "7", "11", "18"
  numericMins: number; // 0 for Arr
  secondsRemaining?: number;
  vehicleType: VehicleDeckType;
  load: CapacityLoad;
  wab: boolean;
  statusLabel?: string; // "ARRIVING", "On Schedule", "Heavy Load"
}

export interface RouteStopStep {
  code: string;
  name: string;
  road: string;
  estMins: number;
  isHere?: boolean;
}

export interface BusService {
  serviceNo: string;
  category: 'TRUNK' | 'EXPRESS' | 'FEEDER' | 'CITY_DIRECT';
  destination: string;
  origin: string;
  viaRoads: string;
  fleetType: string;
  firstBus: string;
  lastBus: string;
  peakHeadway: string;
  offPeakHeadway: string;
  activeVehicleReg: string;
  vehicleModel: string;
  distanceKm: number;
  adultFare: number;
  concessionFare: number;
  trafficStatus: string;
  speedKmh: number;
  smoothnessPercent: number;
  isBookmarked?: boolean;
  arrivals: [BusArrivalInfo, BusArrivalInfo, BusArrivalInfo];
  routeStops: RouteStopStep[];
}

export interface BusStop {
  id: string;
  code: string;
  name: string;
  road: string;
  subLocation: string;
  bayInfo?: string;
  distanceMeters: number;
  walkMinutes: number;
  isPinned?: boolean;
  mrtTransfer?: {
    hubName: string;
    description: string;
    imageUrl?: string;
    lines: {
      code: string;
      name: string;
      status: 'Normal' | 'Minor Delay' | 'Maintenance';
      colorClass: string;
    }[];
  };
  services: BusService[];
}

export interface ServiceNotice {
  id: string;
  type: 'bus' | 'mrt' | 'road';
  severity: 'normal' | 'info' | 'warning';
  title: string;
  description: string;
  corridor: string;
  source: string;
  timestamp: string;
  affectedServices?: string[];
}

export interface RouteTripStep {
  instruction: string;
  mode: 'walk' | 'bus' | 'mrt';
  serviceNo?: string;
  stopName?: string;
  durationMins: number;
  distanceMeters?: number;
  fareSgd?: number;
}

export interface PlannedTrip {
  id: string;
  from: string;
  to: string;
  totalDurationMins: number;
  transfers: number;
  fareSgd: number;
  steps: RouteTripStep[];
}
