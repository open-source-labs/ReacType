import React, { useRef, useEffect } from 'react';
import { select, hierarchy, tree, linkHorizontal } from 'd3';
import cloneDeep from 'lodash/cloneDeep';
import useResizeObserver from './useResizeObserver';
import { useSelector } from 'react-redux';
import { ChildElement } from '../../../interfaces/Interfaces';
import { RootState } from '../../../redux/store';

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => (ref.current = value));
  return ref.current;
}

/**
 * `Tree` is a React component for visualizing the hierarchical structure of components in an application.
 * It uses D3 to create a tree diagram that users can interact with to understand the relationship between components
 * and to inspect the state and props of each component. Clicking on a node in the tree diagram updates the state
 * and props information displayed elsewhere in the application.
 *
 * @param {Object} props - The props passed to the component.
 * @param {Array} props.data - The array of component data from the application's state. Each element represents a component
 *                             and includes details like the component's name, its child components, and its state and props.
 * @param {Function} props.setCurrComponentState - Function to set the current component's state in the outer component's state.
 * @param {Function} props.setParentProps - Function to set the parent props in the outer component's state.
 * @param {Function} props.setClickedComp - Function to update the currently selected component in the outer component's state.
 *
 * This component is designed to be used in applications where understanding the component architecture visually can help
 * in debugging and development. It leverages Redux to manage global state access and D3 for rendering the tree graph.
 *
 * Usage Example:
 * ```jsx
 * <Tree
 *   data={componentData}
 *   setCurrComponentState={updateComponentState}
 *   setParentProps={updateParentProps}
 *   setClickedComp={updateClickedComponent}
 * />
 * ```
 *
 * Note:
 * The component uses SVG to render the tree and implements interactive features such as clicking on nodes to trigger state updates.
 * Ensure that the data passed to this component is correctly formatted to represent the hierarchical structure of components.
 */
function Tree({ data, setCurrComponentState, setParentProps, setClickedComp }) {
  const state = useSelector((store: RootState) => store.appState);
  // Provide types for the refs.
  // In this case HTMLDivElement for the wrapperRef and SVGSVGElement for the svgRef.
  // create mutable ref objects with initial values of null
  const svgRef = useRef<SVGSVGElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const xPosition = 50;
  const textAndBorderColor = '#bdbdbd';
  const dimensions = useResizeObserver(wrapperRef);
  // we save data to see if it changed
  const previouslyRenderedData = usePrevious(data);
  // function to filter out separators to prevent render on tree chart
  const removeHTMLElements = (arr: ChildElement[]) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === undefined) continue;
      // if element is separator, remove it
      if (arr[i].type === 'HTML Element') {
        arr.splice(i, 1);
        i -= 1;
      }
      // if element has a children array and that array has length, recursive call
      else if (arr[i].type === 'Component' && arr[i].children.length) {
        // if element is a component, replace it with deep clone of latest version (to update with new HTML elements)
        if (arr[i].type === 'Component')
          arr[i] = cloneDeep(
            data.find((component) => component.name === arr[i].name)
          );
        removeHTMLElements(arr[i].children);
      }
    }
    return arr;
  };

  // create a deep clone of data to avoid mutating the actual children array in removing separators
  const dataDeepClone = cloneDeep(data);

  if (state.projectType === 'Next.js') {
    dataDeepClone.forEach((element) => {
      element.children = sanitize(element.children).filter(
        (element) => !Array.isArray(element)
      );
    });

    function sanitize(children) {
      return children.map((child) => {
        if (child.name === 'Switch' || child.name === 'Route')
          return sanitize(child.children);
        return child;
      });
    }
  }

  // remove separators and update components to current versions
  dataDeepClone.forEach((component) => removeHTMLElements(component.children));

  // will be called initially and on every data change
  useEffect(() => {
    const svg = select(svgRef.current);
    // use dimensions from useResizeObserver,
    // but use getBoundingClientRect on initial render
    // (dimensions are null for the first render)

    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect();
    // transform hierarchical data

    let root;
    let rootName;

    if (state.rootComponents.includes(state.canvasFocus.componentId)) {
      // find out if canvasFocus is a root component
      // if yes, set root of tree to be that canvasFocus component
      // find that component inside dataDeepClone
      for (let i = 0; i < dataDeepClone.length; i++) {
        if (dataDeepClone[i].id === state.canvasFocus.componentId) {
          root = hierarchy(dataDeepClone[i]);
          rootName = dataDeepClone[i].name;
        }
      }
    } else {
      // if no, set root of tree to be app/index
      root = hierarchy(dataDeepClone[0]);
      rootName = dataDeepClone[0].name;
    }

    setClickedComp(rootName);

    const treeLayout = tree().size([height, width - 125]);
    // Returns a new link generator with horizontal display.
    // To visualize links in a tree diagram rooted on the left edge of the display
    const linkGenerator = linkHorizontal()
      .x((link) => link.y)
      .y((link) => link.x);

    // insert our data into the tree layout
    treeLayout(root);

    svg
      .selectAll('.node')
      .data(root.descendants())
      .join((enter) => enter.append('circle').attr('opacity', 0))
      .attr('class', 'node')
      /*
        The cx, cy attributes are associated with the circle and ellipse elements and designate the centre of each shape. The coordinates are set from the top, left hand corner of the web page.
        cx: The position of the centre of the element in the x axis measured from the left side of the screen.
        cy: The position of the centre of the element in the y axis measured from the top of the screen.
      */
      // translate (x, y)
      .attr('cx', (node) => node.y)
      .attr('cy', (node) => node.x)
      .attr('r', 10)
      .attr('opacity', 1)
      .style('fill', 'white')
      .attr('transform', `translate(${xPosition}, 0)`)
      .on('click', (element) => {
        const nameOfClicked = element.srcElement.__data__.data.name;
        let passedInProps;
        let componentStateProps;

        // iterate through data array to find stateProps and passedInProps
        for (let i = 0; i < data.length; i++) {
          if (data[i].name === nameOfClicked) {
            componentStateProps = data[i].stateProps;
            passedInProps = data[i].passedInProps;
          }
        }
        setCurrComponentState(componentStateProps);
        setParentProps(passedInProps);
        setClickedComp(nameOfClicked);
      });

    // link - lines that connect the nodes
    const enteringAndUpdatingLinks = svg
      .selectAll('.link')
      .data(root.links())
      .join('path')
      .attr('class', 'link')
      .attr('d', linkGenerator)
      .attr('stroke', 'white')
      .attr('fill', 'none')
      .attr('opacity', 1)
      .attr('transform', `translate(${xPosition}, 0)`);
    if (data !== previouslyRenderedData) {
      enteringAndUpdatingLinks
        .attr('stroke-dashoffset', function () {
          return this.length;
        })
        .attr('stroke-dashoffset', 0);
    }

    // label - the names of each html element (node)
    svg
      .selectAll('.label')
      .data(root.descendants())
      .join((enter) => enter.append('text').attr('opacity', 0))
      .attr('class', 'label')
      .attr('x', (node) => node.y)
      .attr('y', (node) => node.x - 20)
      .attr('text-anchor', 'middle')
      .attr('font-size', 18)
      .style('fill', 'white')
      .text((node) => node.data.name)
      .attr('opacity', 1)
      .attr('transform', `translate(${xPosition}, 0)`);
  }, [data, dimensions, previouslyRenderedData]);

  const treeStyles = {
    height: '400px',
    width: '100%',
    margin: '10px 10px 10px 10px',
    overflow: 'auto',
    alignItems: 'center'
  };

  const wrapperStyles = {
    borderRadius: '10px',
    width: '100%',
    height: '90%',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#1E2024'
  };

  return (
    <div ref={wrapperRef} style={wrapperStyles}>
      <svg ref={svgRef} style={treeStyles} />
    </div>
  );
}

export default Tree;
