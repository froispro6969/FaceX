import { addDoc, collection } from "firebase/firestore";
import { Post as IPost } from "./PostMain"
import { auth, db } from "../../config/Firebase-config";
import { useForm } from 'react-hook-form'
import { useAuthState } from "react-firebase-hooks/auth";



interface Props {
    post: IPost;
}

interface Comments {
    description: string;
}



export const AddComments = (props: Props) => {

    const { post } = props
    const [ user ] = useAuthState(auth)
    const commentsRef = collection(db, "Comments");

    const { register, handleSubmit } = useForm<Comments>({

    });


    const addComment = async (data: Comments) => {
        try {
            await addDoc(commentsRef, {
                userID: user?.uid,
                postID: post.postid,
                ...data,
            })
        }
        catch (err) {
            console.log(err);
        }
    }



    return (
        <form onSubmit={handleSubmit(addComment)}>
            <div className="post-comment">
                <img className="avatar" src="src\components\avatar.png" alt="" />
                <textarea placeholder="Post your reply" {...register("description")}></textarea>
                <button className="post-comment-button" >Add comment!</button>
            </div>
        </form>
    )
}