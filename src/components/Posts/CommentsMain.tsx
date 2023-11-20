import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../config/Firebase-config";
import { Comments } from './Comments'
import { Post as Ipost } from './PostMain' 

export interface Comments {
    description: string;
    commentID: string;
    userID: string;
    postID: string;
    username: string;
}

interface Props {
    post: Ipost;
}

export const CommentsMain = (props: Props) => {

    const [commentsList,setCommentsList] = useState<Comments[]>();

    const commentsRef = collection(db,"Comments");
    const { post } = props;

    const getComments = async () => {
        try{
            const commentsQuery = query(commentsRef,where("postID", "==", post.postid));
            const data2 = await getDocs(commentsQuery);
            setCommentsList(data2.docs.map((doc) => ({...doc.data(), commentID: doc.id})) as Comments[]);
        }
        catch(err)
        {
            console.log(err);
        }
    }

    useEffect(() => {
        getComments();
    }, []);

    return (
        <div className="commentsList">
            <h1 className="comments-title">COMMENTS</h1>
            {commentsList?.map((comment) => 
            (
                <Comments comments={comment}></Comments>
            ))}
        </div>
    )
}