export interface ButtonProps {
  onClick?: () => void;
  color?: `btn-${string}`;
  children: React.ReactNode;
}

export function Button({
  onClick,
  color = "btn-primary",
  children,
}: ButtonProps) {
  return (
    <button type="button" className={`btn ${color}`} onClick={onClick}>
      {children}
    </button>
  );
}
