import { addDoc, collection } from "firebase/firestore";
import { Post as IPost } from "./PostMain"
import { auth, db } from "../../config/Firebase-config";
import { useForm } from 'react-hook-form'
import { useAuthState } from "react-firebase-hooks/auth";
import { useUserList } from "../UsersProvider";
import { currentDate } from "./currentDate";

interface Props {
    post: IPost;
}

interface CreateComments {
    description: string;
}



export const AddComments = (props: Props) => {

    const { post } = props
    const userList = useUserList();
    const commentsRef = collection(db, "Comments");

    const { register, handleSubmit } = useForm<CreateComments>({

    });


    const addComment = async (data: CreateComments) => {
        for (const user of userList) {
        try {
            await addDoc(commentsRef, {
                userID: user.userID,
                postID: post.postid,
                username: user.username,
                email: user.email,
                createdAt: currentDate(),
                ...data,
            })
            window.location.reload();
        }
        catch (err) {
            console.log(err);
        }
    }}



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