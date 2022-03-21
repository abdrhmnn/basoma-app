import axios from "axios";

const PEMBERITAHUAN = {
    getAllPemberitahuan: () => {
        return axios.get(`/pemberitahuan`)
    },
    getPemberitahuanByUserID: (id) => {
        return axios.get(`/pemberitahuan/id/${id}`)
    },
    savePemberitahuan: (pemberitahuanId, userId, alasan) => {
        return axios.post(`/pemberitahuan`, {
            id_pemberitahuan: `KP_${pemberitahuanId}`,
            user_id: userId,
            nama: `Pemberitahuan pendaftaran bantuan`,
            alasan: alasan
        })
    },
    deletePemberitahuanByUserID: (id) => {
        return axios.delete(`/pemberitahuan/${id}`)
    }
}

export default PEMBERITAHUAN