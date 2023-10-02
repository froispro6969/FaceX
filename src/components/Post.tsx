import { addDoc, collection, getDocs } from "firebase/firestore"
import { auth, db } from "../config/Firebase-config";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

interface Post {
    postid: string;
    userID: string;
    username: string;
    description: string;
}

interface Likes {
    userid: string;
    likeID: string;
}


export const Post = () => {



    const [postsList, setPostsList] = useState<Post[]>();
    const [likes, setLikes] = useState<Likes[] | null>(null);
    const [user] = useAuthState(auth);

    const postRef = collection(db, "Posts");
    const likeRef = collection(db, "Likes");



    const getPosts = async () => {
        const data = await getDocs(postRef);
        setPostsList(data.docs.map((doc) => ({ ...doc.data(), postid: doc.id })) as Post[]);
    }

    const addLike = async (postid: string) => {
        try {
            const newDoc = await addDoc(likeRef, {
                userid: user?.uid,
                postID: postid,
            })
            if(user)
            {
                setLikes((prev) => prev ? [...prev, { userid: user.uid, likeID: newDoc.id  }] : [{ userid: user.uid, likeID: newDoc.id }])
            }
    
            }
            catch (err) {
                console.log(err);
            }
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
                    <button onClick={() => addLike(post.postid)}>&#128077;</button>
                </div>
            ))}
        </div>
    )
}