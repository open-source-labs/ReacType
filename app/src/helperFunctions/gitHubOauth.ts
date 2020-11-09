const handleGitHubOauth = () => {
  console.log('git hub');
  const gitHubUrl = 'https://github.com/login/oauth/authorize?';
  const authUrl =
  `${gitHubUrl}client_id=${process.env.GITHUB_ID}`;
  window.open(authUrl);
}

export default handleGitHubOauth;