import axios from "axios";

const SURVEY = {
    getAllSurvey: () => {
        return axios.get(`/survey`)
    },
    getSurveyByNoKK: (no_kk) => {
        return axios.get(`/survey/${no_kk}`)
    },
    saveSurvey: (data) => {
        return axios.post(`/survey`, data)
    }
}

export default SURVEY