import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface RQFetchProps {
    queryKey: string[];
    queryLink: string;
}
    
const useRQFetch = ({queryKey, queryLink}:RQFetchProps) => {
    const { data, error, isPending: loading } = useQuery({
        queryKey: queryKey,
        queryFn: async () => {
            const { data } = await axios.get(queryLink);
            return data
        },
    });

    return { data, error, loading };
}

export default useRQFetch;