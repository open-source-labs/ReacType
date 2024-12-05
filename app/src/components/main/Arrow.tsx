/* eslint-disable max-len */
import { Arrow } from '../../interfaces/Interfaces';

/**
 * The `Arrow` object provides functionalities to create and manage visual arrow elements on a web page.
 * It is primarily used for drawing arrows between two points on the screen, which is useful for representing
 * graphical connections or relationships in web-based applications.
 *
 * @property {Function} renderArrow - Renders an arrow from a source element to a destination element based on their IDs.
 * @property {Function} createLineElement - Creates a line element styled as an arrow shaft.
 * @property {Function} createHeadElement - Creates an arrow head element.
 * @property {Function} lineDraw - Draws a line with an arrowhead between two points on the screen.
 * @property {Function} deleteLines - Removes all existing lines and arrowheads from the screen.
 */
const arrow: Arrow = {
  renderArrow: (id) => {
    if (id != null) {
      const canvasEle = document.getElementById(`canv${id}`);
      const renderEle = document.getElementById(`rend${id}`);
      if (canvasEle === null || renderEle === null) {
        return;
      } else {
        const canvasElePosition = canvasEle.getBoundingClientRect();
        const renderElePosition = renderEle.getBoundingClientRect();
        const canvasEleX = canvasElePosition.left + canvasElePosition.width;
        const canvasEleY = canvasElePosition.top + canvasElePosition.height / 2;
        const renderEleX = renderElePosition.left;
        const renderEleY = renderElePosition.top;
        arrow.lineDraw(canvasEleX, canvasEleY, renderEleX, renderEleY);
      }
    }
  },

  createLineElement: (x, y, length, angle) => {
    const styles =
      'border: 1px solid black;' +
      'width: ' +
      length +
      'px;' +
      'height: 0px;' +
      'z-index: 9999999999;' +
      '-moz-transform: rotate(' +
      angle +
      'rad);' +
      '-webkit-transform: rotate(' +
      angle +
      'rad);' +
      '-o-transform: rotate(' +
      angle +
      'rad);' +
      '-ms-transform: rotate(' +
      angle +
      'rad);' +
      'position: absolute;' +
      'top: ' +
      y +
      'px;' +
      'left: ' +
      x +
      'px;';
    const line = document.createElement('div');
    line.setAttribute('class', 'line');
    line.setAttribute('style', styles);
    return line;
  },

  createHeadElement: (x, y, length, angle) => {
    const styles =
      'width: 13px;' +
      'height: 13px;' +
      'border: solid 2px;' +
      'border-radius: 50%;' +
      'z-index: 9999999999;' +
      'background-color: #00FFFF;' +
      'border-color: #bbb;' +
      'rotate: ' +
      angle +
      'rad;' +
      'position: absolute;' +
      'top: ' +
      -6.5 +
      'px;' +
      'left: ' +
      0 +
      (length - 12) +
      'px;';
    const head = document.createElement('div');
    head.setAttribute('class', 'head');
    head.setAttribute('style', styles);
    return head;
  },

  lineDraw: (x1, y1, x2, y2) => {
    const a = x1 - x2;
    const b = y1 - y2;
    const c = Math.sqrt(a * a + b * b);
    const sx = (x1 + x2) / 2;
    const sy = (y1 + y2) / 2;
    const x = sx - c / 2;
    const y = sy;
    const alpha = Math.PI - Math.atan2(-b, a);
    const line = arrow.createLineElement(x, y, c, alpha);
    const head = arrow.createHeadElement(x, y, c, alpha);
    arrow.deleteLines();
    document.getElementsByClassName('main')[0].append(line);
    document.getElementsByClassName('line')[0].append(head);
  },

  deleteLines: () => {
    const lineArray = document.getElementsByClassName('line');
    const lineArrayIterable = Array.from(lineArray);
    const headArray = document.getElementsByClassName('head');
    const headArrayIterable = Array.from(headArray);
    for (const line of lineArrayIterable) {
      line.remove();
    }
    for (const head of headArrayIterable) {
      head.remove();
    }
  },
};

export default arrow;
