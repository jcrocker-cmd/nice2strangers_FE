import { ProgressSpinner } from "primereact/progressspinner";
import "../../../index.css";

export const Spinner = () => {
  return (
    <div className="flex justify-center items-center">
      <ProgressSpinner
        style={{ width: "50px", height: "50px" }}
        strokeWidth="5"
        fill="var(--surface-ground)"
        animationDuration="1s"
      />
    </div>
  );
};

export const BaseSpinner = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <ProgressSpinner
        style={{ width: "70px", height: "70px" }}
        strokeWidth="4"
        animationDuration="1s"
      />
    </div>
  );
};
