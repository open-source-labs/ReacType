import { useEffect, useState } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

/**
 * A custom React hook that allows you to monitor changes in the dimensions of an HTML element.
 * It uses the `ResizeObserver` API to observe the specified element and updates the state
 * with the new dimensions whenever a change is detected.
 *
 * This hook is useful for responsive components that need to adjust their layout or functionality
 * based on their size, and it abstracts the setup and teardown logic associated with `ResizeObserver`
 * to make it easy to use within a React component.
 *
 * @param {React.RefObject<HTMLElement>} ref - A React ref attached to the element whose dimensions you want to monitor.
 * @returns {DOMRectReadOnly | null} The latest dimensions of the observed element, or `null` if the dimensions are not available.
 *
 * The returned object includes properties such as `width`, `height`, `top`, `right`, `bottom`, and `left`,
 * providing a comprehensive overview of the element's size and position relative to its containing block.
 *
 * Usage:
 * 1. Attach a ref to your component using `React.useRef()`.
 * 2. Pass this ref to the `useResizeObserver` hook.
 * 3. Use the returned dimensions to adjust your component's styling or behavior.
 *
 * Example:
 * ```jsx
 * const MyResponsiveComponent = () => {
 *   const myRef = useRef();
 *   const dimensions = useResizeObserver(myRef);
 *
 *   return <div ref={myRef} style={{ width: '100%', height: '100%' }}>
 *     {dimensions && <span>{`Width: ${dimensions.width}, Height: ${dimensions.height}`}</span>}
 *   </div>;
 * };
 * ```
 *
 * Note:
 * Make sure to polyfill `ResizeObserver` in environments that do not support it, as this hook
 * relies on that API to function properly.
 */
const useResizeObserver = (
  ref: React.RefObject<HTMLElement>
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
