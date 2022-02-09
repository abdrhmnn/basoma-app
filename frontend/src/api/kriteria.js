import axios from "axios";

const KRITERIA = {
    getAllKriteria: () => {
        return axios.get(`/kriteria`)
    }
}

export default KRITERIA