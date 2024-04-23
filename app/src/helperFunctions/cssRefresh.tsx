// Removes old link to css and creates a new stylesheet link on demo render
// this is not currently being used for the website version
const cssRefresher = (): void => {
  const oldStylesheet = document.getElementById('stylesheet');
  if (oldStylesheet !== null) oldStylesheet.remove();
  const newStylesheet = document.createElement('LINK') as HTMLLinkElement;
  newStylesheet.rel = 'stylesheet';
  newStylesheet.type = 'text/css';
  newStylesheet.href = 'fake.css';
  newStylesheet.id = 'stylesheet';
  const renderFocusElement = document.getElementById('renderFocus');
  if (renderFocusElement !== null) {
    renderFocusElement.appendChild(newStylesheet);
  }
};
export default cssRefresher;


