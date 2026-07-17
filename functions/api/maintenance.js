export async function onRequest(context) {
    // 1. Handle the OPTIONS request (required for CORS)
    if (context.request.method === "OPTIONS") {
        return new Response(null, {
            headers: {
                "Access-Control-Allow-Origin": "https://nightindustriesservers.pages.dev",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
            },
        });
    }

    // 2. Handle your actual POST request
    return new Response(JSON.stringify({ status: "success" }), {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "https://nightindustriesservers.pages.dev",
        },
    });
}
