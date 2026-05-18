exports.handler = async (event) => {
  try {
    const data = JSON.parse(event.body);

    const token = process.env.GITHUB_TOKEN;
    const repo = process.env.GITHUB_REPO;
    const branch = process.env.GITHUB_BRANCH || "main";

    const fileName = `characters/${data.id}.json`;
    const fileContent = JSON.stringify(data, null, 2);
    const encodedContent = Buffer.from(fileContent).toString("base64");

    const url = `https://api.github.com/repos/${repo}/contents/${fileName}`;

    let sha;

    const existing = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json"
      }
    });

    if (existing.ok) {
      const existingData = await existing.json();
      sha = existingData.sha;
    }

    const saveResponse = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: `Save character ${data.summary?.name || data.id}`,
        content: encodedContent,
        branch,
        sha
      })
    });

    if (!saveResponse.ok) {
      const errorText = await saveResponse.text();
      return {
        statusCode: 500,
        body: JSON.stringify({ error: errorText })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
