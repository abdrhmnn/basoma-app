import React, { useState, useEffect } from "react";
import HeaderAdmin from "./HeaderAdmin";
import NavbarAdmin from "./NavbarAdmin";
import axios from "axios";
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import ReactExport from "react-export-excel";
import { Link } from "react-router-dom";
import swal from 'sweetalert';

import { TextField, Button } from "@mui/material";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";

const BantuanAdmin = () => {

    const [bantuan, setBantuan] = useState([])
    const [valueCari, setValueCari] = useState('')
    const ExcelFile = ReactExport.ExcelFile;
    const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
    const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

    useEffect(() => {
        document.title = "Kelola Bantuan"
        getAllBantuan()
    }, [])

    const dataSetBantuan = bantuan.map((e, i) => {
        return {
            nama: e.nama,
            kapasitas: e.kapasitas
        }
    })

    const getAllBantuan = async () => {
        const response = await axios.get('http://localhost:5000/bantuan');
        setBantuan(response.data)
    }

    const handleChange = (e) => {
        setValueCari(e.target.value)
    }

    const generatePdf = () => {
        var doc = new jsPDF({ orientation: "p" });
        doc.text("Data Bantuan Basoma", 80, 20);
        doc.autoTable({
            head: [['No', 'Nama', 'Kapasitas']],
            body: bantuan.map((e, i) => {
                return [
                    i + 1,
                    e.nama,
                    e.kapasitas
                ]
            })
            ,
            startY: 30
        })
        doc.save('data_bantuan.pdf')
    }

    return (
        <div style={{ display: "flex" }}>
            <NavbarAdmin />
            <div className="flex_header_admin">
                <HeaderAdmin />
                <div className="content_dashboard_admin">
                    <h2>Data Bantuan</h2>
                    <div className="wrap_tbl_bantuan">
                        <div className="flex_element_bantuan">
                            <div className="add_bantuan_flex">
                                <Button
                                    variant="contained"
                                    className="btn_add_bantuan"
                                    component={Link}
                                    to="/tambah-bantuan"
                                ><AiOutlinePlusSquare size={30}/></Button>
                                <TextField label="Cari Data" name="nm_depan" variant="outlined" sx={{ width: "30%" }} onChange={handleChange} autoComplete="off" className="inp_cari"/>
                            </div>
                            <div className="btn_export_bantuan">
                                <Button
                                    variant="contained"
                                    className="generate_pdf_bantuan"
                                    onClick={generatePdf}
                                >Cetak ke PDF</Button>
                                <ExcelFile element={
                                    <Button
                                    variant="contained"
                                    className="generate_excel_bantuan"
                                    >Cetak ke Excel</Button>
                                } filename="data_bantuan">
                                    <ExcelSheet data={dataSetBantuan} name="dataBantuan">
                                        <ExcelColumn label="Nama" value="nama"/>
                                        <ExcelColumn label="Kapasitas" value="kapasitas"/>
                                        <ExcelColumn label="Status" value="status"/>
                                    </ExcelSheet>
                                </ExcelFile>
                            </div>
                        </div>
                        <table className="tbl_class">
                            <thead className="tbl_class_head">
                                <tr>
                                    <th>No</th>
                                    <th>Nama</th>
                                    <th>Kapasitas</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="tbl_class_body">
                                {bantuan.map((e, i) => {

                                if(e.nama.toLowerCase().includes(valueCari)){
                                    return (
                                        <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td>{e.nama}</td>
                                            <td>{e.kapasitas}</td>
                                            <td>
                                            <Button
                                                variant="contained"
                                                className="btn_delete_bantuan"
                                                onClick={() => {
                                                    swal({
                                                        title: "Yakin ingin hapus data?",
                                                        text: "Jika iya, maka data tidak bisa dikembalikan lagi!",
                                                        icon: "warning",
                                                        buttons: ["Tidak", "Yakin"],
                                                        dangerMode: true
                                                    })
                                                    .then((willDelete) => {
                                                        if (willDelete) {
                                                            axios.delete(`http://localhost:5000/bantuan/${e.kd_bantuan}`)
                                                            .then(res => {
                                                                swal("Data berhasil dihapus!", {
                                                                icon: "success",
                                                                })
                                                            })
                                                            getAllBantuan()
                                                        }
                                                    });
                                                }}
                                            ><RiDeleteBin6Line /></Button>
                                            </td>
                                        </tr>
                                    )
                                }
                                return null
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BantuanAdmin