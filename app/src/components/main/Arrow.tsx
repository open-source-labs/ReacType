const Arrow = {};

Arrow.renderArrow = (id : number) => {
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
      Arrow.lineDraw(canvasEleX, canvasEleY, renderEleX, renderEleY);
    }
  }
}


Arrow.createLineElement = (x, y, length, angle) => {
  let line = document.createElement("div");
  line.setAttribute("class", "line");
  let styles = 'border: 1px solid black;'
             + 'width: ' + length + 'px;'
             + 'height: 0px;'
             + 'z-index: 9999999999;'
             + '-moz-transform: rotate(' + angle + 'rad);'
             + '-webkit-transform: rotate(' + angle + 'rad);'
             + '-o-transform: rotate(' + angle + 'rad);'  
             + '-ms-transform: rotate(' + angle + 'rad);'  
             + 'position: absolute;'
             + 'top: ' + y + 'px;'
             + 'left: ' + x + 'px;';
  line.setAttribute('style', styles);  
  return line;
}

Arrow.createHeadElement = (x, y, length, angle) => {
  let head = document.createElement("div");
  head.setAttribute("class", "head"); 
  console.log('length', length)
  angle = angle;
  console.log("ANGLE >>>>>", angle)
  const negative = -angle;
  let styles = 'width: 14px;'
             + 'height: 14px;'
             + 'border: solid 2px;'
             + 'border-radius: 50%;'
             + 'z-index: 9999999999;'
            //  + 'display: inline-block'
             + 'background-color: #00FFFF;'
             + 'border-color: #bbb;'
             //+ '-moz-transform: rotate(' + angle + 'rad);'
            // + '-webkit-transform: rotate(' + angle + 'rad);'
             //+ '-o-transform: rotate(' + angle + 'rad);'  
             + 'rotate: ' + angle + 'rad;'
            //  + '-ms-transform: rotate(' + angle + 'rad);'  
             + 'position: absolute;'
             + 'top: ' + -12 + 'px;'
             + 'left: ' + 0 + (length - 10) + 'px;';
  head.setAttribute('style', styles);
  console.log(head, "<<<<< HEAD")
  return head;
}

Arrow.lineDraw = (x1, y1, x2, y2) => {
  let a = x1 - x2,
      b = y1 - y2,
      c = Math.sqrt(a * a + b * b);

  let sx = (x1 + x2) / 2,
      sy = (y1 + y2) / 2;

  let x = sx - c / 2,
      y = sy;

  let alpha = Math.PI - Math.atan2(-b, a);

  let line = Arrow.createLineElement(x, y, c, alpha);
  let head = Arrow.createHeadElement(x, y, c, alpha);
  console.log("HEAD HERE >>>>>>", head)
  Arrow.deleteLines();
  document.getElementsByClassName("main")[0].append(line);
  document.getElementsByClassName("line")[0].append(head);
}

Arrow.deleteLines = () => {
  let lineArray = document.getElementsByClassName("line");
  let headArray = document.getElementsByClassName("head");
  console.log("LINE ARRAY" , lineArray);
  for(const line of lineArray) {
    line.remove();
  }
  for(const head of headArray) {
    head.remove();
  }
}

export default Arrow;