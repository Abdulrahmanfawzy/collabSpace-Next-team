import type { ReactNode } from "react";

interface ServerDataFetcherProps<T> {
  fetcherFn: () => Promise<T>;
  children: (payload: T) => ReactNode;
  errorFallback?: (error: unknown) => ReactNode;
}

export default async function ServerDataFetcher<T>({
  fetcherFn,
  children,
  errorFallback,
}: ServerDataFetcherProps<T>) {
  try {
    const payload = await fetcherFn();
    return <>{children(payload)}</>;
  } catch (error) {
    if (errorFallback) {
      return <>{errorFallback(error)}</>;
    }

    throw error;
  }
}