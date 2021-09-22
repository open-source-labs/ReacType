const handleGitHubOauth = () => {
  const gitHubUrl = 'https://github.com/login/oauth/authorize?';
  const authUrl =
  `${gitHubUrl}client_id=`;
  window.open(authUrl);
}

export default handleGitHubOauth;