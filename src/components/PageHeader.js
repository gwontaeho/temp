export const PageHeader = ({ title, description }) => {
  return (
    <div className="p-4 space-y-1 bg-card">
      {title && <div className="text-xl font-semibold">{title}</div>}
      {description && <p>{description}</p>}
    </div>
  );
};
