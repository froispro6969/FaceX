import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore"
import { auth, db } from "../../config/Firebase-config";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Post as IPost } from "./PostMain"




interface Props {
    post: IPost;
}


interface Likes {
    userid: string;
    likeID: string;
}


export const Post = (props: Props) => {

    const { post } = props;

    const [likes, setLikes] = useState<Likes[] | null>(null);
    const [user] = useAuthState(auth);
    const likesRef = collection(db, "Likes");
    const likesDoc = query(likesRef, where("postID", "==", post.postid));



    const getLike = async () => {
        const data = await getDocs(likesDoc);
        setLikes(data.docs.map((doc) => ({ userid: doc.data().userid, likeID: doc.id })));
    }

    const addLike = async () => {
        try {
            const newDoc = await addDoc(likesRef, {
                userid: user?.uid,
                postID: post.postid,
            })
            if (user) {
                setLikes((prev) => prev ? [...prev, { userid: user.uid, likeID: newDoc.id }] : [{ userid: user.uid, likeID: newDoc.id }])
            }

        }
        catch (err) {
            console.log(err);
        }
    }

    const removeLike = async () => {
        try {
            const likeToDeleteQuery = query(likesRef, where("postID", "==", post.postid), where("userid", "==", user?.uid));
            const likeToDeleteData = await getDocs(likeToDeleteQuery);

            const likeToDelete = doc(db, "Likes", likeToDeleteData.docs[0].id);
            const likeId = likeToDeleteData.docs[0].id;

            await deleteDoc(likeToDelete)
            {
                if (user) {
                    setLikes((prev) => prev && prev.filter((like) => like.likeID !== likeId));
                }
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    const hasUserLiked = likes?.find((like) => like.userid === user?.uid);




    useEffect(() => {
        getLike();
    }, []);

    return (
        <div className="Posts">
            <div>
                <div className="Post">
                    <div className="avatarPost">
                        <img src="src\components\avatar.png" />
                    </div>
                    <div className='bodyPost'>
                        <h1>{post.username}</h1>
                        <p>{post.description}</p>
                        <button onClick={hasUserLiked ? removeLike : addLike}> {hasUserLiked ? <>&#128078;</> : <>&#128077;</>}</button>
                        {likes && <p> Likes: {likes.length}</p>}
                    </div>
                </div>
            </div>
        </div>
    )
}