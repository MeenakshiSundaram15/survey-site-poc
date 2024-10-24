import { RemoveCircle } from "@mui/icons-material";

export const RemoveButton = ({ className = "", ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button className={`opacity-70 hover:scale-110 hover:opacity-100 transition-all ${className} disabled:opacity-10 disabled:pointer-events-none`} {...rest}>
    <RemoveCircle />
  </button>
);
