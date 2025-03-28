import React, {useEffect, useRef, useState} from "react";
import {Button, Tooltip, type ButtonProps} from "antd";
import {Trans} from "@lingui/react/macro";

type Props = {
    onLongPress: () => void;
    delay: number;
} & ButtonProps & React.PropsWithChildren;

const LongPress: React.FC<Props> = ({onLongPress, delay, children, ...props}) => {
    const [isMouseDown, setIsMouseDown] = useState(false);
    const timer = useRef<number|undefined>(undefined);

    useEffect(() => {
        if (isMouseDown) {
            timer.current = window.setTimeout(() => {
                onLongPress();
                setIsMouseDown(false);
            }, delay);
        } else {
            window.clearTimeout(timer.current);
            timer.current = undefined;
        }

        return () => {
            window.clearTimeout(timer.current);
            timer.current = undefined;
        };
    }, [isMouseDown, delay, onLongPress]);

    return (
        <Tooltip title={<Trans>Hold to confirm</Trans>}>
            <Button
                {...props}
                onMouseDown={() => setIsMouseDown(true)}
                onMouseUp={() => setIsMouseDown(false)}
            >
                <span style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "rgba(255, 255, 255, 0.2)",
                    transform: isMouseDown ? "scaleX(1)" : "scaleX(0)",
                    transformOrigin: "left",
                    transition: isMouseDown ? `transform ${delay}ms linear` : "none",
                }}/>
                {children}
            </Button>
        </Tooltip>
    );
};

export default LongPress;
