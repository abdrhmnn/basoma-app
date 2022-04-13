import axios from "axios";

const SURVEY = {
    getAllSurvey: () => {
        return axios.get(`/survey`)
    },
    saveSurvey: (data) => {
        return axios.post(`/survey`, data)
    }
}

export default SURVEY