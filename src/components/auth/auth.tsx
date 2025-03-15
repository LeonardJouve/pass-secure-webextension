import React, {useState} from "react";
import Login from "./login";
import Register from "./register";
import "./auth.css";

enum State {
    REGISTER,
    LOGIN,
}

const Auth: React.FC = () => {
    const [state, setState] = useState<State>(State.LOGIN);

    return (
        <div>
            {state === State.LOGIN ?
                <Login handleRegister={() => setState(State.REGISTER)}/> :
                <Register handleLogin={() => setState(State.LOGIN)}/>
            }
        </div>
    );
};

export default Auth;
