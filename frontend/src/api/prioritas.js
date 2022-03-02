import axios from "axios";

const PRIORITAS = {
    getAllPrioritas: () => {
        return axios.get(`/nilai-prioritas`)
    },
    savePrioritas: (data) => {
        return axios.post(`/nilai-prioritas`, data)
    },
    getPrioritasByUserIDandIdentitasPilihan: (id) => {
        return axios.get(`/nilai-prioritas/orderIdentitas/${id}`)
    },
    getPrioritasByUserID: (id) => {
        return axios.get(`/nilai-prioritas/${id}`)
    },
    deletePrioritasByUserID: (id) => {
        return axios.delete(`/nilai-prioritas/${id}`)
    }
}

export default PRIORITAS