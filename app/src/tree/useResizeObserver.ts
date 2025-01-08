/* eslint-disable max-len */
import { RefObject, useEffect, useState } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

/**
 * A custom React hook that observes the resize of a specified DOM element.
 * @param {RefObject<HTMLElement>} ref - The reference to the DOM element to observe.
 * @returns {DOMRectReadOnly | null} - The dimensions of the observed element, or null if not available.
 */
const useResizeObserver = (
  ref: RefObject<HTMLElement>,
): DOMRectReadOnly | null => {
  const [dimensions, setDimensions] = useState(null);
  useEffect(() => {
    // the element being observed (div with green border)
    const observeTarget = ref.current;
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        // contentRect is an object containing the dimensions of the observed element
        setDimensions(entry.contentRect);
      });
    });
    resizeObserver.observe(observeTarget);
    return () => {
      resizeObserver.unobserve(observeTarget);
    };
  }, [ref]);
  return dimensions;
};

export default useResizeObserver;
