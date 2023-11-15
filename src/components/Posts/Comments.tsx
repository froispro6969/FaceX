import { Comments as icomments } from "./CommentsMain"

interface Props {
    comments: icomments;
}

export const Comments = (props: Props) => {

    const { comments } = props;

    return (
        <div>
            {comments.description}
        </div>
    )
}