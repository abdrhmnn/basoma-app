import axios from "axios";

const PEMBERITAHUAN = {
    getAllPemberitahuan: () => {
        return axios.get(`/pemberitahuan`)
    },
    getPemberitahuanByUserID: (id) => {
        return axios.get(`/pemberitahuan/id/${id}`)
    }
}

export default PEMBERITAHUAN