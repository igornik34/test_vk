import { RefObject } from "react";

export const setCursorPosition = (
  text: string,
  ref: RefObject<HTMLTextAreaElement>
) => {
  if (ref.current !== null && ref.current !== undefined) {
    const firstSpaceIndex = text.indexOf(" ");
    if (firstSpaceIndex !== -1) {
      ref.current.setSelectionRange(firstSpaceIndex, firstSpaceIndex);
      ref.current.focus();
    }
  }
};
