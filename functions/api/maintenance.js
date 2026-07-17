export async function onRequest(context) {
  const { request } = context;

  // 1. Handle Preflight OPTIONS request
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "https://nightindustriesservers.pages.dev",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  // 2. Handle your actual API logic here
  // ... your existing code to save the maintenance status ...

  // 3. Ensure the final response includes CORS headers
  const response = new Response(JSON.stringify({ status: "success" }), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "https://nightindustriesservers.pages.dev",
    },
  });

  return response;
}
