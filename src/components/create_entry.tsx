import React, {useState} from "react";
import useRouter from "../store/router";
import RouterBack from "./router_back";

const CreateEntry: React.FC = () => {
    const {current} = useRouter();

    const [folderId, _setFolderId] = useState<number|null>(current.params["folderId"] as number|undefined ?? null);

    return (
        <div>
            <RouterBack/>
            {"entry"}
            {folderId}
        </div>
    );
};

export default CreateEntry;
