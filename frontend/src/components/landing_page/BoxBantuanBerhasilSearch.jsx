import React from "react";

// components
import BoxBantuanGagal from "./BoxBantuanGagal";

// npm packages
import { Typography, Box } from "@mui/material";
import { useNavigate, createSearchParams } from "react-router-dom";

const BoxBantuanBerhasilSearch = ({ data }) => {

    const navigate = useNavigate()

    return(
        <div>
            {data.length !== 0 ?
                data.map((e, i) => (
                    <Box
                        key={i}
                        sx={{
                            height: 150,
                            p: 3,
                            borderRadius: 3
                        }}
                        onClick={() => 
                            navigate({
                                pathname: "/bantuan-detail",
                                search: `?${createSearchParams({
                                    bi: e.kd_bantuan
                                }).toString()}`
                            })
                        }
                    >
                        <Typography variant="h4">{e.nama}</Typography>
                        <p>Bantuan ini diberikan oleh: abdu</p>
                        <hr />
                        <div className="detail_bantuan">
                            <div className="kapasitas">
                                <p>Kapasitas: <span>{e.kapasitas}</span></p>
                            </div>
                            <div className="status">
                                <p>Status: <span>{e.status}</span></p>
                            </div>
                            <div className="batas_waktu">
                                <p>Waktu: 2 Hari</p>
                            </div>
                        </div>
                    </Box>
                ))
                :
                <BoxBantuanGagal />
            }
        </div>
    )
}

export default BoxBantuanBerhasilSearch