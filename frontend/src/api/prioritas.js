import axios from "axios";

const PRIORITAS = {
    getAllPrioritas: () => {
        return axios.get(`/nilai-prioritas`)
    },
    getPrioritasByUserID: (userId) => {
        return axios.get(`/nilai-prioritas/userId/${userId}`)
    },
    getPrioritasByUserIDandIdentitasPilihan: (id) => {
        return axios.get(`/nilai-prioritas/orderIdentitas/${id}`)
    },
    savePrioritas: (data) => {
        return axios.post(`/nilai-prioritas`, data)
    },
    updatePrioritas: (identitas, data) => {
        return axios.patch(`/nilai-prioritas/update/warga/${identitas}`, data)
    },
    deletePrioritasByUserID: (id) => {
        return axios.delete(`/nilai-prioritas/${id}`)
    }
}

export default PRIORITAS