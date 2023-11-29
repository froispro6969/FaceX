import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Post } from "./Post";
import { db } from "../../config/Firebase-config";

export interface Post {
    postid: string;
    userID: string;
    username: string;
    description: string;
}



export const Postmain = () => {

    const [postsList, setPostsList] = useState<Post[]>();
    const postRef = collection(db, "Posts");

    const getPosts = async () => {
        const data = await getDocs(postRef);
        setPostsList(data.docs.map((doc) => ({ ...doc.data(), postid: doc.id })) as Post[]);
    }

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <div className="postsList">
            {   
                postsList?.map((post) => (
                    <div key={post.postid}>
                        <Post post={post} />
                    </div>
                    
                ))}
        </div>
    )
}