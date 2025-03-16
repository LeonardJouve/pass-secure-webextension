import React, {useState} from "react";
import {Button, Flex, Form, Input, message, Typography} from "antd";
import {LockOutlined, MailOutlined} from "@ant-design/icons";
import type {Rule} from "antd/es/form";
import {Trans, useLingui} from "@lingui/react/macro";
import useAuth from "../store/auth";
import useRouter, {Route} from "../store/router";
import type {RegisterInput} from "../api/auth";
import LocalePicker from "./locale_picker";

const Register: React.FC = () => {
    const {t} = useLingui();
    const [errorMessage, errorMessageContext] = message.useMessage();
    const {register} = useAuth();
    const {push} = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleRegister = async (values: RegisterInput): Promise<void> => {
        setIsLoading(true);
        const result = await register(values);
        setIsLoading(false);
        if (result.error) {
            errorMessage.open({
                type: "error",
                content: result.data.message,
            });
        }
    };

    const handleLogin = (): void => push(Route.LOGIN);

    const confirmPassword: Rule = ({getFieldValue}) => ({
        validator: async (_, value): Promise<void> => {
            if (!value || getFieldValue("password") === value) {
                return await Promise.resolve();
            }
            return await Promise.reject(new Error(t({message: "Confirmation does not match"})));
        },
    });

    return (
        <Flex>
            <LocalePicker/>
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
                {errorMessageContext}
            </Form>
        </Flex>
    );
};

export default Register;
