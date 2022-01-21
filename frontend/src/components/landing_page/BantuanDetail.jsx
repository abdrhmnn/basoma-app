import React, { useState, useEffect } from "react";

// components
import Navbar from "./Navbar";
import Footer from "./Footer";

// img
import img1 from "./../../images/test.png";

// npm packages
import { useLocation } from "react-router-dom";
import { Button, CircularProgress } from "@mui/material";
import { AES, enc } from "crypto-js";
import axios from "axios";

const BantuanDetail = ({ data }) => {

    const [isLoad, setIsLoad] = useState(false)
    const [bantuanById, setBantuanById] = useState()
    const location = useLocation()
    
    useEffect(() => {
        document.title ="Detail Bantuan"
        const params = new URLSearchParams(location.search);
        const bi = AES.decrypt(params.get("bi"), "bantuan_id").toString(enc.Utf8)
        axios.get(`http://localhost:5000/bantuan/id/${bi}`)
        .then(res => {
            setBantuanById(res.data)
        })
        setTimeout(() => {
            setIsLoad(true)
        }, 2000)
    }, [location])

    return(
        <div>
            <Navbar dataBantuan="true"/>
            {isLoad ? 
                <div className="card_bantuan">
                    <div className="card_detail">
                        <h1>{bantuanById.nama}</h1>
                        <p>Bantuan ini diberikan oleh <span>test</span></p>
                        <img src={img1} alt="Card" />
                        <h2>Deskripsi</h2>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde perspiciatis amet, doloribus eos quo dicta fugiat. Magnam ipsum tenetur, dolorem dicta sed blanditiis. A nihil consequuntur placeat vel delectus natus.</p>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde perspiciatis amet, doloribus eos quo dicta fugiat. Magnam ipsum tenetur, dolorem dicta sed blanditiis. A nihil consequuntur placeat vel delectus natus.</p>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde perspiciatis amet, doloribus eos quo dicta fugiat. Magnam ipsum tenetur, dolorem dicta sed blanditiis. A nihil consequuntur placeat vel delectus natus.</p>
                    </div>
                    <div className="card_info">
                        <div className="card_detail_info">
                            <div className="kapasitas">
                                <h2>Kapasitas</h2>
                                <p>{bantuanById.kapasitas} Orang</p>
                            </div>
                            <div className="status">
                                <h2>Status</h2>
                                <p>{bantuanById.status}</p>
                            </div>
                        </div>
                    <Button
                        variant="contained"
                        className="btn_daftar"
                    >Daftar</Button>
                    </div>
                </div>
                    :
                <div 
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "80vh"
                }}><CircularProgress /></div>
            }
            <Footer class_bantuan_detail="bantuan_detail_foot" active_foot={data}/>
        </div>
    )
}

export default BantuanDetail