// @ts-check
/**
 * LTA DataMall v3 Bus Arrival API Handler
 * Endpoint: /api/bus-arrival
 * Supports query params:
 *   - BusStopCode: 5-digit bus stop code (e.g. "83139", "76191")
 *   - ServiceNo: Optional bus service number (e.g. "15", "65", "176")
 *
 * Header used for LTA DataMall: AccountKey: <process.env.LTA_ACCOUNT_KEY>
 */

const LTA_BASE_URL = 'https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival';

/**
 * Maps LTA single-character vehicle types to descriptive labels
 * @param {string} [type]
 */
function mapVehicleType(type) {
  switch (type) {
    case 'DD':
      return 'Double Decker';
    case 'BD':
      return 'Bendy';
    case 'SD':
    default:
      return 'Single Deck';
  }
}

/**
 * Maps LTA Load code to human-readable text
 * @param {string} [load]
 */
function mapLoad(load) {
  switch (load) {
    case 'LSD':
      return { code: 'LSD', label: 'Limited Standing', level: 3 };
    case 'SDA':
      return { code: 'SDA', label: 'Standing Available', level: 2 };
    case 'SEA':
    default:
      return { code: 'SEA', label: 'Seats Available', level: 1 };
  }
}

/**
 * Calculates minutes difference between an ISO timestamp and now
 * @param {string} [arrivalIso]
 */
function calculateMinutes(arrivalIso) {
  if (!arrivalIso) return { minutes: null, formatted: 'No Est' };
  const arrivalTime = new Date(arrivalIso).getTime();
  const now = Date.now();
  const diffSec = Math.round((arrivalTime - now) / 1000);
  const diffMin = Math.round(diffSec / 60);

  if (diffSec <= 45) {
    return { minutes: 0, secondsRemaining: Math.max(0, diffSec), formatted: 'Arr' };
  }
  return { minutes: Math.max(1, diffMin), secondsRemaining: diffSec, formatted: `${Math.max(1, diffMin)} min` };
}

/**
 * Enriches an LTA Bus object with calculated fields
 * @param {any} bus
 */
function enrichBusInfo(bus) {
  if (!bus || !bus.EstimatedArrival) return null;
  const timeInfo = calculateMinutes(bus.EstimatedArrival);
  return {
    ...bus,
    VehicleTypeLabel: mapVehicleType(bus.Type),
    LoadInfo: mapLoad(bus.Load),
    IsWab: bus.Feature === 'WAB',
    MinutesUntilArrival: timeInfo.minutes,
    SecondsRemaining: timeInfo.secondsRemaining,
    FormattedArrival: timeInfo.formatted
  };
}

/**
 * Generates high-fidelity simulated arrival data for fallback when LTA_ACCOUNT_KEY is not yet configured
 * @param {string} busStopCode
 * @param {string} [serviceNo]
 */
function generateFallbackData(busStopCode, serviceNo) {
  const allServices = ['65', '168', '15', '21', '27', '14', '518', '176'];
  const targetServices = serviceNo ? [serviceNo] : allServices.slice(0, 5);
  const now = Date.now();

  const services = targetServices.map((svc, idx) => {
    const mins1 = idx === 0 ? 0 : Math.floor(Math.random() * 3) + 1;
    const mins2 = mins1 + Math.floor(Math.random() * 6) + 5;
    const mins3 = mins2 + Math.floor(Math.random() * 8) + 8;

    const arrival1 = new Date(now + (mins1 === 0 ? 30 : mins1 * 60) * 1000).toISOString();
    const arrival2 = new Date(now + mins2 * 60 * 1000).toISOString();
    const arrival3 = new Date(now + mins3 * 60 * 1000).toISOString();

    const isDouble = ['65', '168', '21', '14'].includes(svc);

    const bus1 = {
      OriginCode: '76009',
      DestinationCode: '14009',
      EstimatedArrival: arrival1,
      Monitored: 1,
      Latitude: '1.3532',
      Longitude: '103.9452',
      VisitNumber: '1',
      Load: idx === 0 ? 'SEA' : 'SDA',
      Feature: 'WAB',
      Type: isDouble ? 'DD' : 'SD'
    };

    const bus2 = {
      OriginCode: '76009',
      DestinationCode: '14009',
      EstimatedArrival: arrival2,
      Monitored: 1,
      Latitude: '1.3480',
      Longitude: '103.9310',
      VisitNumber: '1',
      Load: 'SEA',
      Feature: 'WAB',
      Type: isDouble ? 'DD' : 'SD'
    };

    const bus3 = {
      OriginCode: '76009',
      DestinationCode: '14009',
      EstimatedArrival: arrival3,
      Monitored: 1,
      Latitude: '1.3320',
      Longitude: '103.9100',
      VisitNumber: '1',
      Load: 'LSD',
      Feature: '',
      Type: 'SD'
    };

    return {
      ServiceNo: svc,
      Operator: ['176', '168'].includes(svc) ? 'SMRT' : 'SBST',
      NextBus: enrichBusInfo(bus1),
      NextBus2: enrichBusInfo(bus2),
      NextBus3: enrichBusInfo(bus3)
    };
  });

  return {
    'odata.metadata': 'https://datamall2.mytransport.sg/ltaodataservice/$metadata#BusArrivalv3/@Element',
    BusStopCode: busStopCode,
    Services: services
  };
}

/**
 * Universal Serverless / Express handler
 * @param {any} req
 * @param {any} res
 */
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, AccountKey');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const query = req.query || {};
  const busStopCode = (query.BusStopCode || query.busStopCode || '76191').toString().trim();
  const serviceNo = query.ServiceNo || query.serviceNo ? query.ServiceNo || query.serviceNo : undefined;

  const ltaKey = process.env.LTA_ACCOUNT_KEY;

  // If LTA_ACCOUNT_KEY is configured in the environment, make the real call to LTA DataMall v3
  if (ltaKey && ltaKey.trim().length > 0) {
    try {
      const url = new URL(LTA_BASE_URL);
      url.searchParams.set('BusStopCode', busStopCode);
      if (serviceNo) {
        url.searchParams.set('ServiceNo', serviceNo.toString().trim());
      }

      const ltaResponse = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          AccountKey: ltaKey.trim(),
          accept: 'application/json'
        }
      });

      if (!ltaResponse.ok) {
        console.warn(`LTA DataMall responded with HTTP ${ltaResponse.status}: ${ltaResponse.statusText}`);
        const fallback = generateFallbackData(busStopCode, serviceNo);
        return res.status(200).json({
          source: 'simulated_fallback',
          warning: `LTA DataMall returned HTTP ${ltaResponse.status}`,
          hasAccountKeyConfigured: true,
          ...fallback
        });
      }

      const rawData = await ltaResponse.json();

      // Enrich raw LTA data with parsed minutes and display labels
      const enrichedServices = (rawData.Services || []).map(
        /** @param {any} service */
        (service) => ({
          ...service,
          NextBus: enrichBusInfo(service.NextBus),
          NextBus2: enrichBusInfo(service.NextBus2),
          NextBus3: enrichBusInfo(service.NextBus3)
        })
      );

      return res.status(200).json({
        source: 'lta_datamall',
        odataMetadata: rawData['odata.metadata'],
        BusStopCode: rawData.BusStopCode || busStopCode,
        Services: enrichedServices,
        timestamp: new Date().toISOString()
      });
    } catch (err) {
      console.error('Error contacting LTA DataMall v3:', err);
      const fallback = generateFallbackData(busStopCode, serviceNo);
      return res.status(200).json({
        source: 'simulated_fallback',
        error: err instanceof Error ? err.message : String(err),
        hasAccountKeyConfigured: true,
        ...fallback
      });
    }
  }

  // Fallback when LTA_ACCOUNT_KEY is not yet populated
  const fallbackData = generateFallbackData(busStopCode, serviceNo);
  return res.status(200).json({
    source: 'simulated_fallback',
    message: 'LTA_ACCOUNT_KEY is not configured in environment variables. Providing simulated LTA DataMall v3 response.',
    hasAccountKeyConfigured: false,
    ...fallbackData,
    timestamp: new Date().toISOString()
  });
}
