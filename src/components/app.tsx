import {Trans} from "@lingui/react/macro";
import React, {useState} from "react";
import {Button} from "antd";
import useIntl from "../store/intl";

const App: React.FC = () => {
    const [count, setCount] = useState(0);
    const {setLocale} = useIntl();

    return (
        <div>
            <Trans>Message Inbox</Trans>
            <Trans>Dropdown menu</Trans>
            <Trans>Shopping cart</Trans>
            <Trans>Chicken eggs</Trans>
            <Button type="primary" onClick={() => setCount(count + 1)}>{count}</Button>
            <Button type="primary" onClick={() => setLocale("en")}>en</Button>
            <Button type="primary" onClick={() => setLocale("fr")}>fr</Button>
        </div>
    );
};

export default App;
