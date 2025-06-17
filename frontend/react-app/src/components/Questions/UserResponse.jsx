import { createContext, useContext, useState } from "react";

const UserContext = createContext();

function UserResponse({children}) {

    const [userData, setUserData] = useState({
    username: '',
    age: null,
    preferredGenres:[],
    genresToExplore: [],
    favBooks: [],
});

const updateData = (newData) => {
    setUserData((prev) => ({...prev, ...newData}));
};

return (
    <UserContext.Provider value={{userData, updateData}}>
        {children}
    </UserContext.Provider>
    );
}

function useUser() {
    return useContext(UserContext);
}

export {UserResponse, useUser};