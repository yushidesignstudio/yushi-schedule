const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS });
    }

    const headers = { ...CORS, 'Content-Type': 'application/json' };

    if (request.method === 'GET') {
      const data = await env.SCHEDULE_KV.get('schedule');
      return new Response(data || 'null', { headers });
    }

    if (request.method === 'PUT') {
      const body = await request.text();
      await env.SCHEDULE_KV.put('schedule', body);
      return new Response('{"ok":true}', { headers });
    }

    return new Response('Not found', { status: 404 });
  },
};
