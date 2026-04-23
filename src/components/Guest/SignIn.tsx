import {useState} from "react";
import {useAppDispatch} from "../../app/hooks.ts";
import {createToken} from "../../utils/constants.ts";
import {useLazyFetchUserQuery} from "../../features/api/accountAPI.ts";
import {setToken} from "../../features/token/tokenSlice.ts";

const SignIn = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useAppDispatch();
    const [fetchUser] = useLazyFetchUserQuery()

    const handleClickSignIn = async () => {
        const token = createToken(login, password);
        try {
            const {error} = await fetchUser(token);

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
            <button onClick={handleClickSignIn}>Sign In</button>
            <button onClick={handleClickClear}>Clear</button>
        </>
    )
}

export default SignIn;