/* eslint-disable max-len */
import React, { useRef, useEffect, useContext, Children } from 'react';
import { select, hierarchy, tree, linkHorizontal } from 'd3';
import cloneDeep from 'lodash/cloneDeep';
import useResizeObserver from './useResizeObserver';
import { useSelector } from 'react-redux';

function usePrevious(value) {
  const ref = useRef(); // creates a ref obj w/ current: value
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

/**
 * `TreeChart` is a React component that visualizes a tree structure using D3.js. It is designed to display
 * hierarchical data related to the application's state components, such as UI elements or nested components.
 * The component dynamically updates to reflect changes in the data or the component's dimensions.
 *
 * The visualization includes nodes represented by circles, connected by lines (links), with labels displaying
 * the name of each node. It uses the `useResizeObserver` hook to react to changes in the container's size,
 * ensuring the tree layout adjusts accordingly.
 *
 * @param {Object} props - Properties passed to the component.
 * @param {Array} props.data - The hierarchical data used to generate the tree structure, typically derived from the application's state.
 * @returns {JSX.Element} A responsive SVG element that renders the tree visualization inside a styled container.
 *
 * The component processes the incoming data to remove any unwanted items (like separators) and ensures that
 * the structure is suitable for visualization. It uses D3's tree layout to calculate the positions of nodes
 * and links based on the available space. This layout is responsive, adapting to changes in the container's size.
 * The component integrates with Redux to access relevant parts of the application state and uses local state
 * to manage modal dialogs and other UI elements.
 */
function TreeChart({ data }): JSX.Element {
  // data is components from state - passed in from BottomTabs
  const state = useSelector((store) => store.appState);

  const canvasId = state.canvasFocus.componentId;

  const svgRef = useRef();
  const wrapperRef = useRef();

  const xPosition = 50;
  const dimensions = useResizeObserver(wrapperRef);
  // we save data to see if it changed
  const previouslyRenderedData = usePrevious(data);
  // function to filter out separators to prevent render on tree chart

  const removeSeparators = (arr: object[]) => {
    // loop over array
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === undefined) continue;
      // if element is separator, remove it
      if (arr[i].name === 'separator') {
        arr.splice(i, 1);
        i -= 1;
      }
      // if element has a children array and that array has length, recursive call
      else if (
        (arr[i].name === 'div' ||
          arr[i].name === 'form' ||
          arr[i].type === 'Component' ||
          arr[i].name === 'Link' ||
          arr[i].name === 'Switch' ||
          arr[i].name === 'Route' ||
          arr[i].name === 'menu' ||
          arr[i].name === 'ul' ||
          arr[i].name === 'ol' ||
          arr[i].name === 'li') &&
        arr[i].children.length
      ) {
        // if element is a component, replace it with deep clone of latest version (to update with new HTML elements)
        if (arr[i].type === 'Component')
          arr[i] = cloneDeep(
            data.find((component) => component.name === arr[i].name),
          );
        removeSeparators(arr[i].children);
      }
    }
    // return mutated array
    return arr;
  };
  // create a deep clone of data to avoid mutating the actual children array in removing separators
  const dataDeepClone = cloneDeep(data);

  // Miko left off
  if (state.projectType === 'Next.js') {
    dataDeepClone.forEach((element) => {
      element.children = sanitize(element.children).filter(
        (element) => !Array.isArray(element),
      );
    });

    function sanitize(children) {
      return children.map((child) => {
        if (child.name === 'Switch' || child.name === 'Route') {
          return sanitize(child.children);
        }
        return child;
      });
    }
  }

  // remove separators and update components to current versions
  dataDeepClone.forEach((component) => {
    removeSeparators(component.children);
  });
  // will be called initially and on every data change
  useEffect(() => {
    const svg = select(svgRef.current);
    // use dimensions from useResizeObserver,
    // but use getBoundingClientRect on initial render
    // (dimensions are null for the first render)
    const { width, height } = dimensions || wrapperRef.current.getBoundingClientRect();
    // transform hierarchical data
    const root = hierarchy(dataDeepClone[canvasId - 1]); // pass in clone here instead of data
    const treeLayout = tree().size([height, width - 125]);
    // Returns a new link generator with horizontal display.
    // To visualize links in a tree diagram rooted on the left edge of the display
    const linkGenerator = linkHorizontal()
      .x((link) => link.y)
      .y((link) => link.x);
    // insert our data into the tree layout
    treeLayout(root);
    // node - each element in the tree
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
      .attr('r', 4) // radius of circle
      .attr('opacity', 1)
      .style('fill', 'white')
      .attr('transform', `translate(${xPosition}, 0)`);
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
      .attr('y', (node) => node.x - 12)
      .attr('text-anchor', 'middle')
      .attr('font-size', 18)
      .style('fill', 'white')
      .text((node) => node.data.name)
      .attr('opacity', 1)
      .attr('transform', `translate(${xPosition}, 0)`);
  }, [state.components, dimensions, previouslyRenderedData, canvasId]);
  const treeStyles = {
    height: '100%',
    width: '100%',
    margin: '10px 10px 10px 10px',
    overflow: 'auto',
  };
  const wrapperStyles = {
    borderRadius: '10px',
    width: '100%',
    height: '97%',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#1E2024',
  };
  return (
    <div ref={wrapperRef} style={wrapperStyles}>
      <svg ref={svgRef} style={treeStyles}></svg>
    </div>
  );
}
export default TreeChart;
