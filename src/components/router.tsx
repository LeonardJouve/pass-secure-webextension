import React, {useEffect} from "react";
import useRouter, {Route} from "../store/router";
import Login from "./login";
import Register from "./register";
import useAuth, {Status} from "../store/auth";
import App from "./app";
import EditProfile from "./edit_profile";
import CreateEntry from "./create_entry";
import CreateFolder from "./create_folder";
import EntryView from "./entry_view";
import Unlock from "./unlock";

const AUTH_ROUTES: Partial<Record<Route, React.FC>> = {
    [Route.LOGIN]: Login,
    [Route.REGISTER]: Register,
};

const LOCKED_ROUTES: Partial<Record<Route, React.FC>> = {
    [Route.UNLOCK]: Unlock,
};

const MAIN_ROUTES: Partial<Record<Route, React.FC>> = {
    [Route.MAIN]: App,
    [Route.EDIT_PROFILE]: EditProfile,
    [Route.CREATE_FOLDER]: CreateFolder,
    [Route.CREATE_ENTRY]: CreateEntry,
    [Route.ENTRY_VIEW]: EntryView,
};

const Router: React.FC = () => {
    const {current, clear} = useRouter();
    const {status} = useAuth();

    useEffect(() => {
        switch (status) {
        case Status.DISCONNECTED:
            if (!AUTH_ROUTES[current.route]) {
                clear(Route.LOGIN);
            }
            break;
        case Status.LOCKED:
            if (!LOCKED_ROUTES[current.route]) {
                clear(Route.UNLOCK);
            }
            break;
        case Status.CONNECTED:
            if (!MAIN_ROUTES[current.route]) {
                clear(Route.MAIN);
            }
            break;
        }
    }, [status]);

    let Component: React.FC|undefined;
    switch (status) {
    case Status.DISCONNECTED:
        Component = AUTH_ROUTES[current.route];
        break;
    case Status.LOCKED:
        Component = LOCKED_ROUTES[current.route];
        break;
    case Status.CONNECTED:
        Component = MAIN_ROUTES[current.route];
        break;
    }

    return Component ? <Component/> : null;
};

export default Router;
