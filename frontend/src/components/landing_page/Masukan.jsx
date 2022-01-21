import React, { useEffect, useState } from "react";

// components or files
import Navbar from "./Navbar";
import SuccessFeedback from "./SuccessFeedback";
import Footer from "./Footer";
import { kuki } from "../../kuki";

// npm packages
import { TextField, Button, Alert } from "@mui/material";
import * as Yup from "yup";
import { Formik, Field } from 'formik';
import axios from "axios";

const Masukan = ({ data }) => {

    const [isLoad, setIsLoad] = useState(true)
    const [isShow, setIsShow] = useState(false)
    const [masukan, setMasukan] = useState([])

    const schemaObj = Yup.object({
        nm_depan: Yup.string().required("Nama depan tidak boleh kosong!"),
        nm_belakang: Yup.string().required("Nama belakang tidak boleh kosong!"),
        pesan: Yup.string().required("Silahkan isi pesan terlebih dahulu!"),
    });

    useEffect(() => {
        document.title = "Masukan Bantuan Sosial Masyarakat"
        getAllMasukan()
    }, [])

    const getAllMasukan = async () => {
        const response = await axios.get('http://localhost:5000/masukan');
        setMasukan(response.data)
    }

    return(
        <div>
            <Navbar data="true"/>
            {isLoad ? 
                <div className="masukan">
                { kuki.get("user_id") || isShow ? null :
                <Alert
                    onClose={() => { setIsShow(true) }}
                    variant="outlined"
                    severity="warning"
                    sx={{ mb: 2, mt: 3 }}
                >
                    <span style={{ fontWeight: "bold" }}>PERHATIKAN!</span>, silahkan login terlebih dahulu untuk bisa mengisi form feedback.
                </Alert>
                }
                    <h2>Feedback Bantuan Sosial Masyarakat</h2>
                    <div className="feed-form">
                        <Formik
                            initialValues={{
                                kd_masukan: '',
                                nm_depan: '',
                                nm_belakang: '',
                                pesan: '',
                                user_id: ''
                            }}
                            validationSchema={schemaObj}
                            onSubmit={(values, actions) => {
                                if(kuki.get("user_id")){
                                    axios.post('http://localhost:5000/masukan', {
                                        kd_masukan: `MS_${masukan.length + 1}`,
                                        nm_depan: values.nm_depan,
                                        nm_belakang: values.nm_belakang,
                                        pesan: values.pesan,
                                        user_id: kuki.get("user_id")
                                    })
                                }else{
                                    return
                                }
                                setIsLoad(false)
                            }}
                        >
                        {(props) => (
                            <form onSubmit={props.handleSubmit}>
                                <Field
                                    name="nm_depan"
                                    variant="outlined"
                                    label="Nama Depan"
                                    as={TextField}
                                    error={props.touched.nm_depan && props.errors.nm_depan ? true : false}
                                    helperText={props.touched.nm_depan && props.errors.nm_depan}
                                />
                                <Field
                                    name="nm_belakang"
                                    variant="outlined"
                                    label="Nama Belakang"
                                    as={TextField}
                                    error={props.touched.nm_belakang && props.errors.nm_belakang ? true : false}
                                    helperText={props.touched.nm_belakang && props.errors.nm_belakang}
                                />
                                <Field
                                    name="pesan"
                                    variant="outlined"
                                    label="Pesan Feedback"
                                    multiline
                                    rows={6}
                                    as={TextField}
                                    error={props.touched.pesan && props.errors.pesan ? true : false}
                                    helperText={props.touched.pesan && props.errors.pesan}
                                />
                                <Button
                                    variant="contained"
                                    sx={{
                                        p: 2,
                                        fontWeight: "bold"
                                    }}
                                    type="submit"
                                    disabled={kuki.get("user_id") ? false : true}
                                >Kirim</Button>
                            </form>
                        )}
                        </Formik>
                    </div>
                </div>
                : 
                <SuccessFeedback />
            }
            <Footer class_masukan="masukan_foot" active_masukan={data} />
        </div>
    )
}

export default Masukan