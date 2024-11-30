import { FaSpinner } from "react-icons/fa";

const Spinner = ({
  size = 24,
  color = "text-white",
}: {
  size?: number;
  color?: string;
}) => {
  return (
    <div className="flex items-center justify-center">
      {/* Tailwind CSS spinner */}
      <FaSpinner
        className={`animate-spin ${color}`}
        style={{ fontSize: size }}
        aria-label="Loading spinner"
      />
    </div>
  );
};

export default Spinner;
