import {useState} from "react";
import {useAppDispatch} from "../../app/hooks.ts";
import {updateUser} from "../../features/api/accountAPI.ts";

interface Props {
    close: () => void
}

const EditProfile = ({close}: Props) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const dispatch = useAppDispatch();

    const handleClickSave = () => {
        dispatch(updateUser({firstName, lastName}));
        close();
    }

    const handleClickClose = () => {
        setFirstName('');
        setLastName('');
        close();
    }

    const handleClickClear = () => {
        setFirstName('');
        setLastName('');
    }

    return (
        <div>
            <label>First Name:
                <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}/>
            </label>
            <label>Last Name:
                <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}/>
            </label>

            <button onClick={handleClickSave}>Save and close</button>
            <button onClick={handleClickClose}>Close without saving</button>
            <button onClick={handleClickClear}>Clear</button>
        </div>
    );
};

export default EditProfile;