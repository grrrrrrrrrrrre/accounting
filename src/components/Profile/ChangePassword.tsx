import {useState} from "react";
import {useAppDispatch} from "../../app/hooks.ts";
import {changePassword} from "../../features/api/accountAPI.ts";

interface Props {
    close: () => void;
}

const ChangePassword = ({close}: Props) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useAppDispatch();

    const handleClickSave = () => {
        if (newPassword === confirmPassword) {
            dispatch(changePassword({newPassword, oldPassword}))
            close();
        } else {
            alert("Password doesn't match");
        }
    }

    const handleClickClear = () => {
        setNewPassword('');
        setOldPassword('')
        setConfirmPassword('')
    }

    return (
        <>
            <label>Old password:
                <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}/>
            </label>
            <label>New password
                <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}/>
            </label>
            <label>Confirm password:
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}/>
            </label>

            <button onClick={handleClickSave}>Save and close</button>
            <button onClick={close}>Close without saving</button>
            <button onClick={handleClickClear}>Clear</button>
        </>
    );
};

export default ChangePassword;