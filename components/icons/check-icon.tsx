export default function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      className={className}
    >
      <path d="M0 0h20v20H0z" fill="none" />
      <path
        d="M17.293 0 6.767 12.526 1.926 8.443 0 10.726l7.128 6.013L19.58 1.922z"
        transform="translate(0 1)"
        fill="currentColor"
      />
    </svg>
  );
}
