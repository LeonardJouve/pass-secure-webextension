import React from "react";
import {Button, Flex, Form, Input, Typography} from "antd";
import {LockOutlined, MailOutlined} from "@ant-design/icons";
import {Trans, useLingui} from "@lingui/react/macro";
import {useLogin} from "../store/auth";
import useRouter, {Route} from "../store/router";
import type {LoginInput, LoginResponse} from "../api/auth";
import LocalePicker from "./locale_picker";

const Login: React.FC = () => {
    const {t} = useLingui();
    const login = useLogin();
    const {push} = useRouter();

    const handleLogin = async (values: LoginInput): Promise<LoginResponse> => await login.mutateAsync(values);

    const handleRegister = (): void => push(Route.REGISTER);

    return (
        <Flex>
            <LocalePicker/>
            <Form
                name="login"
                onFinish={handleLogin}
            >
                <Form.Item
                    name="email"
                    rules={[{required: true, message: t({message: "Input your Email"})}]}
                >
                    <Input
                        prefix={<MailOutlined/>}
                        type="email"
                        placeholder={t({message: "Email"})}
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{required: true, message: t({message: "Input your Password"})}]}
                >
                    <Input.Password
                        prefix={<LockOutlined/>}
                        placeholder={t({message: "Password"})}
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                    >
                        <Trans>Log in</Trans>
                    </Button>
                    <Trans>or</Trans>
                    <Typography.Link onClick={handleRegister}>
                        <Trans>Register now</Trans>
                    </Typography.Link>
                </Form.Item>
            </Form>
        </Flex>
    );
};

export default Login;
