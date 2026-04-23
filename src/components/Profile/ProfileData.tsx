import {useAppSelector} from "../../app/hooks.ts";
import {useFetchUserQuery} from "../../features/api/accountAPI.ts";

const ProfileData = () => {
    const token = useAppSelector(state => state.token);
    const {data: user, isLoading} = useFetchUserQuery(token);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (!user) {
        return <p>No user data available.</p>;
    }

    return (
        <div>
            <p>First Name: {user.firstName}</p>
            <p>Last Name: {user.lastName}</p>
            <p>Login: {user.login}</p>
            <ul>
                {user.roles.map(role => <li key={role}>{role}</li>)}
            </ul>
        </div>
    );
};

export default ProfileData;