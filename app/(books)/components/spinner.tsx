import { RefObject } from "react";
import { SpinnerIcon } from "./icons";

export const Spinner = ({ refId }: { refId: RefObject<HTMLDivElement> }) => {
  return (
    <div
      ref={refId}
      className="col-span-1 my-8 flex w-full items-center justify-center"
    >
      <SpinnerIcon className="!w-[64px]" />
      <span className="sr-only">Loading...</span>
    </div>
  );
};  