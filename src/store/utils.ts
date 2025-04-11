import {useEffect} from "react";
import type {UseQueryResult} from "@tanstack/react-query";
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
