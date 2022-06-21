import axios from "axios";

const PEMBERITAHUAN = {
    getAllPemberitahuan: () => {
        return axios.get(`/pemberitahuan`)
    },
    getPemberitahuanByUserID: (id) => {
        return axios.get(`/pemberitahuan/id/${id}`)
    },
    savePemberitahuan: (pemberitahuanId, userId, status) => {
        return axios.post(`/pemberitahuan`, {
            id_pemberitahuan: `KP_${pemberitahuanId}`,
            user_id: userId,
            status_pemberitahuan: status,
        })
    },
    deletePemberitahuanByUserID: (id) => {
        return axios.delete(`/pemberitahuan/${id}`)
    }
}

export default PEMBERITAHUAN