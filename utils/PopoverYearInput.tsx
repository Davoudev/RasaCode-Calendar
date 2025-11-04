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

/**
 * A popover input component for selecting and submitting a specific year.
 * Displays the current year and opens a floating input field (popover) when clicked.
 * The user can enter a new year, and upon submission, it triggers a callback with the selected year.
 *
 * Uses Floating UI for positioning and interactive behavior (click and dismiss handling).
 *
 * @component
 * @param {PopoverYearInputProps} props - Component props
 * @param {number} props.currentYear - The currently displayed year
 * @param {(newYear: number) => void} props.onSubmit - Callback function called when a valid year is submitted
 *
 * @example
 * <PopoverYearInput
 *   currentYear={1403}
 *   onSubmit={(year) => console.log("Year changed to:", year)}
 * />
 *
 * @returns {JSX.Element} A floating year input popover that allows changing the current year
 */

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
