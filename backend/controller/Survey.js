import Survey from "../models/SurveyModel.js";

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