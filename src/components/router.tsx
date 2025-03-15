import React from "react";
import useRouter, {Route} from "../store/router";
import Login from "./auth/login";
import Register from "./auth/register";
import useAuth from "../store/auth";
import App from "./app";
import EditProfile from "./edit_profile";

const Router: React.FC = () => {
    const {current, clear} = useRouter();
    const {isLoggedIn} = useAuth();

    if (!isLoggedIn) {
        switch (current) {
        case Route.LOGIN:
            return <Login/>;
        case Route.REGISTER:
            return <Register/>;
        default:
            clear(Route.LOGIN);
            return null;
        }
    }

    switch (current) {
    case Route.MAIN:
        return <App/>;
    case Route.EDIT_PROFILE:
        return <EditProfile/>;
    default:
        clear(Route.MAIN);
        return null;
    }
};

export default Router;
