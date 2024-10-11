import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => {
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
});

export function useFetch<T>(url: string) {
  const { data, error, isLoading } = useSWR<T>(`${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`, fetcher);
  return {
    data,
    error,
    isLoading,
  };
}