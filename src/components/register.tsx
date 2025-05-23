import React, {useRef, useState} from "react";
import {Button, Flex, Form, Input, Typography, type InputRef} from "antd";
import {LockOutlined, MailOutlined} from "@ant-design/icons";
import type {Rule} from "antd/es/form";
import {Trans, useLingui} from "@lingui/react/macro";
import {useRegister} from "../store/auth";
import useRouter, {Route} from "../store/router";
import type {RegisterInput} from "../api/auth";
import LocalePicker from "./locale_picker";
import PasswordStrengthIndicator from "./password_strength_indicator";
import type {OkResponse} from "../api/api";

const Register: React.FC = () => {
    const {t} = useLingui();
    const register = useRegister();
    const {push} = useRouter();
    const [password, setPassword] = useState<string>("");
    const passwordInputRef = useRef<InputRef>(null);

    const handleRegister = async (values: RegisterInput): Promise<OkResponse> => await register.mutateAsync(values);

    const handleLogin = (): void => push(Route.LOGIN);

    const confirmPassword: Rule = ({getFieldValue}) => ({
        validator: async (_, value): Promise<void> => {
            if (!value || getFieldValue("password") === value) {
                return await Promise.resolve();
            }
            return await Promise.reject(new Error(t({message: "Password confirmation does not match"})));
        },
    });

    const handleChange = (e: React.FormEvent<HTMLFormElement>): void => {
        if (e.target === passwordInputRef.current?.input) {
            setPassword(passwordInputRef.current.input.value);
        }
    };

    return (
        <Flex>
            <LocalePicker/>
            <Form
                name="register"
                onFinish={handleRegister}
                onChange={handleChange}
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
                        ref={passwordInputRef}
                    />
                    <PasswordStrengthIndicator password={password}/>
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
                    >
                        <Trans>Register</Trans>
                    </Button>
                    <Trans>or</Trans>
                    <Typography.Link onClick={handleLogin}>
                        <Trans>Log in now</Trans>
                    </Typography.Link>
                </Form.Item>
            </Form>
        </Flex>
    );
};

export default Register;
