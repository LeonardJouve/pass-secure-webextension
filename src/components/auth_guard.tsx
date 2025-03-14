import React from "react";
import useAuth from "../store/auth";
import Auth from "./auth";

const AuthGuard: React.FC<React.PropsWithChildren> = ({children}) => {
    const {isLoggedIn} = useAuth();

    if (!isLoggedIn) {
        return <Auth/>;
    }

    return (
        <>
            {children}
        </>
    );
};

export default AuthGuard;
