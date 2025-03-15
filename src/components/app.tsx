import {Trans} from "@lingui/react/macro";
import React, {useState} from "react";
import {Button} from "antd";
import LocalePicker from "./locale_picker";

const App: React.FC = () => {
    const [count, setCount] = useState(0);

    return (
        <div>
            <Trans>Message Inbox</Trans>
            <Trans>Dropdown menu</Trans>
            <Trans>Shopping cart</Trans>
            <Trans>Chicken eggs</Trans>
            <Button type="primary" onClick={() => setCount(count + 1)}>{count}</Button>
            <LocalePicker/>
        </div>
    );
};

export default App;
