import React, {useEffect, useState} from "react";
import {Button, Checkbox, Flex, Input, Slider, type CheckboxOptionType} from "antd";
import {Trans, useLingui} from "@lingui/react/macro";
import {EditOutlined, EyeInvisibleOutlined, EyeOutlined, SyncOutlined} from "@ant-design/icons";
import useModal from "antd/es/modal/useModal";

enum PasswordStrength {
    UNSAFE,
    WEAK,
    MEDIUM,
    STRONG,
    VERY_STRONG,
}

const PASSWORD_STRENGTH_COLORS: Record<PasswordStrength, string> = {
    [PasswordStrength.UNSAFE]: "#ff4d4f",
    [PasswordStrength.WEAK]: "#ff7a45",
    [PasswordStrength.MEDIUM]: "#faad14",
    [PasswordStrength.STRONG]: "#52c41a",
    [PasswordStrength.VERY_STRONG]: "#1890ff"
};

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

const getPasswordStrength = async (password: string): Promise<PasswordStrength> => {
    const zxcvbn = (await import("zxcvbn")).default;
    const score = zxcvbn(password).guesses_log10;
    switch (true) {
    case score < 6:
        return PasswordStrength.UNSAFE;
    case score < 10:
        return PasswordStrength.WEAK;
    case score < 14:
        return PasswordStrength.MEDIUM;
    case score < 20:
        return PasswordStrength.STRONG;
    default:
        return PasswordStrength.VERY_STRONG;
    }
}

const PasswordGenerator: React.FC = () => {
    const {t} = useLingui();
    const [overwriteModal, overwriteModalContext] = useModal();
    const [password, setPassword] = useState<string>("");
    const [isVisible, setIsVisible] = useState<boolean>(true);
    const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>(PasswordStrength.UNSAFE);
    const [options, setOptions] = useState<GenerateOption>({
        length: 20,
        allow: {
            uppercase: true,
            number: true,
            special: true,
        },
    });

    useEffect(() => {
        getPasswordStrength(password).then(setPasswordStrength);
    }, [password]);

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => setPassword(e.currentTarget.value);

    const handleVisibility = (): void => setIsVisible(!isVisible);

    const handleLength = (value: number): void => setOptions({...options, length: value});

    const handleGenerate = (): void => {
        if (password) {
            overwriteModal.confirm({
                title: <Trans>Overwrite</Trans>,
                icon: <EditOutlined/>,
                content: <Trans>Are you sure you want to <strong>Overwrite</strong> current Password</Trans>,
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

    let PasswordIndicator: React.ReactNode;
    switch (passwordStrength) {
    case PasswordStrength.UNSAFE:
        PasswordIndicator = <Trans>Unsafe</Trans>;
        break;
    case PasswordStrength.WEAK:
        PasswordIndicator = <Trans>Weak</Trans>;
        break;
    case PasswordStrength.MEDIUM:
        PasswordIndicator = <Trans>Medium</Trans>;
        break;
    case PasswordStrength.STRONG:
        PasswordIndicator = <Trans>Strong</Trans>;
        break;
    case PasswordStrength.VERY_STRONG:
        PasswordIndicator = <Trans>Very Strong</Trans>;
        break;
    }

    return (
        <Flex vertical={true}>
            <Input
                type={isVisible ? "text" : "password"}
                value={password}
                placeholder={t({message: "Password"})}
                onChange={handleChange}
                suffix={(
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
            />
            <span style={{color: PASSWORD_STRENGTH_COLORS[passwordStrength]}}>
                {PasswordIndicator}
            </span>
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
            {overwriteModalContext}
        </Flex>
    );
};

export default PasswordGenerator;
