import React, {useEffect} from "react";
import useRouter, {Route} from "../store/router";
import Login from "./login";
import Register from "./register";
import useAuth from "../store/auth";
import App from "./app";
import EditProfile from "./edit_profile";
import CreateEntry from "./create_entry";
import CreateFolder from "./create_folder";
import EntryView from "./entry_view";
import Unlock from "./unlock";

const AUTH_ROUTES = [
    Route.LOGIN,
    Route.REGISTER,
];

const LOCKED_ROUTES = [
    Route.UNLOCK,
];

const MAIN_ROUTES = [
    Route.MAIN,
    Route.EDIT_PROFILE,
    Route.CREATE_FOLDER,
    Route.CREATE_ENTRY,
    Route.ENTRY_VIEW,
];

const Router: React.FC = () => {
    const {current, clear} = useRouter();
    const {isLoggedIn, isLocked} = useAuth();

    useEffect(() => {
        if (!isLoggedIn && !AUTH_ROUTES.includes(current.route)) {
            clear(Route.LOGIN);
        }
        if (isLoggedIn && isLocked && !LOCKED_ROUTES.includes(current.route)) {
            clear(Route.UNLOCK);
        }
        if (isLoggedIn && !isLocked && !MAIN_ROUTES.includes(current.route)) {
            clear(Route.MAIN);
        }
    }, [isLoggedIn]);

    if (!isLoggedIn) {
        switch (current.route) {
        case Route.LOGIN:
            return <Login/>;
        case Route.REGISTER:
            return <Register/>;
        default:
            return null;
        }
    }

    if (isLocked) {
        switch (current.route) {
        case Route.UNLOCK:
            return <Unlock/>;
        default:
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
    case Route.ENTRY_VIEW:
        return <EntryView/>;
    default:
        return null;
    }
};

export default Router;
