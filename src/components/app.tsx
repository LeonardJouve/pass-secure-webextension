import {Trans} from "@lingui/react/macro";
import React, {useState} from "react";
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
            <button onClick={() => setCount(count + 1)}>{count}</button>
            <button onClick={() => setLocale("en")}>{"en"}</button>
            <button onClick={() => setLocale("fr")}>{"fr"}</button>
        </div>
    );
};

export default App;
