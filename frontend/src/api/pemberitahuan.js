import axios from "axios";

const PEMBERITAHUAN = {
    getAllPemberitahuan: () => {
        return axios.get(`/pemberitahuan`)
    }
}

export default PEMBERITAHUAN