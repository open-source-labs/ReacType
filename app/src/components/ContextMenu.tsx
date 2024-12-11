//
import React, { useEffect, useRef } from 'react';

function ContextMenu(props) {
  const panRef = useRef(null);

  useEffect(() => {
    document.addEventListener('click', (e) => {
      //   console.log(e);
      //  console.log(panRef);
      if (
        panRef.current != null &&
        !panRef.current.contains(e.target) &&
        props.visible === true
      ) {
        // or use: event.target.closest(selector) === null
        //console.log('die');
        props.setPopupOpen(false);
      }
    });
  }, [panRef]);
  return (
    // mouseX and mouseY are not use state, so if they change,
    //this will not change unless it rerenders.

    <h1
      style={{
        backgroundColor: 'orange',
        zIndex: '988',
        margin: '0px',
        padding: '0px',
        position: 'absolute',
        left: `${props.MouseXRef.current - 1}px`,
        top: `${props.MouseYRef.current - 1}px`,
        width: '100px',
        height: '200px'
      }}
      ref={panRef}
    >
      hi
    </h1>
  );
}
export default ContextMenu;
