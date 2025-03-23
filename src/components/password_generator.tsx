import React, {forwardRef, useState} from "react";
import {Button, Checkbox, Flex, Input, message, Slider, type CheckboxOptionType, type InputRef} from "antd";
import {Trans, useLingui} from "@lingui/react/macro";
import {CopyOutlined, EditOutlined, EyeInvisibleOutlined, EyeOutlined, SyncOutlined} from "@ant-design/icons";
import useModal from "antd/es/modal/useModal";
import PasswordStrengthIndicator from "./password_strength_indicator";

type GenerateAllow = {
    uppercase?: boolean;
    number?: boolean;
    special?: boolean;
};

type AllowKey = keyof GenerateAllow;

type GenerateOption = {
    length: number;
    allow: GenerateAllow;
};

type Props = {
    password: string;
    setPassword: (password: string) => void;
    disabled?: boolean;
};

const generate = ({length, allow}: GenerateOption): string => {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const number = "0123456789";
    const special = "!@#$%^&*()-_=+[]{}|;:,.<>?";

    let characters = "abcdefghijklmnopqrstuvwxyz";
    if (allow.uppercase) characters += uppercase;
    if (allow.number) characters += number;
    if (allow.special) characters += special;

    return Array.from({length}, () => characters[crypto.getRandomValues(new Uint32Array(1))[0]! % characters.length]).join("");
};

const PasswordGenerator = forwardRef<InputRef, Props>(({password, setPassword, disabled}, ref) => {
    const [copyMessage, copyMessageContext] = message.useMessage();
    const {t} = useLingui();
    const [overwriteModal, overwriteModalContext] = useModal();
    const [isVisible, setIsVisible] = useState<boolean>(true);
    const [options, setOptions] = useState<GenerateOption>({
        length: 20,
        allow: {
            uppercase: true,
            number: true,
            special: true,
        },
    });

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => setPassword(e.currentTarget.value);

    const handleVisibility = (): void => setIsVisible(!isVisible);

    const handleLength = (value: number): void => setOptions({...options, length: value});

    const handleGenerate = (): void => {
        if (password) {
            overwriteModal.confirm({
                title: <Trans>Overwrite</Trans>,
                icon: <EditOutlined/>,
                content: <Trans>Are you sure you want to <strong>Overwrite</strong> current password</Trans>,
                okText: <Trans>Ok</Trans>,
                okType: "danger",
                okButtonProps: {type: "primary"},
                cancelText: <Trans>No</Trans>,
                onOk: () => setPassword(generate(options)),
            });
        } else {
            setPassword(generate(options));
        }
    };

    const handleCheck = (keys: AllowKey[]): void => setOptions({
        ...options,
        allow: keys.reduce<GenerateAllow>((acc, key) => {
            acc[key] = keys.includes(key);
            return acc;
        }, {}),
    });


    const handleCopyPassword = (): void => {
        navigator.clipboard.writeText(password);
        copyMessage.info(<Trans>Password copied !</Trans>);
    };

    const checkboxOptions: CheckboxOptionType<AllowKey>[] = [
        {
            label: <Trans>Uppercase</Trans>,
            value: "uppercase",
        },
        {
            label: <Trans>Number</Trans>,
            value: "number",
        },
        {
            label: <Trans>Special</Trans>,
            value: "special",
        },
    ];

    return (
        <Flex vertical={true}>
            <Input
                ref={ref}
                type={isVisible ? "text" : "password"}
                value={password}
                placeholder={t({message: "Password"})}
                onChange={handleChange}
                suffix={disabled ? (
                    <Button
                        type="dashed"
                        icon={<CopyOutlined/>}
                        onClick={handleCopyPassword}
                    />
                ) : (
                    <Flex gap="small">
                        <Button
                            icon={isVisible ? <EyeOutlined/> : <EyeInvisibleOutlined/>}
                            type="text"
                            onClick={handleVisibility}
                        />
                        <Button
                            icon={<SyncOutlined/>}
                            type="primary"
                            onClick={handleGenerate}
                        />
                    </Flex>
                )}
                disabled={disabled}
            />
            {disabled ? null : (
                <>
                    <PasswordStrengthIndicator password={password}/>
                    <Trans>Length: </Trans>{options.length}
                    <Slider
                        min={5}
                        max={35}
                        value={options.length}
                        onChange={handleLength}
                    />
                    <Checkbox.Group
                        options={checkboxOptions}
                        value={Object.keys(options.allow) as AllowKey[]}
                        onChange={handleCheck}
                    />
                </>
            )}
            {overwriteModalContext}
            {copyMessageContext}
        </Flex>
    );
});

export default PasswordGenerator;
