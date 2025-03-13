import {Trans} from "@lingui/react/macro";
import React, {useState} from "react";

const App: React.FC = () => {
    const [count, setCount] = useState(0);

    return (
        <div>
            <Trans>Message Inbox</Trans>
            <Trans>Dropdown menu</Trans>
            <Trans>Shopping cart</Trans>
            <button onClick={() => setCount(count + 1)}>{count}</button>
        </div>
    );
};

export default App;
