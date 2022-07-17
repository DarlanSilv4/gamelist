import { useEffect, useRef } from "react";

function useClickOutside<T extends Node>(closeHandler: Function) {
  const domNode = useRef<T | null>(null);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      const isClickingOutside = !domNode.current?.contains(
        event.target as Node
      );

      if (isClickingOutside) closeHandler();
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return domNode;
}

export default useClickOutside;
