import React, {useState} from "react";
import {Alert, Button, Form, Input, Typography} from "antd";
import {LockOutlined, MailOutlined} from "@ant-design/icons";
import type {Rule} from "antd/es/form";
import {Trans, useLingui} from "@lingui/react/macro";
import useAuth from "../../store/auth";
import type {RegisterInput} from "../../api/auth";

type Props = {
    handleLogin: () => void;
};

const Register: React.FC<Props> = ({handleLogin}) => {
    const {t} = useLingui();
    const {register} = useAuth();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string|null>(null);

    const handleRegister = async (values: RegisterInput): Promise<void> => {
        setError(null);
        setIsLoading(true);
        const result = await register(values);
        setIsLoading(false);
        if (result.error) {
            setError(result.data.message);
        }
    };

    const confirmPassword: Rule = ({getFieldValue}) => ({
        validator: async (_, value): Promise<void> => {
            if (!value || getFieldValue("password") === value) {
                return await Promise.resolve();
            }
            return await Promise.reject(new Error(t({message: "Confirmation does not match"})));
        },
    });

    return (
        <Form
            name="register"
            onFinish={handleRegister}
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
            <Form.Item
                name="passwordConfirm"
                dependencies={["password"]}
                rules={[{required: true, message: t({message: "Confirm your Password"})}, confirmPassword]}
            >
                <Input.Password
                    prefix={<LockOutlined/>}
                    placeholder={t({message: "Confirm Password"})}
                />
            </Form.Item>
            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    loading={isLoading}
                >
                    <Trans>Register</Trans>
                </Button>
                <Trans>or</Trans>
                <Typography.Link onClick={handleLogin}>
                    <Trans>Log in now</Trans>
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

export default Register;
