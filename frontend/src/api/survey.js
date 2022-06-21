import axios from "axios";

const SURVEY = {
    getAllSurvey: () => {
        return axios.get(`/survey`)
    },
    getSurveyByNoKK: (no_kk) => {
        return axios.get(`/survey/${no_kk}`)
    },
    getDataJoinSurvey: () => {
        return axios.get(`/survey/join-survey/cetak`)
    },
    getDetailDataJoinSurvey: (noKK) => {
        return axios.get(`/survey/join-survey/cetakDetail/${noKK}`)
    },
    saveSurvey: (data) => {
        return axios.post(`/survey`, data)
    },
    deleteSurveyByNoKK: (no_kk) => {
        return axios.delete(`/survey/${no_kk}`)
    },
}

export default SURVEY