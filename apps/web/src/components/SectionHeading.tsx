type SectionHeadingProps = {
  align?: 'left' | 'center';
  description?: string;
  eyebrow: string;
  id?: string;
  title: string;
};

export function SectionHeading({
  align = 'left',
  description,
  eyebrow,
  id,
  title,
}: SectionHeadingProps) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id}>{title}</h2>
      {description ? <p className="section-heading__description">{description}</p> : null}
    </div>
  );
}
