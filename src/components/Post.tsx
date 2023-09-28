import { collection, getDocs } from "firebase/firestore"
import { db } from "../config/Firebase-config";
import { useEffect, useState } from "react";

interface Post {
    id: string;
    userID: string;
    username: string;
    description: string;
}

export const Post = () => {

    const [postsList, setPostsList] = useState<Post[]>();

    const postRef = collection(db, "Posts");


    const getPosts = async () => {
        const data = await getDocs(postRef);
        setPostsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[]);
    }

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <div className="Posts">
            {postsList?.map((post) => (
                <div>
                    <div className='title'>
                        <h1>{post.username}</h1>
                    </div>
                    <div className='body'>
                        <p>{post.description}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}