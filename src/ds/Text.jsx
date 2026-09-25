export function TextTitleHero({ children, className = "", as: Tag = "h1", style }) {
  return <Tag className={className} style={{ font: "var(--thryv-font-title-hero)", color: "var(--thryv-color-text-default-default)", ...style }}>{children}</Tag>;
}
export function TextTitlePage({ children, className = "", as: Tag = "h2", style }) {
  return <Tag className={className} style={{ font: "var(--thryv-font-title-page)", color: "var(--thryv-color-text-default-default)", ...style }}>{children}</Tag>;
}
export function TextSubtitle({ children, className = "", as: Tag = "p", style }) {
  return <Tag className={className} style={{ font: "var(--thryv-font-subtitle)", color: "var(--thryv-color-text-default-secondary)", ...style }}>{children}</Tag>;
}
export function TextHeading({ children, className = "", as: Tag = "h3", style }) {
  return <Tag className={className} style={{ font: "var(--thryv-font-heading)", color: "var(--thryv-color-text-default-default)", ...style }}>{children}</Tag>;
}
export function TextSubheading({ children, className = "", as: Tag = "p", style }) {
  return <Tag className={className} style={{ font: "var(--thryv-font-subheading)", color: "var(--thryv-color-text-default-secondary)", ...style }}>{children}</Tag>;
}
export function Text({ children, className = "", style }) {
  return <p className={className} style={{ font: "var(--thryv-font-body-base)", color: "var(--thryv-color-text-default-default)", lineHeight: 1.6, ...style }}>{children}</p>;
}
export function TextStrong({ children, className = "", style }) {
  return <strong className={className} style={{ font: "var(--thryv-font-body-strong)", ...style }}>{children}</strong>;
}
export function TextSmall({ children, className = "", style }) {
  return <small className={className} style={{ font: "var(--thryv-font-body-small)", color: "var(--thryv-color-text-default-secondary)", ...style }}>{children}</small>;
}
export function TextEmphasis({ children, className = "", style }) {
  return <em className={className} style={{ font: "var(--thryv-font-body-emphasis)", ...style }}>{children}</em>;
}
export function TextCaption({ children, className = "", style }) {
  return (
    <span className={className} style={{ font: "var(--thryv-font-caption)", color: "var(--thryv-color-text-default-tertiary)", textTransform: "uppercase", letterSpacing: "0.04em", ...style }}>
      {children}
    </span>
  );
}
