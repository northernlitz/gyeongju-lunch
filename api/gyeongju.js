export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { endpoint, serviceKey } = req.query;

  if (!endpoint || !serviceKey) {
    return res.status(400).json({ error: "Endpoint and ServiceKey are required." });
  }

  let cleanKey = serviceKey.trim();
  try { cleanKey = decodeURIComponent(cleanKey); } catch(e){}

  const fullUrl = `${endpoint.trim()}?serviceKey=${encodeURIComponent(cleanKey)}&pageNo=1&numOfRows=100&_type=json`;

  try {
    const apiRes = await fetch(fullUrl);
    const data = await apiRes.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Gyeongju API Fetch Failed", details: error.message });
  }
}
