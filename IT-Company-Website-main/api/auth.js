// api/auth.js
export default async function handler(req, res) {
  const client_id = process.env.GITHUB_CLIENT_ID;
  const client_secret = process.env.GITHUB_CLIENT_SECRET;
  const code = req.query.code;

  if (!code) {
    return res.status(400).json({ error: "Missing code parameter" });
  }

  try {
    const response = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new URLSearchParams({
        client_id,
        client_secret,
        code,
      }),
    });

    const data = await response.json();

    if (data.error) {
      return res.status(400).json(data);
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "OAuth Proxy Error", details: error.message });
  }
}
