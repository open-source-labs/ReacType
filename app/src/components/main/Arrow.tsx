const renderArrow = (id : number) => {
  console.log("RENDER ARROW ID: ", id)
  if(id != null) {
    let canvasEle = document.getElementById(`canv${id}`)//.offsetHeight;
    let renderEle = document.getElementById(`rend${id}`)
    if( canvasEle === null || renderEle === null) {
      return;
    } else {
      console.log("CANVAS ELE *******", canvasEle)
      let canvasElePosition = canvasEle.getBoundingClientRect();
      let renderElePosition = renderEle.getBoundingClientRect();
      console.log("POSITION *******" ,canvasElePosition)
      const canvasEleX =  canvasElePosition.left + canvasElePosition.width;
      const canvasEleY =  canvasElePosition.top + (canvasElePosition.height / 2);
      const renderEleX =  renderElePosition.left;
      const renderEleY =  renderElePosition.top;
      lineDraw(canvasEleX, canvasEleY, renderEleX, renderEleY);
    }
  }
}


function createLineElement(x, y, length, angle) {
  let line = document.createElement("div");
  line.setAttribute("class", "line");
  let styles = 'border: 1px solid black; '
             + 'width: ' + length + 'px; '
             + 'height: 0px; '
             + '-moz-transform: rotate(' + angle + 'rad); '
             + '-webkit-transform: rotate(' + angle + 'rad); '
             + '-o-transform: rotate(' + angle + 'rad); '  
             + '-ms-transform: rotate(' + angle + 'rad); '  
             + 'position: absolute; '
             + 'top: ' + y + 'px; '
             + 'left: ' + x + 'px; ';
  line.setAttribute('style', styles);  
  return line;
}

function lineDraw(x1, y1, x2, y2) {
  let a = x1 - x2,
      b = y1 - y2,
      c = Math.sqrt(a * a + b * b);

  let sx = (x1 + x2) / 2,
      sy = (y1 + y2) / 2;

  let x = sx - c / 2,
      y = sy;

  let alpha = Math.PI - Math.atan2(-b, a);

  let line = createLineElement(x, y, c, alpha);
  deleteLines();
  document.getElementsByClassName("main")[0].append(line);
}

function deleteLines() {
  let lineArray = document.getElementsByClassName("line");
  console.log("LINE ARRAY" , lineArray);
  for(const line of lineArray) {
    line.remove();
  }
}


export default renderArrow;