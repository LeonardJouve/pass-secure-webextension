import React, {useEffect} from "react";
import {message} from "antd";
import useError from "../store/error";

const ErrorToast: React.FC<React.PropsWithChildren> = ({children}) => {
    const {error} = useError();
    const [errorMessage, errorMessageContext] = message.useMessage();

    useEffect(() => {
        if (error) {
            errorMessage.error(error);
        }
    }, [error]);

    return (
        <>
            {children}
            {errorMessageContext}
        </>
    );
};

export default ErrorToast;
