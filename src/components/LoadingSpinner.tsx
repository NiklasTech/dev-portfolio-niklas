import { useTranslation } from "../hooks/useTranslation";

export function LoadingSpinner() {
  const { t, error } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-gray-400">{error ? t("error") : t("loading")}</p>
      {error && (
        <p className="text-red-400 mt-2 text-sm max-w-md text-center px-4">
          {error}
        </p>
      )}
    </div>
  );
}
