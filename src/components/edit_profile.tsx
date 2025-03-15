import React from "react";
import LocalePicker from "./locale_picker";
import RouterBack from "./router_back";

const EditProfile: React.FC = () => (
    <div>
        <RouterBack/>
        <LocalePicker/>
    </div>
);

export default EditProfile;
