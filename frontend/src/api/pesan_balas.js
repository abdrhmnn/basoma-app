import axios from "axios";

const PESAN_BALAS = {
    getAllPesanBalas: () => {
        return axios.get(`/pesan-balas`)
    },
    savePesanBalas: (props, pesanBalasID, userID, masukanID) => {
        return axios.post(`/pesan-balas`, {
            kd_pesan_balas: `PB_${pesanBalasID}`,
            user_id: `${userID}`,
            kd_masukan: `${masukanID}`,
            pesan_balas: `${props.pesan_balas}`
        })
    }
}

export default PESAN_BALAS