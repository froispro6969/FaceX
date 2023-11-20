import { Comments as icomments } from "./CommentsMain"

interface Props {
    comments: icomments;
}

export const Comments = (props: Props) => {

    const { comments } = props;

    return (
        <div className="Post">
            <div>
                <img className="avatar" src="src\components\avatar.png" alt="" />
            </div>
            <div className="bodyPost">
                <h1 className="post-username">{comments.username}</h1>
                <p className="post-description">{comments.description}</p>
            </div>
            
        </div>
    )
}