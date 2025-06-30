"use client";

import { RefObject, useCallback, useEffect, useRef } from "react";

export function Menu({
  open,
  children,
  closeFn,
}: {
  open: boolean;
  children: React.ReactNode;
  closeFn: () => void;
}) {
  const menu = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      menu.current?.focus();
    }
  }, [open]);

  if (!open) return;

  return (
    <ChildrenBlur
      ref={menu}
      className="bg-popover absolute right-0 h-fit w-64 origin-top-right overflow-clip rounded-lg border p-1 shadow-sm"
      onBlur={() => closeFn()}
    >
      {children}
      {/* {menuItems.map((item, index) => {
        return <div key={index}>item</div>;
      })} */}
    </ChildrenBlur>
  );
}

export function MenuItem({
  icon,
  content,
  fn,
}: {
  icon: React.ReactNode;
  content: React.ReactNode;
  fn: () => void;
}) {
  return (
    <button
      className="hover:bg-foreground/10 flex h-12 w-full flex-row place-items-center gap-2 px-2 transition-all duration-150"
      onClick={fn}
    >
      {icon}
      {content}
    </button>
  );
}

function ChildrenBlur({
  children,
  onBlur,
  className,
  ref,
}: {
  children: React.ReactNode;
  onBlur: () => void;
  className: string;
  ref: RefObject<HTMLDivElement | null>;
}) {
  const handleBlur = useCallback(
    (event: any) => {
      const currentTarget = event.currentTarget;

      // Give browser time to focus the next element
      requestAnimationFrame(() => {
        // Check if the new focused element is a child of the original container
        if (!currentTarget.contains(document.activeElement)) {
          onBlur();
        }
      });
    },
    [onBlur],
  );

  return (
    <div ref={ref} tabIndex={-1} className={className} onBlur={handleBlur}>
      {children}
    </div>
  );
}
