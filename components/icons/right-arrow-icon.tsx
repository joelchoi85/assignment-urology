interface RightArrowIconProps {
  className?: string;
  size?: number;
  color?: string;
  opacity?: number;
}

export default function RightArrowIcon({
  className,
  size = 57,
  color = "#fff",
  opacity = 0.4,
}: RightArrowIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 57 57"
      className={className}
    >
      <path
        data-name="패스 8044"
        d="M-22110.5-10957.562h53.813l-17.937-17.937"
        transform="translate(22110.5 10995)"
        stroke={color}
        strokeWidth="2"
        opacity={opacity}
        fill="none"
      />
      <path data-name="사각형 11758" fill="none" d="M0 0h57v57H0z" />
    </svg>
  );
}
