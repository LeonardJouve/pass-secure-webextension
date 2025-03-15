import React from "react";
import useRouter, {Route} from "../store/router";
import Login from "./auth/login";
import Register from "./auth/register";
import useAuth from "../store/auth";
import App from "./app";
import EditProfile from "./edit_profile";
import CreateEntry from "./create_entry";
import CreateFolder from "./create_folder";

const Router: React.FC = () => {
    const {current, clear} = useRouter();
    const {isLoggedIn} = useAuth();

    if (!isLoggedIn) {
        switch (current.route) {
        case Route.LOGIN:
            return <Login/>;
        case Route.REGISTER:
            return <Register/>;
        default:
            clear(Route.LOGIN);
            return null;
        }
    }

    switch (current.route) {
    case Route.MAIN:
        return <App/>;
    case Route.EDIT_PROFILE:
        return <EditProfile/>;
    case Route.CREATE_FOLDER:
        return <CreateFolder/>;
    case Route.CREATE_ENTRY:
        return <CreateEntry/>;
    default:
        clear(Route.MAIN);
        return null;
    }
};

export default Router;
