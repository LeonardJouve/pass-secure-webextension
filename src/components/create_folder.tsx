import React, {useState} from "react";
import useRouter from "../store/router";
import RouterBack from "./router_back";

const CreateFolder: React.FC = () => {
    const {current} = useRouter();

    const [parentId, setParentId] = useState<number|null>(current.params["parentId"] as number|undefined ?? null);

    return (
        <div>
            <RouterBack/>
            {"folder"}
            {parentId}
        </div>
    );
};

export default CreateFolder;
