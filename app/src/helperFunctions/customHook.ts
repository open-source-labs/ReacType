import React, {useRef, useEffect} from 'react';


function usePrevious(value) {
  const ref = useRef();
  // console.log('ref', ref)
  useEffect(() => {
    ref.current = value;
    // console.log('useEffect', ref.current);
    // return ref.current;
  });
  // console.log('ref.current', ref.current)
  return ref.current;
}

export default usePrevious;
