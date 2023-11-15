import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../config/Firebase-config";
import { Comments } from './Comments'

export interface Comments {
    description: string;
    commentID: string;
    userID: string;
    postID: string;
}

export const CommentsMain = () => {

    const [commentsList,setCommentsList] = useState<Comments[]>();
    const commentsRef = collection(db,"Comments");

    const getComments = async () => {
        try{
            const data = await getDocs(commentsRef);
            setCommentsList(data.docs.map((doc) => ({...doc.data(), commentID: doc.id})) as Comments[]);
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
            {commentsList?.map((comment) => 
            (
                <Comments comments={comment}></Comments>
            ))}
        </div>
    )
}