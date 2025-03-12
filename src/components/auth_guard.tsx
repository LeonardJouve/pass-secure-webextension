import React from "react";
import useAuth from "../store/auth";

const AuthGuard: React.FC<React.PropsWithChildren> = ({children}) => {
    const {isLoggedIn} = useAuth();

    if (!isLoggedIn) {
        return null;
    }

    return (
        <>
            {children}
        </>
    );
};

export default AuthGuard;
