// @ts-check
/**
 * Health Check API Handler
 * Endpoint: /api/health
 * Used for uptime monitoring and verifying LTA DataMall configuration.
 * @param {any} req
 * @param {any} res
 */
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const hasLtaKey = Boolean(process.env.LTA_ACCOUNT_KEY && process.env.LTA_ACCOUNT_KEY.trim().length > 0);
  const rawKey = process.env.LTA_ACCOUNT_KEY || '';
  const maskedKey = hasLtaKey
    ? `${rawKey.substring(0, 3)}...${rawKey.substring(Math.max(0, rawKey.length - 4))}`
    : null;

  /** @type {Record<string, any>} */
  const healthReport = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    apis: {
      busArrival: {
        endpoint: '/api/bus-arrival',
        status: 'operational',
        version: 'v3',
        hasLtaAccountKey: hasLtaKey,
        ltaAccountKeyMasked: maskedKey,
        targetHost: 'datamall2.mytransport.sg'
      },
      health: {
        endpoint: '/api/health',
        status: 'operational'
      }
    },
    system: {
      nodeVersion: process.version,
      platform: process.platform,
      memoryUsageMb: Math.round(process.memoryUsage().heapUsed / 1024 / 1024)
    }
  };

  // Optional live LTA ping check when ?pingLta=true
  if (req.query && req.query.pingLta === 'true' && hasLtaKey) {
    const startTime = Date.now();
    try {
      const pingRes = await fetch(
        'https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival?BusStopCode=83139&ServiceNo=15',
        {
          headers: {
            AccountKey: rawKey.trim(),
            accept: 'application/json'
          }
        }
      );
      const latencyMs = Date.now() - startTime;
      healthReport.ltaConnectivityCheck = {
        pingStatus: pingRes.ok ? 'connected' : 'error',
        statusCode: pingRes.status,
        latencyMs: latencyMs
      };
    } catch (err) {
      healthReport.ltaConnectivityCheck = {
        pingStatus: 'failed',
        error: err instanceof Error ? err.message : String(err)
      };
    }
  }

  return res.status(200).json(healthReport);
}
