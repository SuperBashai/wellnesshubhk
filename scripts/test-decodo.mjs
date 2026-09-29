const rawToken = process.env.DECODO_AUTH_TOKEN?.trim();

if (!rawToken) {
  console.error("DECODO_AUTH_TOKEN is missing. Add it to .env.local before testing.");
  process.exit(1);
}

const token = rawToken.replace(/^Basic\s+/i, "");
const response = await fetch("https://scraper-api.decodo.com/v1/tasks", {
  method: "POST",
  headers: {
    Accept: "application/json",
    Authorization: `Basic ${token}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    target: "universal",
    url: "https://ip.decodo.com",
    locale: "en-us",
  }),
});

if (!response.ok) {
  const message = await response.text();
  console.error(`Decodo authentication test failed (${response.status}): ${message.slice(0, 300)}`);
  process.exit(1);
}

const result = await response.json();
console.log(`Decodo connection successful${result.id ? `; task ${result.id} created` : ""}.`);
