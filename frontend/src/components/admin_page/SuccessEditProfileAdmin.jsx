import React from "react";

// img
import sucess_img from "../../images/success.svg";

// npm packages
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const SuccessEditProfile = () => {
    return (
        <div className="success_edit_profile_admin">
            <img src={sucess_img} alt="Berhasil Update Profile" />
            <h1>Update Profile Berhasil!</h1>
            <Button 
                variant="contained"
                component={Link}
                to="/dashboard"
            >
                Kembali ke dashboard
            </Button>
        </div>
    )
}

export default SuccessEditProfile