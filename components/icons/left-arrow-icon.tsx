interface LeftArrowIconProps {
  className?: string;
  size?: number;
  color?: string;
  opacity?: number;
}

export default function LeftArrowIcon({
  className,
  size = 57,
  color = "#fff",
  opacity = 0.4,
}: LeftArrowIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 57 57"
      className={className}
    >
      <path
        data-name="패스 8045"
        d="M-22056.687-10957.562h-53.812l17.938-17.937"
        transform="translate(22113.688 10995)"
        stroke={color}
        strokeWidth="2"
        opacity={opacity}
        fill="none"
      />
      <path data-name="사각형 11759" fill="none" d="M0 0h57v57H0z" />
    </svg>
  );
}
