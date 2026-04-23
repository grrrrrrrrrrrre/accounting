import {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useChangePasswordMutation, useFetchUserQuery} from "../../features/api/accountAPI.ts";
import {createToken} from "../../utils/constants.ts";
import {setToken} from "../../features/token/tokenSlice.ts";

interface Props {
    close: () => void;
}

const ChangePassword = ({close}: Props) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useAppDispatch();
    const token = useAppSelector(state => state.token);
    const [changePassword] = useChangePasswordMutation();
    const {data} = useFetchUserQuery(token);

    const handleClickSave = async () => {
        if (newPassword === confirmPassword) {
            if (confirmPassword === newPassword) {
                const token = createToken(data!.login, oldPassword);
                try {
                    const {error} = await changePassword({newPassword, token});

                    if (error) {
                        console.log('change password error: ', error);
                    } else {
                        dispatch(setToken(createToken(data!.login, oldPassword)))
                    }
                } catch (e) {
                    console.error(e);
                }
            }
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