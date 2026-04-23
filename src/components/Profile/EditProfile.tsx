import {useState} from "react";
import {useAppSelector} from "../../app/hooks.ts";
import {useFetchUserQuery, useUpdateUserMutation} from "../../features/api/accountAPI.ts";

interface Props {
    close: () => void
}

const EditProfile = ({close}: Props) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const token = useAppSelector(state => state.token);
    const {data} = useFetchUserQuery(token);
    const [updateUser] = useUpdateUserMutation();

    const handleClickSave = async () => {
        try {
            const {error} = await updateUser({user: {firstName, lastName}, token, login: data!.login});

            if (error) {
                console.log('Update user error: ', error);
            }
        } catch (e) {
            console.log('unknown error: ', e);
        }
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