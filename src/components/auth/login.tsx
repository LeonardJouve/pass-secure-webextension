import React, {useState} from "react";
import {Alert, Button, Form, Input, Typography} from "antd";
import {LockOutlined, MailOutlined} from "@ant-design/icons";
import {Trans, useLingui} from "@lingui/react/macro";
import useAuth from "../../store/auth";
import type {LoginInput} from "../../api/auth";

type Props = {
    handleRegister: () => void;
};

const Login: React.FC<Props> = ({handleRegister}) => {
    const {t} = useLingui();
    const {login} = useAuth();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string|null>(null);

    const handleLogin = async (values: LoginInput): Promise<void> => {
        setError(null);
        setIsLoading(true);
        const result = await login(values);
        setIsLoading(false);
        if (result.error) {
            setError(result.data.message);
        }
    };

    return (
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
            {error !== null ? (
                <Alert
                    type="error"
                    showIcon={true}
                    message={error}
                />
            ) : null}
        </Form>
    );
};

export default Login;
