import { collection, getDocs, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../config/Firebase-config";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";


interface Users {
    email: string;
    username: string;
    userID: string;
}

const UserListContext = createContext<Users[]>([]);

export const useUserList = () => {
    return useContext(UserListContext);
};

export const UsersProvider = ({ children }: { children: ReactNode }) => {

    const [user] = useAuthState(auth);
    const userRef = collection(db,"Users");
    const [userList, setUserList] = useState<Users[]>([]);
    const [userUid, setUserUid] = useState<string | null>(null);

    useEffect(() => {
        if (user) {
            setUserUid(user.uid); 
        }
    }, [user]);

    useEffect(() => {
        const getUsers = async () => {
            try {
                if (userUid) {
                    const usersQuery = query(userRef, where("userID", "==", userUid)); // Filter users by logged-in user's ID
                    const data = await getDocs(usersQuery);
                    setUserList(data.docs.map((doc) => ({ ...doc.data(), userID: doc.id })) as Users[]);
                } else {
                    console.log("User UID is not available");
                }
            } catch (err) {
                console.log(err);
            }
        };

        getUsers(); 

    }, [userUid]); // Fetch users when userUid is available

    return <UserListContext.Provider value={userList}>{children}</UserListContext.Provider>;
}