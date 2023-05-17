// Removes old link to css and creates a new stylesheet link on demo render
// this is not currently being used for the website version
const cssRefresher = () => {
  const oldStylesheet = document.getElementById('stylesheet');
  console.log(oldStylesheet);
  if (oldStylesheet !== null) oldStylesheet.remove();
  // const rando = Math.random() * 100000;
  const newStylesheet = document.createElement('LINK');
  newStylesheet.setAttribute('rel', 'stylesheet');
  newStylesheet.setAttribute('type', 'text/css');
  newStylesheet.setAttribute('href', 'fake.css');
  newStylesheet.setAttribute('id', 'stylesheet');
  document.getElementById('renderFocus').append(newStylesheet);
  console.log(newStylesheet);
};
export default cssRefresher;
