export default function HorizontalScrollContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="overflow-x-auto">{children}</div>;
}
