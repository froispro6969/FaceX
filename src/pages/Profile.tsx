import { useUserList } from "../components/UsersProvider";

export const Profile = () => {

    const userList = useUserList();

    return (
        <div className="profile-container">
            <div className="profile-page-left">
                <div className="profile-avatar">
                    <img src={userList.length > 0 ? userList[0].profilePicture || "" : ""} />
                </div>
                <div className="profile-info">
                    {userList.map((users) => (
                        <div key={users.userID}>
                            <h2 className="profile-username">{users.username}</h2>
                            <h2 className="profile-email">@{users.email}</h2>
                            <h2>00-00-0000</h2>
                            <h2>Warsaw</h2>
                        </div>
                    ))}
                </div>
            </div>
            <div className="profile-page-right">
                <h1>Your Comments</h1>
            </div>
        </div>
    )
}