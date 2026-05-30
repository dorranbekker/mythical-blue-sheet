exports.handler = async (event) => {
  try {
    const id = event.queryStringParameters?.id;

    if (!id) {
      return {
        statusCode: 400,
        headers: { "Cache-Control": "no-store" },
        body: JSON.stringify({ error: "Missing character id" })
      };
    }

    const token = process.env.GITHUB_TOKEN;
    const repo = process.env.GITHUB_REPO;
    const branch = process.env.GITHUB_BRANCH || "main";
    const path = `characters/${encodeURIComponent(id)}.json`;

    const response = await fetch(
      `https://api.github.com/repos/${repo}/contents/${path}?ref=${branch}&t=${Date.now()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
          "Cache-Control": "no-cache"
        }
      }
    );

    if (!response.ok) {
      return {
        statusCode: response.status,
        headers: { "Cache-Control": "no-store" },
        body: JSON.stringify({ error: await response.text() })
      };
    }

    const file = await response.json();
    const character = JSON.parse(
      Buffer.from(file.content, "base64").toString("utf8")
    );

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store"
      },
      body: JSON.stringify(character)
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { "Cache-Control": "no-store" },
      body: JSON.stringify({ error: error.message })
    };
  }
};
