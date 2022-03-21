import axios from "axios";

const KRITERIA = {
    getAllKriteria: () => {
        return axios.get(`/kriteria`)
    },
    updateKriteriaByID: (id, data) => {
        return axios.patch(`/kriteria/${id}`, data)
    }
}

export default KRITERIA