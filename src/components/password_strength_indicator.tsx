import React, {useEffect, useState} from "react";
import {Trans} from "@lingui/react/macro";

enum PasswordStrength {
    UNSAFE,
    WEAK,
    MEDIUM,
    STRONG,
    VERY_STRONG,
}

type Props = {
    password: string;
};

const PASSWORD_STRENGTH_COLORS: Record<PasswordStrength, string> = {
    [PasswordStrength.UNSAFE]: "#ff4d4f",
    [PasswordStrength.WEAK]: "#ff7a45",
    [PasswordStrength.MEDIUM]: "#faad14",
    [PasswordStrength.STRONG]: "#52c41a",
    [PasswordStrength.VERY_STRONG]: "#1890ff"
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
};

const PasswordStrengthIndicator: React.FC<Props> = ({password}) => {
    const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>(PasswordStrength.UNSAFE);

    useEffect(() => {
        getPasswordStrength(password).then(setPasswordStrength);
    }, [password]);

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
        <span style={{color: PASSWORD_STRENGTH_COLORS[passwordStrength]}}>
            {PasswordIndicator}
        </span>
    );
};

export default PasswordStrengthIndicator;
