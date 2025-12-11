interface ErrorStateProps {
  message: string;
}

export default function ErrorState({ message }: ErrorStateProps) {
  return (
    <div className="text-center text-red-600 p-6">
      <p>Error: {message}</p>
    </div>
  );
}
