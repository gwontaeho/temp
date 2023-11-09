import { useRef, useEffect } from "react";

export const Collapse = ({ children, open }) => {
  const outer = useRef();
  const inner = useRef();

  useEffect(() => {
    if (open) {
      outer.current.classList.add("transition-[height]");
      outer.current.style.height = `${inner.current.clientHeight}px`;
    } else outer.current.style.height = 0;
  }, [open]);

  useEffect(() => {
    const ro = new ResizeObserver((entries) => {
      requestAnimationFrame(() => {
        entries.forEach((value) => {
          if (outer.current.ariaExpanded === "false") return;
          outer.current.classList.remove("transition-[height]");
          outer.current.style.height = `${value.contentRect.height}px`;
          setTimeout(() => {
            outer.current.classList.add("transition-[height]");
          }, 150);
        });
      });
    });
    ro.observe(inner.current);

    return () => {
      ro.disconnect();
    };
  }, []);

  return (
    <div ref={outer} aria-expanded={open} className="overflow-hidden">
      <div ref={inner}>{children}</div>
    </div>
  );
};
