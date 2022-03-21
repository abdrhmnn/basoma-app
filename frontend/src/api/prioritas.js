import axios from "axios";

const PRIORITAS = {
    getAllPrioritas: () => {
        return axios.get(`/nilai-prioritas`)
    },
    getPrioritasByUserIDandIdentitasPilihan: (id) => {
        return axios.get(`/nilai-prioritas/orderIdentitas/${id}`)
    },
    savePrioritas: (data) => {
        return axios.post(`/nilai-prioritas`, data)
    },
    deletePrioritasByUserID: (id) => {
        return axios.delete(`/nilai-prioritas/${id}`)
    }
}

export default PRIORITAS