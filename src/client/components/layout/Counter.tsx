import type { AppDispatch, RootState } from "../../../state/store";
import { useDispatch, useSelector } from "react-redux";
import {
  decrement,
  increment,
  incrementByAmount,
  decrementByAmount,
} from "../../../state/counter/counterSlice";

const CounterComponent = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div>
      <h2>{count}</h2>
      <div className="flex gap-5">
        <button
          onClick={() => dispatch(increment())}
          className="bg-black text-white"
        >
          Increment
        </button>
        <button
          onClick={() => dispatch(decrement())}
          className="bg-black text-white"
        >
          Decrement
        </button>
        <button
          onClick={() => dispatch(incrementByAmount(10))}
          className="bg-black text-white"
        >
          Increment by 10
        </button>
        <button
          onClick={() => dispatch(decrementByAmount(10))}
          className="bg-black text-white"
        >
          Decrement by 10
        </button>
        {/* <button
          onClick={() => dispatch(incrementAsync(15))}
          className="bg-black text-white"
        >
          Increment
        </button> */}
      </div>
    </div>
  );
};

export default CounterComponent;
