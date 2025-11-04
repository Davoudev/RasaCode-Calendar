//external dependencies
import { useState } from "react";
import {
  flip,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
} from "@floating-ui/react";
//external types dependencies
//internal dependencies
//internal types dependencies
import type { PopoverYearInputProps } from "../type/type";

/**
 * A popover component for selecting a year from a list of nearby years.
 * Displays the current year, and when clicked, opens a floating panel
 * showing several years before and after the current one.
 *
 * The user can choose any year from the list, which triggers the `onSubmit`
 * callback and closes the popover automatically.
 *
 * Uses Floating UI for positioning, click, and dismiss interactions.
 *
 * @param currentYear - The currently displayed year
 * @param onSubmit - Callback function called with the selected year
 * @returns A clickable popover year selector element
 */

const PopoverYearInput = ({ currentYear, onSubmit }: PopoverYearInputProps) => {
  const [open, setOpen] = useState(false);

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

  const handleSelect = (year: number) => {
    onSubmit(year);
    setOpen(false);
  };

  const years = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);

  return (
    <>
      <span
        ref={refs.setReference}
        {...getReferenceProps()}
        style={{ cursor: "pointer" }}
      >
        {currentYear}
      </span>

      {open && (
        <div
          ref={refs.setFloating}
          style={{
            ...floatingStyles,
            background: "white",
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "8px",
          }}
          {...getFloatingProps()}
        >
          {years.map((year) => (
            <button
              key={year}
              onClick={() => handleSelect(year)}
              style={{
                background: year === currentYear ? "#0070f3" : "#f3f3f3",
                color: year === currentYear ? "white" : "black",
                border: "none",
                borderRadius: "6px",
                padding: "4px 8px",
                cursor: "pointer",
              }}
            >
              {year}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default PopoverYearInput;
