// functions/api/update-status.js
export async function onRequestPost(context) {
    try {
        const data = await context.request.json();
        
        // Log the incoming request to verify it's working
        console.log("Received data:", data);

        // Here you would typically interface with a database (like KV or D1)
        // For now, we return a success response to clear the error in your frontend
        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
}
