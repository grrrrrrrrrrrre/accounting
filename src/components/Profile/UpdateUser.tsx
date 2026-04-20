import {useState} from "react";
import EditProfile from "./EditProfile.tsx";
import ChangePassword from "./ChangePassword.tsx";
import {UPDATE_MODE_DEFAULT, UPDATE_MODE_CHANGE_PASSWORD, UPDATE_MODE_EDIT_PROFILE} from "../../utils/constants.ts";

const UpdateUser = () => {
    const [updateMode, setUpdateMode] = useState(UPDATE_MODE_DEFAULT)

    const close = ()=> {
        setUpdateMode(UPDATE_MODE_DEFAULT)
    }

    switch (updateMode) {
        case UPDATE_MODE_EDIT_PROFILE:
            return <EditProfile close={close}/>
        case UPDATE_MODE_CHANGE_PASSWORD:
            return <ChangePassword close={close}/>
        case UPDATE_MODE_DEFAULT:
            return (
                <>
                    <button onClick={()=>setUpdateMode(UPDATE_MODE_EDIT_PROFILE)}>
                        Edit Profile</button>
                    <button onClick={()=>setUpdateMode(UPDATE_MODE_CHANGE_PASSWORD)}>
                        Change Password</button>
                </>
            )
    }
    return (
        <div>
            Update User
        </div>
    );
};

export default UpdateUser;