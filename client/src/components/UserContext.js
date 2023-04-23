import { createContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
    const { user, isAuthenticated } = useAuth0(); // auth0 user
    const [userData, setUserData] = useState(null); // mongo user
    const [userId, setUserId] = useState(""); // id string
    const [userCreated, setUserCreated] = useState(false);

    // GET | Check if Auth0 user exists in DB
    useEffect(() => {
        user &&
        fetch(`${process.env.REACT_APP_BASE_URL}/users/${user.email}`)
        .then(res => res.json())
        .then((data) => {
            if (data.status === 400) {
                throw new Error(data.message);
            }
            if (Object.keys(data.data).length === 0) {
                addUser();
            } else {
                setUserData(data.data);
                setUserId(data.data[0]._id);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }, [user, userCreated]);

    // POST User to DB 
    const addUser = () => {
        if (user) {
            fetch(`${process.env.REACT_APP_BASE_URL}/users`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    email: user.email,
                    name: user.name, 
                    nickname: user.nickname, 
                    picture: user.picture, 
                    updated_at: user.updated_at 
                }),
            })
            .then((res) => res.json())
            .then(data => {
                console.log(data.message);
            })
            .catch((error) => {
                setUserCreated(true);
                console.log(error);
            });
        }
    };

return (
    <UserContext.Provider
        value={{
            user,
            isAuthenticated,
            userId,
            userData
        }}>
        {children}
    </UserContext.Provider>
    );
};

export default UserProvider;