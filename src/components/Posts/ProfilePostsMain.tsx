import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../../config/Firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useUserList } from "../UsersProvider";


interface Posts {
    profilePicture: string;
    username: string;
    description: string;
    email: string;
    createdAt: string;
}


export const ProfilePostsMain = () => {

    const [postsList,setPostsList] = useState<Posts[]>();
    const [user] = useAuthState(auth);
    const userList = useUserList();
    const postsRef = collection(db,"Posts");
    const userID = userList.length > 0 ? userList[0].userID || "" : ""

    const getPosts = async () => {
        try{
            const postsQuery = query(postsRef,where("userID", "==", userID));
            const data2 = await getDocs(postsQuery);
            setPostsList(data2.docs.map((doc) => ({...doc.data()})) as Posts[]);
        }
        catch(err)
        {
            console.log(err);
        }
    }

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <div>
            {postsList?.map((post) => 
            (
                <div className="profile-posts">
                <div>
                    <img className="avatar" src="src\components\avatar.png" alt="" />
                </div>
                <div className="bodyPost">
                    <div className="post-info">
                            <h1 className="post-username">{post.username}</h1>
                            <h5 className="post-email">@{post.email}</h5>
                            <h5 className="post-date">·{post.createdAt}</h5>
                        </div>
                        <p className="post-description">{post.description}</p>
                </div>
                
            </div>
                                    
            ))}
        </div>
    )
}