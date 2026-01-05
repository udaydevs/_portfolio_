"use client"
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const iconBtn =
  "w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black";

export default function Back({ onBack }: { onBack: () => void }) {
  return (
    <div className="bg-transparent w-fit">
      <button onClick={onBack} className={iconBtn}>
        <ArrowBackIcon fontSize="large" />
      </button>
    </div>
  );
}
