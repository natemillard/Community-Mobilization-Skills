const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env;

exports.handler = async (event) => {
  const { code } = event.queryStringParameters;

  if (!code) {
    return {
      statusCode: 302,
      headers: {
        Location: `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=repo`,
      },
    };
  }

  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      client_id: GITHUB_CLIENT_ID,
      client_secret: GITHUB_CLIENT_SECRET,
      code,
    }),
  });

  const data = await response.json();

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'text/html' },
    body: `<script>
      window.opener.postMessage(
        'authorization:github:success:${JSON.stringify({ token: data.access_token, provider: 'github' })}',
        '*'
      );
    </script>`,
  };
};
