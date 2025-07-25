// import { useRef } from "react"

// const CounterUseRef = () => {

//     const countref = useRef(0);

//     const increment = () => {
//         countref.current += 1;
//         console.log("Current  Count (no re-render):", countref.current)
//     }

//     console.log('Component Rendered')

//   return (
//     <button onClick={increment}>Count (Check Console)</button>
//   )
// }

// export default CounterUseRef



import { useState, useRef } from "react";

function CounterComparison() {
  const [stateCount, setStateCount] = useState(0);
  const refCount = useRef(0);

  console.log("Component rendered!"); 

  const incrementState = () => {
    setStateCount(stateCount + 1); 
  };

  const incrementRef = () => {
    refCount.current += 1; 
    console.log("Ref count (no re-render):", refCount.current);
  };

  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <h2>useState vs useRef</h2>
      <div>
        <p>State Count (updates UI): {stateCount}</p>
        <button onClick={incrementState}>Increment State</button>
      </div>
      <div style={{ marginTop: "1rem" }}>
        <p>Ref Count (check console): {refCount.current}</p>
        <button onClick={incrementRef}>Increment Ref</button>
      </div>
    </div>
  );
}

export default CounterComparison;
