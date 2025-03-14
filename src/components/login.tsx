import React from "react";
import {Button} from "antd";
import {Trans} from "@lingui/react/macro";
import useAuth from "../store/auth";

type Props = {
    handleRegister: () => void;
};

const Login: React.FC<Props> = ({handleRegister}) => {
    const {login} = useAuth();

    const handleLogin = (): void => {
        login({
            email: "",
            password: "",
        });
    };

    return (
        <div>
            <Button type="primary" onClick={handleLogin}>
                <Trans>Login</Trans>
            </Button>
            <Button type="link" onClick={handleRegister}>
                <Trans>Register</Trans>
            </Button>
        </div>
    );
};

export default Login;
