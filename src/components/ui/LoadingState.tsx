interface LoadingStateProps {
  message?: string;
}

export default function LoadingState({
  message = "Loading...",
}: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-gray-500 p-6">
      <div className="animate-spin h-10 w-10 border-4 border-gray-300 border-t-blue-500 rounded-full mb-3"></div>
      <p>{message}</p>
    </div>
  );
}
