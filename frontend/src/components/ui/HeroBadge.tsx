interface HeroBadgeProps {
  text: string;
}

export default function HeroBadge({
  text,
}: HeroBadgeProps) {
  return (
    <span className="heroBadge">
      {text}
    </span>
  );
}
