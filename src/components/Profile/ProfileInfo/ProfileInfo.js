import React, { useState } from "react";

import { useStateValue } from "../../../contexts/StateProvider";

import EditProfileInfo from "./EditProfileInfo/EditProfileInfo";

import EditIcon from "../../../images/edit-icon.png";

import "./ProfileInfo.css"

const ProfileInfo = (props) => {

    const [showEdit, setShowEdit] = useState(false);

    const [{ user }] = useStateValue();

    const handleShowEdit = () => {
        setShowEdit(prevState => !prevState);
    }

    return (
        <>{!showEdit ?
            <div className="profile-content">
                <div className="profile-heading">
                    <h1>Profile</h1>
                    <img src={EditIcon} alt="edit" height="25px" width="25px" style={{ marginLeft: "25px" }}
                        onClick={handleShowEdit}
                    />
                </div>
                <table>
                    <tbody>
                        <tr>
                            <td className="table-row-name">Firstname</td>
                            <td>{user.firstName}</td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td className="table-row-name">Lastname</td>
                            <td>{user.lastName}</td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td className="table-row-name">Email</td>
                            <td>{user.email}</td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td className="table-row-name">Phone number</td>
                            <td>{user.contactNo}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            :
            <EditProfileInfo handleShowEdit={handleShowEdit}/>
        }
        </>
    );
}
export default ProfileInfo;