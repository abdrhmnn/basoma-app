import Alternatif from "../models/AlternatifModel.js";

export const getAllAlternatif = async (req, res) => {
    try{
        const alternatif = await Alternatif.findAll();
        res.json(alternatif);
    }catch(error){
        res.json({ message: error.message })
    }
}

export const getAlternatifByUserID = async (req, res) => {
    try{
        const alternatif = await Alternatif.findAll({
            where: {
                user_id: req.params.id
            }
        });
        res.json(alternatif[0]);
    }catch(error){
        res.json({ message: error.message })
    }
}

export const createAlternatif = async (req, res) => {
    try{
        await Alternatif.create(req.body);
        res.json({
            "message" : "Alternatif berhasil dibuat!"
        });
    }catch(error){
        res.json({ message: error.message })
    }
}