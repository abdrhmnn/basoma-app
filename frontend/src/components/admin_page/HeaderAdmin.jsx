import React, { useState, useEffect } from "react";

// import default_img from "../../images/default_img/default_img.svg";
// components or files
import { kuki } from "../../kuki";
import { Button, Menu, MenuItem, Avatar } from "@mui/material";
import { MdKeyboardArrowDown } from "react-icons/md";
import axios from "axios";

const HeaderAdmin = () => {

    const [userById, setUserById] = useState({})
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    const handleClose = () => {
        setAnchorEl(null)
    }

    useEffect(() => {
        getUserById()
    }, [])

    const getUserById = async () => {
        const response = await axios.get(`http://localhost:5000/users/${kuki.get("user_id")}`)
        setUserById(response.data)
    }

    return(
        <div className="head_admin">
            <div className="nav_profile">
                <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={(e) => setAnchorEl(e.currentTarget)}
                    >
                    <Avatar alt="Foto Profile" src={userById.gambar ? `http://localhost:5000/public/${userById.gambar}` : 'blank_img.png'}/>
                    <MdKeyboardArrowDown size={20} style={{ marginLeft: 5, color: "rgb(117, 117, 117)" }}/>
                </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                    >
                    <MenuItem onClick={() => {
                        kuki.remove("user_id")
                        window.location.href = "/"
                    }} style={{ padding: "10 15 10 15" }}>Logout</MenuItem>
                </Menu>
            </div>
        </div>
    )
}

export default HeaderAdmin