import axios from "axios";

const PRIORITAS = {
    getAllPrioritas: () => {
        return axios.get(`/nilai-prioritas`)
    },
    savePrioritas: (pilihan, userID, totalNilai, identitasNilai) => {
        return axios.post(`/nilai-prioritas`, {
            user_id: userID,
            pilihan: pilihan,
            total_nilai: totalNilai,
            identitas_pilihan: identitasNilai
        })
    },
    getPrioritasByUserIDandIdentitasPilihan: (id) => {
        return axios.get(`/nilai-prioritas/orderIdentitas/${id}`)
    },
    getPrioritasByUserID: (id) => {
        return axios.get(`/nilai-prioritas/${id}`)
    }
}

export default PRIORITAS