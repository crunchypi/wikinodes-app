// import React, { useState, useEffect, useRef } from "react";
// //import useDimensions from "react-cool-dimensions";
// import debounce from "lodash/debounce";

// export default class useResize extends Component {
//     state = { width: 500, height: 500 };

// //function useResize(ref) {
//     const wrapperID = '#graph-box';
//     const [state, setState] = useState();
//     useEffect(() => {
//       const getSize = debounce(() => {
//         if (!wrapperID || !wrapperID.current) {
//           return;
//         }
//         const width = wrapperID.current.offsetWidth;
//         const height = wrapperID.current.offsetHeight;
//         setState({
//           width,
//           height,
//         });
//       }, 500);
  
//       window.addEventListener("resize", getSize);
//       getSize();
//       return () => window.removeEventListener("resize", getSize);
//     }, [ref]);
  
//     return state;
//   }

