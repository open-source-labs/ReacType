// Removes old link to css and creates a new stylesheet link on demo render
const cssRefresher = () => {
  const oldStylesheet = document.getElementById('Render Stylesheet')
  console.log(oldStylesheet);
  if (oldStylesheet !== null) oldStylesheet.remove();
  const rando = Math.random() * 100000;
  const newStylesheet = document.createElement("LINK");
  newStylesheet.setAttribute("rel", "stylesheet")
  newStylesheet.setAttribute("type", "text/css");
  newStylesheet.setAttribute("href", `https://reactype-caret.herokuapp.com/demoRender?${rando}`);
  newStylesheet.setAttribute("id", 'Render Stylesheet');
  document.getElementById('renderFocus').append(newStylesheet);
  console.log(newStylesheet)
}
export default cssRefresher;