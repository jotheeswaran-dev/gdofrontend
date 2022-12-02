import React, { useState, useEffect } from "react";

import { getAddress, deleteAddress } from "./AddressApi/ApiCalls";

import EditIcon from "../../../images/edit-icon.png";
import DeleteIcon from "../../../images/delete-icon.png";

import EditAddressForm from "./EditAddressForm/EditAddressForm";
import AddAddressForm from "./AddAddressForm/AddAddressForm";

import "./ManageAddress.css"

const ManageAddress = (props) => {

    const [address, setAddress] = useState([]);

    const [showAdd, setShowAdd] = useState(false);

    const [showEdit, setShowEdit] = useState(false);
    const [editItem, setEditItem] = useState(null);

    //GET ADDRESSES

    useEffect(() => {
        getAddressDetails();
        // eslint-disable-next-line
    }, []);

    const getAddressDetails = async () => {
        //api call

        try {
            const response = await getAddress();
            setAddress(response.data.data);
        }
        catch (err) {
            console.log(err);
        }

    }

    //GET ADDRESSES END

    //DELETE ADDRESS API CALL

    const handleDeleteAddress = async (addressId) => {
        //api call
        await deleteAddress(addressId);
        getAddressDetails();
    }

    //DELETE ADDRESS API CALL END

    const getIndex = (addressId) => address.findIndex(item => {
        return item.addressId === addressId;
    });

    const handleShowAdd = () => {
        if(address.length === 0){
            setShowAdd(prevState => !prevState);
        }
    }

    const handleShowEdit = (item) => {
        setShowEdit(true);
        setEditItem(item)
    }

    return (
        <>
            {(!showEdit && !showAdd) &&
                <div className="address-content-container">
                    <div className="address-heading">
                        <h1>Manage Addresses</h1>
                    </div>
                    <div className={address.length>0?"disabled-add-address-btn":"add-address-btn"}
                        onClick={handleShowAdd}>
                        + ADD A NEW ADDRESS
                    </div>
                    <div>
                        {address.length > 0 && address.map((item) => (
                            <div key={item.addressId} className="address-content">
                                <div>
                                    <h3>Address {getIndex(item.addressId) + 1}</h3>
                                    <p>{item.doorNo}, {item.street}, {item.city}, {item.state}, {item.pinCode}</p>
                                </div>
                                <div className="address-icon-container">
                                    <img src={EditIcon} alt="edit" width="25px" height="25px"
                                        onClick={() => handleShowEdit(item)}
                                    />
                                    <img src={DeleteIcon} alt="delete" width="25px" height="25px" style={{ marginTop: "10px" }} onClick={() => handleDeleteAddress(item.addressId)} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>}

            {showAdd && <AddAddressForm handleShowAdd={handleShowAdd} getAddressDetails={getAddressDetails} />}

            {showEdit && <EditAddressForm editItem={editItem} setShowEdit={setShowEdit} getAddressDetails={getAddressDetails} />}
        </>
    );
}
export default ManageAddress;