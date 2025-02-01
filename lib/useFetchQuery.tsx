import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface FetchQueryProps {
    queryKey: string[];
    queryLink: string;
}

const useFetchQuery = ({ queryKey, queryLink }:FetchQueryProps) => {
    const { data, error, isPending: loading } = useQuery({
        queryKey: queryKey,
        queryFn: async () => {
            const { data } = await axios.get(queryLink);
            return data
        },
    });

    return { data, error, loading };
}

export default useFetchQuery;