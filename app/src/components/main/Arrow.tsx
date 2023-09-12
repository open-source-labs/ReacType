import { Arrow } from '../../interfaces/Interfaces'
const arrow: Arrow = {
  renderArrow: (id) => {
    if(id != null) {
      let canvasEle = document.getElementById(`canv${id}`)
      let renderEle = document.getElementById(`rend${id}`)
      if( canvasEle === null || renderEle === null) {
        return;
      } else {
        let canvasElePosition = canvasEle.getBoundingClientRect();
        let renderElePosition = renderEle.getBoundingClientRect();
        const canvasEleX =  canvasElePosition.left + canvasElePosition.width;
        const canvasEleY =  canvasElePosition.top + (canvasElePosition.height / 2);
        const renderEleX =  renderElePosition.left;
        const renderEleY =  renderElePosition.top;
        arrow.lineDraw(canvasEleX, canvasEleY, renderEleX, renderEleY);
      }
    }
  },

  createLineElement: (x, y, length, angle) => {
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
    let line = document.createElement("div");
    line.setAttribute("class", "line");
    line.setAttribute('style', styles);  
    return line;
  },

  createHeadElement: (x, y, length, angle) => {
    let styles = 'width: 13px;'
              + 'height: 13px;'
              + 'border: solid 2px;'
              + 'border-radius: 50%;'
              + 'z-index: 9999999999;'
              + 'background-color: #00FFFF;'
              + 'border-color: #bbb;' 
              + 'rotate: ' + angle + 'rad;'
              + 'position: absolute;'
              + 'top: ' + -6.5 + 'px;'
              + 'left: ' + 0 + (length - 12) + 'px;';
    let head = document.createElement("div");
    head.setAttribute("class", "head"); 
    head.setAttribute('style', styles);
    return head;
  },

  lineDraw: (x1, y1, x2, y2) => {
    let a = x1 - x2,
        b = y1 - y2,
        c = Math.sqrt(a * a + b * b);
    let sx = (x1 + x2) / 2,
        sy = (y1 + y2) / 2;
    let x = sx - c / 2,
        y = sy;
    let alpha = Math.PI - Math.atan2(-b, a);
    let line = arrow.createLineElement(x, y, c, alpha);
    let head = arrow.createHeadElement(x, y, c, alpha);
    arrow.deleteLines();
    document.getElementsByClassName("main")[0].append(line);
    document.getElementsByClassName("line")[0].append(head);
  },

  deleteLines: () => {
    let lineArray = document.getElementsByClassName("line");
    let lineArrayIterable = Array.from(lineArray);
    let headArray = document.getElementsByClassName("head");
    let headArrayIterable = Array.from(headArray);
    for(const line of lineArrayIterable) {
      line.remove();
    }
    for(const head of headArrayIterable) {
      head.remove();
    }
  }
}

export default arrow;
