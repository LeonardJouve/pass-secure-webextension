import React, {useEffect} from "react";
import {useShallow} from "zustand/react/shallow";
import {Tooltip, Button, Avatar} from "antd";
import type {User} from "../api/users";
import LoadingAvatar from "./loading_avatar";
import useUsers, {getUserSelector} from "../store/users";

type Props = {
    userId: User["id"]|"me";
    showTooltip?: boolean;
};

const colors = [
    "#B0BEC5",
    "#007BFF",
    "#DC3545",
    "#2196F3",
    "#9C27B0",
    "#00BCD4",
    "#4CAF50",
    "#E91E63",
    "#FF4081",
    "#F44336",
    "#FF9800",
    "#FFC107",
    "#FF5722",
    "#3F51B5",
    "#CDDC39",
    "#FFD700",
];

const getInitialColor = (initial?: string): string => colors[initial ? initial.charCodeAt(0) % colors.length : 0] as string;

const UserAvatar: React.FC<Props> = ({userId, showTooltip = true}) => {
    const user = useUsers(useShallow(getUserSelector(userId)));
    const {getMe, getUser} = useUsers();

    useEffect(() => {
        if (!user) {
            if (userId === "me") {
                getMe();
            } else {
                getUser(userId);
            }
        }
    }, [user]);

    if (!user) {
        return <LoadingAvatar/>;
    }

    const initial = user.username[0]?.toUpperCase();

    const avatar = (
        <Button shape="circle" type="text">
            <Avatar style={{backgroundColor: getInitialColor(initial)}}>
                {initial}
            </Avatar>
        </Button>
    );

    if (!showTooltip) {
        return avatar;
    }

    return (
        <Tooltip title={user.username}>
            {avatar}
        </Tooltip>
    );
};

export default UserAvatar;
