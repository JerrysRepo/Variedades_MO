type AnnouncementBarProps = {
  enabled: boolean;
  text: string;
};

export function AnnouncementBar({ enabled, text }: AnnouncementBarProps) {
  if (!enabled || !text) return null;

  return (
    <div className="announcement-bar" role="status">
      <span aria-hidden="true">✦</span>
      <p>{text}</p>
      <span aria-hidden="true">✦</span>
    </div>
  );
}
