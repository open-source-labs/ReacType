const handleGitHubOauth = () => {
  console.log('git hub');
  const gitHubUrl = 'https://github.com/login/oauth/authorize?';
  const authUrl =
  `${gitHubUrl}client_id=`;
  window.open(authUrl);
}

export default handleGitHubOauth;