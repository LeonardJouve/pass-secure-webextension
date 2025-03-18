import React, {useState} from "react";
import {Button, Checkbox, Flex, Input, Slider, type CheckboxOptionType} from "antd";
import {Trans, useLingui} from "@lingui/react/macro";
import {EditOutlined, EyeInvisibleOutlined, EyeOutlined, SyncOutlined} from "@ant-design/icons";
import useModal from "antd/es/modal/useModal";

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

const generate = ({length}: GenerateOption): string => {
    const text = length + "123";
    return text;
};

const PasswordGenerator: React.FC = () => {
    const {t} = useLingui();
    const [overwriteModal, overwriteModalContext] = useModal();
    const [password, setPassword] = useState<string>("");
    const [isVisible, setIsVisible] = useState<boolean>(true);
    const [options, setOptions] = useState<GenerateOption>({
        length: 20,
        allow: {},
    });

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
