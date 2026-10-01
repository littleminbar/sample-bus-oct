import { BusStop, ServiceNotice, PlannedTrip } from '../types/transit';

export const INITIAL_BUS_STOPS: BusStop[] = [
  {
    id: 'stop-76191',
    code: '76191',
    name: 'Opp Tampines Stn / Int',
    road: 'Tampines Central 1',
    subLocation: 'Shelter Canopy Bay 02',
    bayInfo: 'Bay 02',
    distanceMeters: 120,
    walkMinutes: 2,
    isPinned: true,
    mrtTransfer: {
      hubName: 'Tampines Station Transfer Hub',
      description: 'Sheltered transfer available to East-West MRT Line (EW2) and Downtown MRT Line (DT32). Underground linkway accessible via Exit B.',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHueCcx5XRMy7gBGivbYpJ7qWGxZkVCCfOZpm-1-Bjpz4oTHJM0jBUDrw9-nueftSfHKG2OcPwpp2Xjuu9trWYXrPjaJEaneuyi9sDbKAL0OnRx37DIVUFEAHvmHlIaPQznG2KqSD0x6JyJC1TxMH6RbOyKn3HqozFUAi5U4r1QMOfZUOOn59P3KdWCMXUUn8al0FZzoJnoUedHsFGMB_qTXFQgAH55Dnw3xeVwwI_AkZYidIP2_Jf',
      lines: [
        { code: 'EW2', name: 'EW Line: Normal', status: 'Normal', colorClass: 'bg-[#009645]' },
        { code: 'DT32', name: 'DT Line: Normal', status: 'Normal', colorClass: 'bg-[#005EC4]' }
      ]
    },
    services: [
      {
        serviceNo: '65',
        category: 'TRUNK',
        destination: 'HarbourFront Int',
        origin: 'Tampines Int',
        viaRoads: 'via Tampines Ave 4, Bedok Reservoir, MacPherson, Orchard Rd, Lower Delta',
        fleetType: 'Double Decker Fleet',
        firstBus: '05:30',
        lastBus: '23:45',
        peakHeadway: '6 - 9 mins',
        offPeakHeadway: '10 - 13 mins',
        activeVehicleReg: 'SBS 6842G (Volvo B9TL)',
        vehicleModel: 'Volvo B9TL Wright Eclipse Gemini 2',
        distanceKm: 21.4,
        adultFare: 2.17,
        concessionFare: 0.98,
        trafficStatus: 'Tampines Ave 4 Clear (38 km/h)',
        speedKmh: 38,
        smoothnessPercent: 96,
        isBookmarked: true,
        arrivals: [
          {
            order: 1,
            minutesText: 'Arr',
            numericMins: 0,
            secondsRemaining: 42,
            vehicleType: 'Double Decker',
            load: 'SEA',
            wab: true,
            statusLabel: 'ARRIVING'
          },
          {
            order: 2,
            minutesText: '7',
            numericMins: 7,
            secondsRemaining: 420,
            vehicleType: 'Double Decker',
            load: 'SDA',
            wab: true,
            statusLabel: 'On Schedule'
          },
          {
            order: 3,
            minutesText: '18',
            numericMins: 18,
            secondsRemaining: 1080,
            vehicleType: 'Single Deck',
            load: 'LSD',
            wab: false,
            statusLabel: 'Heavy Load'
          }
        ],
        routeStops: [
          { code: '76191', name: 'Opp Tampines Stn', road: 'Tampines Central 1', estMins: 0, isHere: true },
          { code: '76111', name: 'Blk 938', road: 'Tampines Ave 4', estMins: 2 },
          { code: '76101', name: 'SAFRA Tampines', road: 'Tampines Ave 4', estMins: 5 },
          { code: '84011', name: 'Opp Bedok Reform', road: 'Bedok Reservoir Rd', estMins: 9 },
          { code: '71099', name: 'MacPherson Stn Exit C', road: 'Paya Lebar Rd', estMins: 18 },
          { code: '60011', name: 'Boon Keng Stn', road: 'Serangoon Rd', estMins: 25 },
          { code: '09048', name: 'Opp Orchard Stn', road: 'Orchard Blvd', estMins: 38 },
          { code: '14141', name: 'HarbourFront Int', road: 'Telok Blangah Rd', estMins: 52 }
        ]
      },
      {
        serviceNo: '168',
        category: 'TRUNK',
        destination: 'Woodlands Int',
        origin: 'Bedok Int',
        viaRoads: 'via Jalan Kayu, SLE, Woodlands Ave 2',
        fleetType: 'Double Decker Fleet',
        firstBus: '05:45',
        lastBus: '23:30',
        peakHeadway: '7 - 10 mins',
        offPeakHeadway: '12 - 15 mins',
        activeVehicleReg: 'SBS 3288Y (Scania K310UD)',
        vehicleModel: 'Scania K310UD Gemilang',
        distanceKm: 28.6,
        adultFare: 2.37,
        concessionFare: 1.05,
        trafficStatus: 'TPE / SLE Smooth Flow (62 km/h)',
        speedKmh: 62,
        smoothnessPercent: 94,
        arrivals: [
          {
            order: 1,
            minutesText: '2',
            numericMins: 2,
            secondsRemaining: 120,
            vehicleType: 'Double Decker',
            load: 'SEA',
            wab: true,
            statusLabel: 'On Schedule'
          },
          {
            order: 2,
            minutesText: '11',
            numericMins: 11,
            secondsRemaining: 660,
            vehicleType: 'Double Decker',
            load: 'SDA',
            wab: true,
            statusLabel: 'On Schedule'
          },
          {
            order: 3,
            minutesText: '22',
            numericMins: 22,
            secondsRemaining: 1320,
            vehicleType: 'Double Decker',
            load: 'SEA',
            wab: true,
            statusLabel: 'On Schedule'
          }
        ],
        routeStops: [
          { code: '76191', name: 'Opp Tampines Stn', road: 'Tampines Central 1', estMins: 0, isHere: true },
          { code: '76121', name: 'Tampines Concourse', road: 'Tampines Ave 9', estMins: 4 },
          { code: '68019', name: 'Jalan Kayu Flyover', road: 'TPE', estMins: 14 },
          { code: '46009', name: 'Woodlands Temp Int', road: 'Woodlands Sq', estMins: 36 }
        ]
      },
      {
        serviceNo: '15',
        category: 'TRUNK',
        destination: 'Pasir Ris Int',
        origin: 'Marine Parade',
        viaRoads: 'via Tampines Ave 5, Pasir Ris Dr 1',
        fleetType: 'Single Deck Fleet',
        firstBus: '05:50',
        lastBus: '23:55',
        peakHeadway: '8 - 11 mins',
        offPeakHeadway: '12 - 16 mins',
        activeVehicleReg: 'SBS 8812D (Mercedes Citaro)',
        vehicleModel: 'Mercedes-Benz O530 Citaro',
        distanceKm: 14.8,
        adultFare: 1.78,
        concessionFare: 0.85,
        trafficStatus: 'Tampines Ave 5 Light Flow (42 km/h)',
        speedKmh: 42,
        smoothnessPercent: 98,
        arrivals: [
          {
            order: 1,
            minutesText: '3',
            numericMins: 3,
            secondsRemaining: 180,
            vehicleType: 'Single Deck',
            load: 'SEA',
            wab: true,
            statusLabel: 'On Schedule'
          },
          {
            order: 2,
            minutesText: '12',
            numericMins: 12,
            secondsRemaining: 720,
            vehicleType: 'Single Deck',
            load: 'SEA',
            wab: true,
            statusLabel: 'On Schedule'
          },
          {
            order: 3,
            minutesText: '24',
            numericMins: 24,
            secondsRemaining: 1440,
            vehicleType: 'Single Deck',
            load: 'SDA',
            wab: true,
            statusLabel: 'On Schedule'
          }
        ],
        routeStops: [
          { code: '76191', name: 'Opp Tampines Stn', road: 'Tampines Central 1', estMins: 0, isHere: true },
          { code: '76149', name: 'Darul Ghufran Mque', road: 'Tampines Ave 5', estMins: 3 },
          { code: '77019', name: 'Loyang Point', road: 'Pasir Ris Dr 3', estMins: 11 },
          { code: '77009', name: 'Pasir Ris Int', road: 'Pasir Ris Central', estMins: 19 }
        ]
      },
      {
        serviceNo: '21',
        category: 'TRUNK',
        destination: "St. Michael's Ter",
        origin: 'Pasir Ris Int',
        viaRoads: 'via Bedok, Geylang, Balestier Rd, Whampoa',
        fleetType: 'Double Decker Fleet',
        firstBus: '05:35',
        lastBus: '23:40',
        peakHeadway: '6 - 9 mins',
        offPeakHeadway: '10 - 14 mins',
        activeVehicleReg: 'SBS 7511M (Volvo B9TL)',
        vehicleModel: 'Volvo B9TL CDGE',
        distanceKm: 19.8,
        adultFare: 2.05,
        concessionFare: 0.94,
        trafficStatus: 'Bedok Reservoir Corridor Moderate (32 km/h)',
        speedKmh: 32,
        smoothnessPercent: 91,
        arrivals: [
          {
            order: 1,
            minutesText: 'Arr',
            numericMins: 0,
            secondsRemaining: 25,
            vehicleType: 'Double Decker',
            load: 'SDA',
            wab: true,
            statusLabel: 'ARRIVING'
          },
          {
            order: 2,
            minutesText: '9',
            numericMins: 9,
            secondsRemaining: 540,
            vehicleType: 'Double Decker',
            load: 'SEA',
            wab: true,
            statusLabel: 'On Schedule'
          },
          {
            order: 3,
            minutesText: '19',
            numericMins: 19,
            secondsRemaining: 1140,
            vehicleType: 'Double Decker',
            load: 'SEA',
            wab: true,
            statusLabel: 'On Schedule'
          }
        ],
        routeStops: [
          { code: '76191', name: 'Opp Tampines Stn', road: 'Tampines Central 1', estMins: 0, isHere: true },
          { code: '76101', name: 'SAFRA Tampines', road: 'Tampines Ave 4', estMins: 4 },
          { code: '84011', name: 'Opp Bedok Reform', road: 'Bedok Reservoir Rd', estMins: 8 },
          { code: '52499', name: "St. Michael's Ter", road: 'Whampoa Rd', estMins: 42 }
        ]
      },
      {
        serviceNo: '27',
        category: 'TRUNK',
        destination: 'Changi Airport PTB 1/2/3',
        origin: 'Hougang Central Int',
        viaRoads: 'via Tampines Ave 7, TPE, Airport Blvd',
        fleetType: 'Single Deck Loop',
        firstBus: '05:30',
        lastBus: '00:00',
        peakHeadway: '5 - 8 mins',
        offPeakHeadway: '8 - 12 mins',
        activeVehicleReg: 'SBS 6199U (Mercedes Citaro)',
        vehicleModel: 'Mercedes-Benz O530 Citaro Airport Spec',
        distanceKm: 18.2,
        adultFare: 1.98,
        concessionFare: 0.90,
        trafficStatus: 'TPE to Airport Clear (70 km/h)',
        speedKmh: 70,
        smoothnessPercent: 97,
        arrivals: [
          {
            order: 1,
            minutesText: '5',
            numericMins: 5,
            secondsRemaining: 300,
            vehicleType: 'Single Deck Loop',
            load: 'SEA',
            wab: true,
            statusLabel: 'On Schedule'
          },
          {
            order: 2,
            minutesText: '14',
            numericMins: 14,
            secondsRemaining: 840,
            vehicleType: 'Single Deck Loop',
            load: 'SEA',
            wab: true,
            statusLabel: 'On Schedule'
          },
          {
            order: 3,
            minutesText: '23',
            numericMins: 23,
            secondsRemaining: 1380,
            vehicleType: 'Single Deck Loop',
            load: 'SDA',
            wab: true,
            statusLabel: 'On Schedule'
          }
        ],
        routeStops: [
          { code: '76191', name: 'Opp Tampines Stn', road: 'Tampines Central 1', estMins: 0, isHere: true },
          { code: '76201', name: 'Tampines Stadium', road: 'Tampines Ave 4', estMins: 3 },
          { code: '95029', name: 'Airport Cargo Bldg', road: 'Airport Cargo Rd', estMins: 14 },
          { code: '95129', name: 'Changi Airport PTB 2', road: 'PTB2 Basement', estMins: 24 }
        ]
      },
      {
        serviceNo: '14',
        category: 'TRUNK',
        destination: 'Clementi Int',
        origin: 'Bedok Int',
        viaRoads: 'via Mountbatten, Orchard Rd, Dover',
        fleetType: 'Double Decker Fleet',
        firstBus: '05:40',
        lastBus: '23:45',
        peakHeadway: '7 - 10 mins',
        offPeakHeadway: '11 - 14 mins',
        activeVehicleReg: 'SBS 3698K (MAN A95)',
        vehicleModel: 'MAN ND323F (A95)',
        distanceKm: 26.1,
        adultFare: 2.29,
        concessionFare: 1.02,
        trafficStatus: 'Orchard Boulevard Busy (26 km/h)',
        speedKmh: 26,
        smoothnessPercent: 88,
        arrivals: [
          {
            order: 1,
            minutesText: '4',
            numericMins: 4,
            secondsRemaining: 240,
            vehicleType: 'Double Decker',
            load: 'SEA',
            wab: true,
            statusLabel: 'On Schedule'
          },
          {
            order: 2,
            minutesText: '16',
            numericMins: 16,
            secondsRemaining: 960,
            vehicleType: 'Double Decker',
            load: 'SDA',
            wab: true,
            statusLabel: 'On Schedule'
          },
          {
            order: 3,
            minutesText: '26',
            numericMins: 26,
            secondsRemaining: 1560,
            vehicleType: 'Double Decker',
            load: 'SEA',
            wab: true,
            statusLabel: 'On Schedule'
          }
        ],
        routeStops: [
          { code: '76191', name: 'Opp Tampines Stn', road: 'Tampines Central 1', estMins: 0, isHere: true },
          { code: '84009', name: 'Bedok Int', road: 'Bedok North Ave 1', estMins: 10 },
          { code: '09048', name: 'Opp Orchard Stn', road: 'Orchard Blvd', estMins: 36 },
          { code: '17009', name: 'Clementi Int', road: 'Clementi Ave 3', estMins: 64 }
        ]
      },
      {
        serviceNo: '518',
        category: 'EXPRESS',
        destination: 'Bayfront Ave (Express)',
        origin: 'Pasir Ris Int',
        viaRoads: 'via Tampines, PIE Express, Orchard, Suntec City, Bayfront',
        fleetType: 'Single Deck Express',
        firstBus: '06:00',
        lastBus: '23:30',
        peakHeadway: '10 - 15 mins',
        offPeakHeadway: '15 - 20 mins',
        activeVehicleReg: 'SBS 6780C (Mercedes Citaro)',
        vehicleModel: 'Mercedes-Benz O530 Citaro Euro VI',
        distanceKm: 23.5,
        adultFare: 2.85,
        concessionFare: 1.45,
        trafficStatus: 'PIE Expressway Swift (75 km/h)',
        speedKmh: 75,
        smoothnessPercent: 98,
        arrivals: [
          {
            order: 1,
            minutesText: '6',
            numericMins: 6,
            secondsRemaining: 360,
            vehicleType: 'Single Deck',
            load: 'SDA',
            wab: true,
            statusLabel: 'On Schedule'
          },
          {
            order: 2,
            minutesText: '20',
            numericMins: 20,
            secondsRemaining: 1200,
            vehicleType: 'Single Deck',
            load: 'SEA',
            wab: true,
            statusLabel: 'On Schedule'
          },
          {
            order: 3,
            minutesText: '35',
            numericMins: 35,
            secondsRemaining: 2100,
            vehicleType: 'Single Deck',
            load: 'SEA',
            wab: true,
            statusLabel: 'On Schedule'
          }
        ],
        routeStops: [
          { code: '76191', name: 'Opp Tampines Stn', road: 'Tampines Central 1', estMins: 0, isHere: true },
          { code: '76111', name: 'Blk 938', road: 'Tampines Ave 4', estMins: 2 },
          { code: '02049', name: 'Suntec City', road: 'Temasek Blvd', estMins: 26 },
          { code: '03509', name: 'Bayfront Stn Exit B', road: 'Bayfront Ave', estMins: 32 }
        ]
      }
    ]
  },
  {
    id: 'stop-76111',
    code: '76111',
    name: 'Blk 938',
    road: 'Tampines Ave 4',
    subLocation: 'Opposite Tampines West Community Club',
    bayInfo: 'Bay 01',
    distanceMeters: 250,
    walkMinutes: 3,
    services: [
      {
        serviceNo: '65',
        category: 'TRUNK',
        destination: 'HarbourFront Int',
        origin: 'Tampines Int',
        viaRoads: 'via Tampines Ave 4, Bedok Reservoir, MacPherson, Orchard Rd',
        fleetType: 'Double Decker Fleet',
        firstBus: '05:32',
        lastBus: '23:47',
        peakHeadway: '6 - 9 mins',
        offPeakHeadway: '10 - 13 mins',
        activeVehicleReg: 'SBS 6842G (Volvo B9TL)',
        vehicleModel: 'Volvo B9TL',
        distanceKm: 21.0,
        adultFare: 2.17,
        concessionFare: 0.98,
        trafficStatus: 'Tampines Ave 4 Flow (40 km/h)',
        speedKmh: 40,
        smoothnessPercent: 95,
        arrivals: [
          { order: 1, minutesText: '2', numericMins: 2, vehicleType: 'Double Decker', load: 'SEA', wab: true },
          { order: 2, minutesText: '9', numericMins: 9, vehicleType: 'Double Decker', load: 'SDA', wab: true },
          { order: 3, minutesText: '20', numericMins: 20, vehicleType: 'Single Deck', load: 'LSD', wab: false }
        ],
        routeStops: [
          { code: '76111', name: 'Blk 938', road: 'Tampines Ave 4', estMins: 0, isHere: true },
          { code: '76101', name: 'SAFRA Tampines', road: 'Tampines Ave 4', estMins: 3 },
          { code: '84011', name: 'Opp Bedok Reform', road: 'Bedok Reservoir Rd', estMins: 7 }
        ]
      },
      {
        serviceNo: '518',
        category: 'EXPRESS',
        destination: 'Bayfront Ave (Express)',
        origin: 'Pasir Ris Int',
        viaRoads: 'via PIE Express, Orchard',
        fleetType: 'Single Deck Express',
        firstBus: '06:02',
        lastBus: '23:32',
        peakHeadway: '10 - 15 mins',
        offPeakHeadway: '15 - 20 mins',
        activeVehicleReg: 'SBS 6780C (Mercedes Citaro)',
        vehicleModel: 'Mercedes-Benz O530 Citaro',
        distanceKm: 23.0,
        adultFare: 2.85,
        concessionFare: 1.45,
        trafficStatus: 'Expressway Clean Flow',
        speedKmh: 75,
        smoothnessPercent: 98,
        arrivals: [
          { order: 1, minutesText: '8', numericMins: 8, vehicleType: 'Single Deck', load: 'SDA', wab: true },
          { order: 2, minutesText: '22', numericMins: 22, vehicleType: 'Single Deck', load: 'SEA', wab: true },
          { order: 3, minutesText: '37', numericMins: 37, vehicleType: 'Single Deck', load: 'SEA', wab: true }
        ],
        routeStops: []
      }
    ]
  },
  {
    id: 'stop-84009',
    code: '84009',
    name: 'Bedok Bus Interchange',
    road: 'Bedok North Ave 1',
    subLocation: 'Integrated Transport Hub',
    bayInfo: 'Berth 04',
    distanceMeters: 3800,
    walkMinutes: 45,
    mrtTransfer: {
      hubName: 'Bedok Integrated Transport Hub',
      description: 'Fully air-conditioned bus interchange connected to Bedok MRT Station (EW5) and Bedok Mall.',
      lines: [
        { code: 'EW5', name: 'EW Line: Normal', status: 'Normal', colorClass: 'bg-[#009645]' }
      ]
    },
    services: [
      {
        serviceNo: '168',
        category: 'TRUNK',
        destination: 'Woodlands Int',
        origin: 'Bedok Int',
        viaRoads: 'via Tampines, Jalan Kayu, SLE',
        fleetType: 'Double Decker Fleet',
        firstBus: '05:40',
        lastBus: '23:30',
        peakHeadway: '7 - 10 mins',
        offPeakHeadway: '12 - 15 mins',
        activeVehicleReg: 'SBS 3288Y (Scania K310UD)',
        vehicleModel: 'Scania K310UD',
        distanceKm: 28.6,
        adultFare: 2.37,
        concessionFare: 1.05,
        trafficStatus: 'Bedok North Ave Clear',
        speedKmh: 45,
        smoothnessPercent: 96,
        arrivals: [
          { order: 1, minutesText: 'Arr', numericMins: 0, vehicleType: 'Double Decker', load: 'SEA', wab: true },
          { order: 2, minutesText: '8', numericMins: 8, vehicleType: 'Double Decker', load: 'SEA', wab: true },
          { order: 3, minutesText: '18', numericMins: 18, vehicleType: 'Double Decker', load: 'SDA', wab: true }
        ],
        routeStops: []
      },
      {
        serviceNo: '14',
        category: 'TRUNK',
        destination: 'Clementi Int',
        origin: 'Bedok Int',
        viaRoads: 'via Mountbatten, Orchard Rd, Dover',
        fleetType: 'Double Decker Fleet',
        firstBus: '05:40',
        lastBus: '23:45',
        peakHeadway: '7 - 10 mins',
        offPeakHeadway: '11 - 14 mins',
        activeVehicleReg: 'SBS 3698K (MAN A95)',
        vehicleModel: 'MAN ND323F (A95)',
        distanceKm: 26.1,
        adultFare: 2.29,
        concessionFare: 1.02,
        trafficStatus: 'Clear',
        speedKmh: 40,
        smoothnessPercent: 93,
        arrivals: [
          { order: 1, minutesText: 'Arr', numericMins: 0, vehicleType: 'Double Decker', load: 'SEA', wab: true },
          { order: 2, minutesText: '9', numericMins: 9, vehicleType: 'Double Decker', load: 'SEA', wab: true },
          { order: 3, minutesText: '21', numericMins: 21, vehicleType: 'Double Decker', load: 'SDA', wab: true }
        ],
        routeStops: []
      }
    ]
  },
  {
    id: 'stop-09048',
    code: '09048',
    name: 'Opp Orchard Stn/ION',
    road: 'Orchard Blvd',
    subLocation: 'Outside Wheelock Place / ION Linkway',
    bayInfo: 'Bay 01',
    distanceMeters: 14200,
    walkMinutes: 160,
    mrtTransfer: {
      hubName: 'Orchard MRT Station Transfer',
      description: 'Connection to North-South Line (NS22) and Thomson-East Coast Line (TE14).',
      lines: [
        { code: 'NS22', name: 'NS Line: Normal', status: 'Normal', colorClass: 'bg-[#D42E12]' },
        { code: 'TE14', name: 'TE Line: Normal', status: 'Normal', colorClass: 'bg-[#9D5B25]' }
      ]
    },
    services: [
      {
        serviceNo: '65',
        category: 'TRUNK',
        destination: 'HarbourFront Int',
        origin: 'Tampines Int',
        viaRoads: 'via Paterson Rd, Kim Seng Rd, Lower Delta',
        fleetType: 'Double Decker Fleet',
        firstBus: '06:15',
        lastBus: '00:30',
        peakHeadway: '6 - 9 mins',
        offPeakHeadway: '10 - 13 mins',
        activeVehicleReg: 'SBS 6842G (Volvo B9TL)',
        vehicleModel: 'Volvo B9TL',
        distanceKm: 6.2,
        adultFare: 1.45,
        concessionFare: 0.65,
        trafficStatus: 'Orchard Blvd Dense Traffic (22 km/h)',
        speedKmh: 22,
        smoothnessPercent: 82,
        arrivals: [
          { order: 1, minutesText: '4', numericMins: 4, vehicleType: 'Double Decker', load: 'SDA', wab: true },
          { order: 2, minutesText: '11', numericMins: 11, vehicleType: 'Double Decker', load: 'SEA', wab: true },
          { order: 3, minutesText: '22', numericMins: 22, vehicleType: 'Single Deck', load: 'SEA', wab: true }
        ],
        routeStops: []
      }
    ]
  },
  {
    id: 'stop-83139',
    code: '83139',
    name: 'Opp Bedok South Ave 1',
    road: 'Bedok South Rd',
    subLocation: 'Opp Temasek JC / Blk 172',
    bayInfo: 'Bay 01',
    distanceMeters: 4200,
    walkMinutes: 50,
    services: [
      {
        serviceNo: '15',
        category: 'TRUNK',
        destination: 'Pasir Ris Int',
        origin: 'Marine Parade',
        viaRoads: 'via Tampines Ave 5, Pasir Ris Dr 1',
        fleetType: 'Single Deck Fleet',
        firstBus: '05:55',
        lastBus: '23:55',
        peakHeadway: '8 - 11 mins',
        offPeakHeadway: '12 - 16 mins',
        activeVehicleReg: 'SBS 8812D (Mercedes Citaro)',
        vehicleModel: 'Mercedes-Benz O530 Citaro',
        distanceKm: 14.8,
        adultFare: 1.78,
        concessionFare: 0.85,
        trafficStatus: 'Bedok South Flow (45 km/h)',
        speedKmh: 45,
        smoothnessPercent: 95,
        arrivals: [
          { order: 1, minutesText: 'Arr', numericMins: 0, vehicleType: 'Single Deck', load: 'SEA', wab: true, statusLabel: 'ARRIVING' },
          { order: 2, minutesText: '6', numericMins: 6, vehicleType: 'Single Deck', load: 'SEA', wab: true, statusLabel: 'On Schedule' },
          { order: 3, minutesText: '15', numericMins: 15, vehicleType: 'Single Deck', load: 'LSD', wab: false, statusLabel: 'Heavy Load' }
        ],
        routeStops: [
          { code: '83139', name: 'Opp Bedok South Ave 1', road: 'Bedok South Rd', estMins: 0, isHere: true },
          { code: '84009', name: 'Bedok Int', road: 'Bedok North Ave 1', estMins: 6 },
          { code: '76191', name: 'Opp Tampines Stn', road: 'Tampines Central 1', estMins: 14 },
          { code: '77009', name: 'Pasir Ris Int', road: 'Pasir Ris Central', estMins: 26 }
        ]
      },
      {
        serviceNo: '176',
        category: 'TRUNK',
        destination: 'Bukit Panjang Int',
        origin: 'Bukit Merah Int',
        viaRoads: 'via Telok Blangah, Pasir Panjang, West Coast, Jurong East, Bukit Batok',
        fleetType: 'Double Decker Fleet',
        firstBus: '05:30',
        lastBus: '23:45',
        peakHeadway: '7 - 10 mins',
        offPeakHeadway: '11 - 15 mins',
        activeVehicleReg: 'SMB 3501L (MAN A95)',
        vehicleModel: 'MAN ND323F Double Decker',
        distanceKm: 27.5,
        adultFare: 2.37,
        concessionFare: 1.05,
        trafficStatus: 'West Coast Corridor Normal (40 km/h)',
        speedKmh: 40,
        smoothnessPercent: 94,
        arrivals: [
          { order: 1, minutesText: 'Arr', numericMins: 0, vehicleType: 'Double Decker', load: 'SEA', wab: true, statusLabel: 'ARRIVING' },
          { order: 2, minutesText: '15', numericMins: 15, vehicleType: 'Double Decker', load: 'SEA', wab: true, statusLabel: 'On Schedule' },
          { order: 3, minutesText: '28', numericMins: 28, vehicleType: 'Double Decker', load: 'LSD', wab: true, statusLabel: 'Heavy Load' }
        ],
        routeStops: [
          { code: '10009', name: 'Bukit Merah Int', road: 'Bt Merah Central', estMins: 0 },
          { code: '14141', name: 'HarbourFront Stn', road: 'Telok Blangah Rd', estMins: 12 },
          { code: '83139', name: 'Opp Bedok South Ave 1', road: 'Bedok South Rd', estMins: 28, isHere: true },
          { code: '44009', name: 'Bukit Panjang Int', road: 'Jelebu Rd', estMins: 55 }
        ]
      }
    ]
  },
  {
    id: 'stop-14141',
    code: '14141',
    name: 'Opp HarbourFront Stn',
    road: 'Telok Blangah Rd',
    subLocation: 'Outside HarbourFront Tower 1 / VivoCity',
    bayInfo: 'Bay 02',
    distanceMeters: 18500,
    walkMinutes: 210,
    mrtTransfer: {
      hubName: 'HarbourFront Station Interchange',
      description: 'Terminus for North East Line (NE1) and Circle Line (CC29) with Sentosa Express link.',
      lines: [
        { code: 'NE1', name: 'NE Line: Normal', status: 'Normal', colorClass: 'bg-[#9013FE]' },
        { code: 'CC29', name: 'CC Line: Normal', status: 'Normal', colorClass: 'bg-[#FF9900]' }
      ]
    },
    services: [
      {
        serviceNo: '65',
        category: 'TRUNK',
        destination: 'Tampines Int',
        origin: 'HarbourFront Int',
        viaRoads: 'via Lower Delta, Orchard Rd, MacPherson, Bedok Reservoir, Tampines',
        fleetType: 'Double Decker Fleet',
        firstBus: '05:45',
        lastBus: '00:00',
        peakHeadway: '6 - 9 mins',
        offPeakHeadway: '10 - 13 mins',
        activeVehicleReg: 'SBS 6842G (Volvo B9TL)',
        vehicleModel: 'Volvo B9TL',
        distanceKm: 21.4,
        adultFare: 2.17,
        concessionFare: 0.98,
        trafficStatus: 'Telok Blangah Clear (42 km/h)',
        speedKmh: 42,
        smoothnessPercent: 96,
        arrivals: [
          { order: 1, minutesText: 'Arr', numericMins: 0, vehicleType: 'Double Decker', load: 'SEA', wab: true, statusLabel: 'ARRIVING' },
          { order: 2, minutesText: '8', numericMins: 8, vehicleType: 'Double Decker', load: 'SDA', wab: true, statusLabel: 'On Schedule' },
          { order: 3, minutesText: '19', numericMins: 19, vehicleType: 'Double Decker', load: 'SEA', wab: true, statusLabel: 'On Schedule' }
        ],
        routeStops: []
      }
    ]
  },
  {
    id: 'stop-46009',
    code: '46009',
    name: 'Woodlands Temp Int',
    road: 'Woodlands Sq',
    subLocation: 'Connected to Causeway Point / Woodlands MRT',
    bayInfo: 'Berth 08',
    distanceMeters: 26000,
    walkMinutes: 290,
    mrtTransfer: {
      hubName: 'Woodlands Integrated Transport Hub',
      description: 'North-South Line (NS9) and Thomson-East Coast Line (TE2).',
      lines: [
        { code: 'NS9', name: 'NS Line: Normal', status: 'Normal', colorClass: 'bg-[#D42E12]' },
        { code: 'TE2', name: 'TE Line: Normal', status: 'Normal', colorClass: 'bg-[#9D5B25]' }
      ]
    },
    services: [
      {
        serviceNo: '168',
        category: 'TRUNK',
        destination: 'Bedok Int',
        origin: 'Woodlands Int',
        viaRoads: 'via SLE, Jalan Kayu, Tampines Ave 4',
        fleetType: 'Double Decker Fleet',
        firstBus: '05:30',
        lastBus: '23:30',
        peakHeadway: '7 - 10 mins',
        offPeakHeadway: '12 - 15 mins',
        activeVehicleReg: 'SBS 3288Y (Scania K310UD)',
        vehicleModel: 'Scania K310UD',
        distanceKm: 28.6,
        adultFare: 2.37,
        concessionFare: 1.05,
        trafficStatus: 'SLE Smooth (70 km/h)',
        speedKmh: 70,
        smoothnessPercent: 97,
        arrivals: [
          { order: 1, minutesText: 'Arr', numericMins: 0, vehicleType: 'Double Decker', load: 'SEA', wab: true, statusLabel: 'ARRIVING' },
          { order: 2, minutesText: '10', numericMins: 10, vehicleType: 'Double Decker', load: 'SEA', wab: true, statusLabel: 'On Schedule' },
          { order: 3, minutesText: '24', numericMins: 24, vehicleType: 'Double Decker', load: 'SDA', wab: true, statusLabel: 'On Schedule' }
        ],
        routeStops: []
      }
    ]
  }
];

export const SERVICE_NOTICES: ServiceNotice[] = [
  {
    id: 'notice-1',
    type: 'bus',
    severity: 'normal',
    title: 'Tampines Corridor Operating Normal',
    description: 'Normal service along Tampines Ave 4 & Tampines Ave 5. No route diversions, road works, or operational delays currently reported by OCC.',
    corridor: 'Tampines East & Central',
    source: 'SBS Control Centre',
    timestamp: '07:42 SGT',
    affectedServices: ['65', '168', '15', '21', '27']
  },
  {
    id: 'notice-2',
    type: 'mrt',
    severity: 'normal',
    title: 'East-West & Downtown Lines Smooth Commute',
    description: 'All signaling and headway timings operating at optimal 2-3 minute intervals across all peak sectors.',
    corridor: 'Islandwide MRT Network',
    source: 'LTA Rail Operations',
    timestamp: '07:40 SGT'
  },
  {
    id: 'notice-3',
    type: 'road',
    severity: 'info',
    title: 'PIE (Changi towards Tuas) After Tampines Ave 5',
    description: 'Lane 4 scheduled maintenance completed at 05:00. All lanes fully reopened with no traffic restriction.',
    corridor: 'PIE Expressway',
    source: 'LTA EMAS Traffic Feed',
    timestamp: '07:15 SGT'
  }
];

export const PLANNED_COMMUTE_TRIPS: PlannedTrip[] = [
  {
    id: 'trip-1',
    from: 'Opp Tampines Stn / Int (76191)',
    to: 'HarbourFront Int / VivoCity',
    totalDurationMins: 52,
    transfers: 0,
    fareSgd: 2.17,
    steps: [
      {
        instruction: 'Board Bus 65 (Double Decker) at Opp Tampines Stn / Int (Bay 02)',
        mode: 'bus',
        serviceNo: '65',
        stopName: 'Opp Tampines Stn / Int',
        durationMins: 48,
        distanceMeters: 21400,
        fareSgd: 2.17
      },
      {
        instruction: 'Alight at HarbourFront Int and walk through shelter to VivoCity / HarbourFront Centre',
        mode: 'walk',
        durationMins: 4,
        distanceMeters: 250
      }
    ]
  },
  {
    id: 'trip-2',
    from: 'Opp Tampines Stn / Int (76191)',
    to: 'Changi Airport Terminal 2',
    totalDurationMins: 26,
    transfers: 0,
    fareSgd: 1.98,
    steps: [
      {
        instruction: 'Board Bus 27 (Single Deck Airport Spec) at Opp Tampines Stn (Bay 02)',
        mode: 'bus',
        serviceNo: '27',
        stopName: 'Opp Tampines Stn',
        durationMins: 24,
        distanceMeters: 18200,
        fareSgd: 1.98
      },
      {
        instruction: 'Alight at Changi Airport PTB 2 Basement Bus Bay',
        mode: 'walk',
        durationMins: 2,
        distanceMeters: 120
      }
    ]
  },
  {
    id: 'trip-3',
    from: 'Opp Tampines Stn / Int (76191)',
    to: 'Woodlands Temp Interchange',
    totalDurationMins: 38,
    transfers: 0,
    fareSgd: 2.37,
    steps: [
      {
        instruction: 'Board Bus 168 (Double Decker) towards Woodlands Int via TPE/SLE',
        mode: 'bus',
        serviceNo: '168',
        stopName: 'Opp Tampines Stn',
        durationMins: 36,
        distanceMeters: 28600,
        fareSgd: 2.37
      },
      {
        instruction: 'Alight at Woodlands Temp Int connected directly to Causeway Point',
        mode: 'walk',
        durationMins: 2,
        distanceMeters: 100
      }
    ]
  }
];

export const SBS_LOGO_URL = 'https://lh3.googleusercontent.com/aida/AEtjO1VY2vOem_s6-7ZBNjMacSgQ7SSX12WZKTCwYzuqWFxqhwYayOm2TPf-m9hlouqeNRWIbDyFoYExB5c6fXttKvuAk-Ja9UrSTqZSJ1H1_v-zgYag56wh4hg2rMTT0Be45np9ITZV_BhLdn5FD6hz3VA99wwFQFVEfta3A_jP8lKq8Gkw8pZiYGWdXaG17h6g-7s8hG3jmqwKUqmFmPTazZYRQctUb8C1gFM3LC0E4HeuJAaDKadey8egtZ4';

export const TAMPINES_HUB_IMG_URL = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHueCcx5XRMy7gBGivbYpJ7qWGxZkVCCfOZpm-1-Bjpz4oTHJM0jBUDrw9-nueftSfHKG2OcPwpp2Xjuu9trWYXrPjaJEaneuyi9sDbKAL0OnRx37DIVUFEAHvmHlIaPQznG2KqSD0x6JyJC1TxMH6RbOyKn3HqozFUAi5U4r1QMOfZUOOn59P3KdWCMXUUn8al0FZzoJnoUedHsFGMB_qTXFQgAH55Dnw3xeVwwI_AkZYidIP2_Jf';
