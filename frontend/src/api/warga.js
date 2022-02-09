import axios from "axios";

const WARGA = {
    saveWarga: (props, userID, penghasilan, pendidikan, luasRumah, imgKTP, imgBangunan) => {
        return axios.post(`/warga`, {
            no_ktp: props.nik,
            user_id: userID,
            nama_lengkap: props.nm_lengkap,
            alamat: props.alamat,
            pekerjaan: props.pekerjaan,
            penghasilan: penghasilan,
            pendidikan: pendidikan,
            luas_bangunan: luasRumah,
            sumber_penerangan_rumah: props.sumber_penerangan,
            foto_ktp: imgKTP.name,
            foto_bangunan_rumah: imgBangunan.name,
        })
    }
}

export default WARGA