const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400",
};

const DEFAULT_SERVICES = [
  { id: 'night-cloud', name: 'Night Cloud', desc: 'Secure cloud infrastructure', icon: '☁️', status: 'online', url: 'index.html' },
  { id: 'night-play', name: 'Night Play', desc: 'Gaming & entertainment', icon: '🎮', status: 'online', url: 'night-play.html' },
  { id: 'night-mail', name: 'Night Mail', desc: 'Encrypted messaging', icon: '✉️', status: 'online', url: 'night-mail.html' },
  { id: 'night-ai', name: 'Night AI', desc: 'Artificial intelligence', icon: '🤖', status: 'online', url: 'night-ai.html' },
  { id: 'night-store', name: 'Night Store', desc: 'Digital marketplace', icon: '🛒', status: 'online', url: 'night-store.html' },
  { id: 'night-secure', name: 'Night Secure', desc: 'Cybersecurity suite', icon: '🔒', status: 'online', url: 'night-secure.html' }
];

async function getJson(kv, key, defaultValue) {
  try {
    const text = await kv.get(key);
    if (!text) return defaultValue;
    return JSON.parse(text);
  } catch (e) {
    return defaultValue;
  }
}

async function putJson(kv, key, value) {
  try {
    await kv.put(key, JSON.stringify(value));
    return true;
  } catch (e) {
    return false;
  }
}

export default {
  async fetch(request, env, ctx) {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);
    const path = url.pathname;
    const kv = env.NIGHT_CLOUD_DATA;

    try {
      if (path === "/services" && request.method === "GET") {
        const services = await getJson(kv, "services", null);
        if (!services) {
          await putJson(kv, "services", DEFAULT_SERVICES);
          return new Response(JSON.stringify(DEFAULT_SERVICES), {
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          });
        }
        return new Response(JSON.stringify(services), {
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }
      
      else if (path === "/services" && request.method === "POST") {
        const body = await request.json();
        await putJson(kv, "services", body);
        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }
      
      else if (path === "/users" && request.method === "POST") {
        const body = await request.json();
        const users = await getJson(kv, "users", []);
        if (users.find(u => u.username.toLowerCase() === body.username.toLowerCase())) {
          return new Response(JSON.stringify({ error: "Username exists" }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          });
        }
        users.push(body);
        await putJson(kv, "users", users);
        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }
      
      else if (path === "/login" && request.method === "POST") {
        const body = await request.json();
        const users = await getJson(kv, "users", []);
        const user = users.find(u => 
          (u.username.toLowerCase() === body.usernameOrEmail.toLowerCase() || 
           u.email.toLowerCase() === body.usernameOrEmail.toLowerCase()) && 
          u.password === body.password
        );
        if (user) {
          return new Response(JSON.stringify({ user }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          });
        }
        return new Response(JSON.stringify({ error: "Invalid credentials" }), {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }
      
      else if (path === "/reset" && request.method === "POST") {
        await putJson(kv, "services", DEFAULT_SERVICES);
        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }
      
      else if (path === "/" || path === "") {
        return new Response(JSON.stringify({ 
          message: "Night Cloud API",
          endpoints: ["/services", "/users", "/login", "/reset"]
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }
      
      else {
        return new Response(JSON.stringify({ error: "Not found", path }), {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }
  }
};
