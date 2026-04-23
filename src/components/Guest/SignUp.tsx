import {useState} from "react";
import {useRegisterUserMutation} from "../../features/api/accountAPI.ts";
import {useAppDispatch} from "../../app/hooks.ts";
import {createToken} from "../../utils/constants.ts";
import {setToken} from "../../features/token/tokenSlice.ts";

const SignUp = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const dispatch = useAppDispatch();
    const [registerUser] = useRegisterUserMutation()

    const handleClickSignUp = async () => {
        const token = createToken(login, password);
        try {
            const {error} = await registerUser({login, firstName, lastName, password});

            if (error) {
                console.error(error);
            } else {
                dispatch(setToken(token));
            }
        } catch (e) {
            console.error(e);
        }
    }

    const handleClickClear = () => {
        setLogin('');
        setPassword('');
        setFirstName('');
        setLastName('');
    }

    return (
        <>
            <label>Login:
                <input
                    type="text"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                />
            </label>
            <label>Password:
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            <label>First Name:
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </label>
            <label>Last Name:
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </label>
            <button onClick={handleClickSignUp}>Sign Up</button>
            <button onClick={handleClickClear}>Clear</button>
        </>
    )
}

export default SignUp;