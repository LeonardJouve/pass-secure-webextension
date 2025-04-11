import React from "react";
import {Tooltip, Button, Avatar, Skeleton} from "antd";
import type {User} from "../api/users";
import {useGetUser} from "../store/users";

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

const getInitialColor = (initial?: string): string => colors[initial?.length ? initial.charCodeAt(0) % colors.length : 0] ?? "";

const UserAvatar: React.FC<Props> = ({userId, showTooltip = true}) => {
    const {data: user} = useGetUser(userId);

    if (!user) {
        return <Skeleton.Avatar active={true}/>;
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
