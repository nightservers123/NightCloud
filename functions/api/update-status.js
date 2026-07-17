export async function onRequestPost(context) {
    try {
        // Parse the incoming JSON data
        const data = await context.request.json();
        
        // Return a successful response to the frontend
        return new Response(JSON.stringify({ 
            status: "success", 
            received: data 
        }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (err) {
        // Return an error if the JSON parsing fails
        return new Response(JSON.stringify({ status: "error", message: err.message }), { 
            status: 400 
        });
    }
}
