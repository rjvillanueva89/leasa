import { ClassAttributes, HTMLAttributes, HTMLProps } from "react";

interface Props
  extends HTMLAttributes<HTMLDivElement>,
    ClassAttributes<HTMLDivElement>,
    HTMLProps<HTMLDivElement> {}

const Loader = (props: Props) => {
  return (
    <div {...props}>
      <span className="loading loading-spinner h-full w-full"></span>
    </div>
  );
};

export default Loader;
