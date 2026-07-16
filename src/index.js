export default {
  async fetch(request, env, ctx) {
    // 1. Check for the maintenance flag in your KV
    const maintenanceStatus = await env.NIGHT_KV.get("maintenance_mode");

    // 2. If the value is "true", block the site and show the message
    if (maintenanceStatus === "true") {
      return new Response(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Under Maintenance</title>
            <style>
                body { background: #0f0f0f; color: #fff; display: flex; justify-content: center; align-items: center; height: 100vh; font-family: sans-serif; text-align: center; }
                .container { border: 1px solid #333; padding: 40px; border-radius: 10px; background: #1a1a1a; }
                h1 { color: #ff4757; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>WE'LL BE RIGHT BACK</h1>
                <p>Our MAINTENANCE screen is being built.</p>
            </div>
        </body>
        </html>
      `, {
        status: 503,
        headers: { "Content-Type": "text/html" }
      });
    }

    // 3. If not in maintenance, serve the actual site
    return await fetch(request);
  }
};
