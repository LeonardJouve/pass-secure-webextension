import React from "react";
import {Modal} from "antd";
import {Trans} from "@lingui/react/macro";
import LocalePicker from "./locale_picker";

type Props = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
};

const ProfileModal: React.FC<Props> = ({isOpen, setIsOpen}) => {
    const handleOk = (): void => {
        setIsOpen(false);
    };

    const handleCancel = (): void => {
        setIsOpen(false);
    };

    return (
        <Modal
            title={<Trans>Edit Profile</Trans>}
            open={isOpen}
            closable={true}
            destroyOnClose={true}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={() => null}
        >
            <LocalePicker/>
        </Modal>
    );
};

export default ProfileModal;
