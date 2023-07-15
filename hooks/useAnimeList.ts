import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useAnimeList = () => {
    const { data, error, isLoading } = useSWR('api/animes', fetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        revalidateIfStale: false
    })

    return {
        data,
        error,
        isLoading
    }
};

export default useAnimeList;
