import clsx from "clsx";

export default function Card({ ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={clsx(
        "bg-surface border-2 border-surface-border rounded-lg shadow-lg p-4 min-h-20 w-full"
      )}
      {...props}
    ></div>
  );
}
