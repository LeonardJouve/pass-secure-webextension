import {useEffect} from "react";
import {useQueryClient, type UseQueryResult} from "@tanstack/react-query";
import useError from "./error";

export const useQueryError = <T>(query: UseQueryResult<T>): UseQueryResult<T> => {
    const {setError} = useError();

    useEffect(() => {
        if (query.isError) {
            setError(query.error.message);
        }
    }, [query.isError, setError]);

    return query;
};

export const useQueryCache = <T extends {id: number}>(query: UseQueryResult<T[]>, key: string): UseQueryResult<T[]> => {
    const queryClient = useQueryClient();

    useEffect(() => {
        if (query.data) {
            query.data.forEach((data) => queryClient.setQueryData<T>([key, data.id], data));
        }
    }, [query.data]);

    return query;
};
