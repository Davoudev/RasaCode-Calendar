//external dependencies
import type { PopoverYearInputProps } from "../type/type";
//external types dependencies
import { useRef, useState } from "react";
import {
  flip,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
} from "@floating-ui/react";
//internal dependencies
//internal types dependencies

const PopoverYearInput = ({ currentYear, onSubmit }: PopoverYearInputProps) => {
  const [open, setOpen] = useState(false);
  const [yearInput, setYearInput] = useState(currentYear);
  const inputRef = useRef<HTMLInputElement>(null);

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: "top",
    middleware: [offset(8), flip(), shift()],
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
  ]);

  const handleSubmit = () => {
    if (!isNaN(yearInput)) {
      onSubmit(yearInput);
      setOpen(false);
    }
  };

  return (
    <>
      <span ref={refs.setReference} {...getReferenceProps()}>
        {currentYear}
      </span>
      {open && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
        >
          <input
            ref={inputRef}
            type="number"
            value={yearInput}
            onChange={(e) => setYearInput(+e.target.value)}
            placeholder="به سال..."
          />
          <button onClick={handleSubmit}>برو</button>
        </div>
      )}
    </>
  );
};

export default PopoverYearInput;
