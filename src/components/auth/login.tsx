import React, {useState} from "react";
import {Button, Flex, Form, Input, Typography, message} from "antd";
import {LockOutlined, MailOutlined} from "@ant-design/icons";
import {Trans, useLingui} from "@lingui/react/macro";
import useAuth from "../../store/auth";
import useRouter, {Route} from "../../store/router";
import type {LoginInput} from "../../api/auth";
import LocalePicker from "../locale_picker";

const Login: React.FC = () => {
    const {t} = useLingui();
    const [errorMessage, errorMessageContext] = message.useMessage();
    const {login} = useAuth();
    const {push} = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleLogin = async (values: LoginInput): Promise<void> => {
        setIsLoading(true);
        const result = await login(values);
        setIsLoading(false);
        if (result.error) {
            errorMessage.open({
                type: "error",
                content: result.data.message,
            });
        }
    };

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
                        loading={isLoading}
                    >
                        <Trans>Log in</Trans>
                    </Button>
                    <Trans>or</Trans>
                    <Typography.Link onClick={handleRegister}>
                        <Trans>Register now</Trans>
                    </Typography.Link>
                </Form.Item>
            </Form>
            {errorMessageContext}
        </Flex>
    );
};

export default Login;
