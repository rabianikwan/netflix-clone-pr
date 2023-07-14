import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import {relativizeURL} from "next/dist/shared/lib/router/utils/relativize-url";

const useCurrentUser = () => {
    const { data, error, isLoading, mutate } = useSWR('/api/current', fetcher)
    return {
        data,
        error,
        isLoading,
        mutate
    }
}

export default useCurrentUser;
