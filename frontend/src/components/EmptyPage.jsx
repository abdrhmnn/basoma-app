import React, { useState, useEffect } from "react";

// npm packages
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const EmptyPage = () => {

    const [isLoad, SetIsLoad] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            SetIsLoad(true)
        }, 2000)
    }, [])

    return(
        <div>
            {isLoad ? 
            <div>
                <h1>Halaman Kosong</h1>
                <Link to="/">Kembali</Link>
            </div> : 
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh"
            }}><CircularProgress /></div>}
        </div>
    )
}
export default EmptyPage