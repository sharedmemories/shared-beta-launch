export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const objectPath = url.pathname.slice(1); // Remove leading slash

    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Max-Age': '86400',
        },
      });
    }

    // Only allow GET requests
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response('Method Not Allowed', { status: 405 });
    }

    // Get the object from R2
    const object = await env.MY_BUCKET.get(objectPath);

    if (!object) {
      return new Response('Object Not Found', { status: 404 });
    }

    // Return the object with appropriate headers
    const headers = new Headers();
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Cache-Control', 'public, max-age=31536000');
    object.writeHttpMetadata(headers);

    return new Response(object.body, {
      headers,
    });
  },
};
