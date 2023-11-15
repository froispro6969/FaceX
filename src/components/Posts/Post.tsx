import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore"
import { auth, db } from "../../config/Firebase-config";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Post as IPost } from "./PostMain"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as heart1 } from '@fortawesome/free-solid-svg-icons'
import { faHeart as heart2 } from '@fortawesome/free-regular-svg-icons'
import { faComment } from '@fortawesome/free-regular-svg-icons'
import { AddComments } from './AddComments'
import { CommentsMain } from "./CommentsMain";





interface Props {
    post: IPost;
}


interface Likes {
    userid: string;
    likeID: string;
}



export const Post = (props: Props) => {

    const { post } = props;
    const [isVisibleComments, setIsVisibleComments] = useState(false);

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

    const handleCommentClick = () => {
        setIsVisibleComments(!isVisibleComments);
    };


    useEffect(() => {
        getLike();
    }, []);

    return (
        <div className="Posts">
            <div>
                <div className="Post">
                    <div>
                        <img className="avatar" src="src\components\avatar.png" />
                    </div>
                    <div className='bodyPost'>
                        <h1 className="post-username">{post.username}</h1>
                        <p className="post-description">{post.description}</p>
                        <div className="postOptions">
                            <button onClick={hasUserLiked ? removeLike : addLike}> {hasUserLiked ? <FontAwesomeIcon icon={heart1} className="heart1"></FontAwesomeIcon> : <FontAwesomeIcon icon={heart2} className="heart2"></FontAwesomeIcon>}</button>
                            {likes && <p>{likes.length}</p>}
                            <button onClick={handleCommentClick}><FontAwesomeIcon icon={faComment} className="comment"></FontAwesomeIcon></button>
                            {isVisibleComments && (
                                <div className="popup">
                                    <div className="popup-content">
                                    <button className="popupBtn" onClick={handleCommentClick}>WYLACZ</button>
                                        <div className="popup-content-post">
                                            <div className="Post">
                                                <div>
                                                    <img className="avatar" src="src\components\avatar.png" />
                                                </div>
                                                <div className="bodyPost">
                                                    <h1 className="post-username">{post.username}</h1>
                                                    <p className="post-description">{post.description}</p>
                                                    <div className="postOptions">
                                                        <button onClick={hasUserLiked ? removeLike : addLike}> {hasUserLiked ? <FontAwesomeIcon icon={heart1} className="heart1"></FontAwesomeIcon> : <FontAwesomeIcon icon={heart2} className="heart2"></FontAwesomeIcon>}</button>
                                                        {likes && <p>{likes.length}</p>}
                                                        <button><FontAwesomeIcon icon={faComment} className="comment"></FontAwesomeIcon></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <AddComments post={post}></AddComments>
                                        <CommentsMain></CommentsMain>

                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}