import "./badge.scss";

interface CommonBadgeType {
  text: string;
  badgeStatus?: "dark" | "light";
}

function Badge({ text, badgeStatus }: CommonBadgeType) {
  return <span className={`common-badge ${badgeStatus}`}>{text}</span>;
}

Badge.defaultProps = {
  badgeStatus: "dark",
};

export default Badge;
