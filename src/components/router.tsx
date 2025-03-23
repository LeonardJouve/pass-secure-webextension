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
import EditFolder from "./edit_folder";

const COMPONENTS: Record<Status, Partial<Record<Route, React.FC>>> = {
    [Status.DISCONNECTED]: {
        [Route.LOGIN]: Login,
        [Route.REGISTER]: Register,
    },
    [Status.LOCKED]: {
        [Route.UNLOCK]: Unlock,
    },
    [Status.CONNECTED]: {
        [Route.MAIN]: App,
        [Route.EDIT_PROFILE]: EditProfile,
        [Route.CREATE_FOLDER]: CreateFolder,
        [Route.CREATE_ENTRY]: CreateEntry,
        [Route.EDIT_FOLDER]: EditFolder,
        [Route.ENTRY_VIEW]: EntryView,
    },
};

const Router: React.FC = () => {
    const {current, clear} = useRouter();
    const {status} = useAuth();

    useEffect(() => {
        if (!COMPONENTS[status][current.route]) {
            const [fallbackRoute] = Object.keys(COMPONENTS[status]);
            if (fallbackRoute) {
                clear(Number(fallbackRoute));
            }
        }
    }, [status]);

    const Component: React.FC|undefined = COMPONENTS[status][current.route];
    return Component ? <Component/> : null;
};

export default Router;
