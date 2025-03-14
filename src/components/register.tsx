import React from "react";
import {Button} from "antd";
import {Trans} from "@lingui/react/macro";
import useAuth from "../store/auth";

type Props = {
    handleLogin: () => void;
};

const Register: React.FC<Props> = ({handleLogin}) => {
    const {register} = useAuth();

    const handleRegister = (): void => {
        register({
            email: "",
            password: "",
            passwordConfirm: "",
        });
    };

    return (
        <div>
            <Button type="primary" onClick={handleRegister}>
                <Trans>Register</Trans>
            </Button>
            <Button type="link" onClick={handleLogin}>
                <Trans>Login</Trans>
            </Button>
        </div>
    );
};

export default Register;
