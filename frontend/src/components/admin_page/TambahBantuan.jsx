import React,{ useState, useEffect } from "react";

// components
import HeaderAdmin from "./HeaderAdmin";
import NavbarAdmin from "./NavbarAdmin";

// npm packages
import swal from 'sweetalert';
import {
    TextField,
    Button,
    Radio,
    RadioGroup,
    FormControl,
    FormControlLabel,
    FormLabel
} from "@mui/material";
import * as Yup from "yup";
import { Formik, Field } from 'formik';
import axios from "axios";

const TambahBantuan = () => {

    const [bantuan, setBantuan] = useState([])

    useEffect(() => {
        document.title = "Tambah Data Bantuan"
        getAllBantuan()
    }, [])

    const schemaTambahBantuan = Yup.object({
        nama: Yup.string().required("Nama bantuan tidak boleh kosong!"),
    });

    const getAllBantuan = async () => {
        const response = await axios.get('http://localhost:5000/bantuan');
        setBantuan(response.data)
    }

    return(
        <div style={{ display: "flex" }}>
            <NavbarAdmin dataTambahBantuan={true}/>
            <div className="flex_header_admin">
                <HeaderAdmin />
                <div className="content_dashboard_admin">
                    <h2>Tambah Data Bantuan</h2>
                    <div className="wrap_form_tbh_bantuan">
                        <Formik
                            initialValues={{ nama: '', kapasitas: '' }}
                            validationSchema={schemaTambahBantuan}
                            onSubmit={(values, actions) => {
                                axios.post('http://localhost:5000/bantuan', {
                                    kd_bantuan: `BNT_${bantuan.length + 1}`,
                                    nama: values.nama,
                                    kapasitas: values.kapasitas
                                })
                                .then(() => {
                                    swal("Data bantuan berhasil dibuat!", {
                                        icon: "success",
                                    }).then(() => {
                                        window.location.href = "/kelola-bantuan"
                                    })
                                })
                            }}
                        >
                        {(props) => (
                            <form onSubmit={props.handleSubmit}>
                                <Field
                                    name="nama"
                                    variant="outlined"
                                    label="Nama Bantuan"
                                    as={TextField}
                                    error={props.touched.nama && props.errors.nama ? true : false}
                                    helperText={props.touched.nama && props.errors.nama}
                                />
                                <FormControl component="fieldset" sx={{ mt: 2, mb: 2 }}>
                                    <FormLabel component="legend">Kapasitas</FormLabel>
                                    <RadioGroup row name="kapasitas" onChange={props.handleChange}>
                                        <FormControlLabel value="50" control={<Radio />} label="50" />
                                        <FormControlLabel value="100" control={<Radio />} label="100" />
                                    </RadioGroup>
                                </FormControl>
                                <Button
                                    variant="contained"
                                    sx={{
                                        p: 2,
                                        fontWeight: "bold",
                                        mt: 1
                                    }}
                                    type="submit"
                                >Tambah</Button>
                            </form>
                        )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TambahBantuan