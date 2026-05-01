import type { ReactNode } from "react";

type IconWrapperProps = {
  link?: string;
  dashed?: boolean;
  children?: ReactNode;
};

const IconWrapper = ({ link, dashed, children }: IconWrapperProps) => {
  return (
    <div
      className={`rounded-full border border-black dark:border-white ${
        dashed ? "border-dashed" : "border-solid"
      }`}
    >
      <button
        type="button"
        onClick={() => {
          if (link) {
            window.open(link, "_blank", "noopener,noreferrer");
          }
        }}
        className="flex h-12 w-12 items-center justify-center rounded-full transition-all duration-200 hover:scale-110 hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-black/30 dark:hover:bg-white dark:hover:text-black dark:focus:ring-white/40"
      >
        {children}
      </button>
    </div>
  );
};

export default IconWrapper;
