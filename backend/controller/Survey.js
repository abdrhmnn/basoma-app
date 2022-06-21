import Kriteria from "../models/KriteriaModel.js";
import NilaiPrioritas from "../models/PengisianPrioritasModel.js";
import Survey from "../models/SurveyModel.js";
import User from "../models/UserModel.js";
import Warga from "../models/WargaModel.js";

export const getAllSurvey = async (req, res) => {
    try{
        const survey = await Survey.findAll();
        res.json(survey);
    }catch(error){
        res.json({ message: error.message })
    }
}

export const createSurvey = async (req, res) => {
    try{
        await Survey.create(req.body);
        res.json({
            "message" : "Survey berhasil dibuat!"
        });
    }catch(error){
        res.json({ message: error.message })
    }
}

export const getSurveyByID = async (req, res) => {
    try{
        const survey = await Survey.findAll({
            where: {
                no_kk: req.params.id
            },
            order: [
                ['identitas_survey', 'ASC']
            ]
        });
        res.json(survey);
    }catch(error){
        res.json({ message: error.message })
    }
}

export const deleteSurvey = async (req, res) => {
    try{
        await Survey.destroy({
            where: {
                no_kk: req.params.id
            }
        });
        res.json({
            "message" : "Survey berhasil dihapus!"
        });
    }catch(error){
        res.json({ message: error.message })
    }
}

export const getSurveyInTableWarga = async (req, res) => {
    try{
        const survey = await Survey.findAll({
            // attributes: {
            //     include: [
            //         "id_history",
            //         "user_id",
            //         "no_kk",
            //         [
            //             Sequelize.fn
            //             (
            //               "DATE_FORMAT", 
            //               Sequelize.col("waktu_kebijakan"), 
            //               `%d-%m-%Y %H:%i`
            //             ),
            //             "waktu_kebijakan",
            //           ],
            //           "keterangan"
            //     ]
            // },
            include: [
                { 
                    model: User,
                    as: 'pengguna', 
                    required: true,
                },
                { 
                    model: Warga,
                    as: 'warga', 
                    required: true,
                },
            ]
        });
        res.json(survey);
    }catch(error){
        res.json({ message: error.message })
    }
}

export const getDetailSurveyInTableWarga = async (req, res) => {
    try{
        const survey = await Survey.findAll({
            where: {
                no_kk: req.params.id
            },
            order: [
                ['identitas_survey', 'ASC']
            ],
            include: [
                { 
                    model: User,
                    as: 'pengguna', 
                    required: true,
                },
                { 
                    model: Warga,
                    as: 'warga', 
                    required: true,
                },
                { 
                    model: Kriteria,
                    as: 'kriteria', 
                    required: true,
                },
                { 
                    model: NilaiPrioritas,
                    as: 'prioritas', 
                    required: true,
                },
            ]
        });
        res.json(survey);
    }catch(error){
        res.json({ message: error.message })
    }
}