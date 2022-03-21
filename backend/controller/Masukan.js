import Masukan from "../models/MasukanModel.js";

export const getAllMasukan = async (req, res) => {
    try{
        const masukan = await Masukan.findAll();
        res.json(masukan);
    }catch(error){
        res.json({ message: error.message })
    }
}

export const getMasukanByID = async (req, res) => {
    try{
        const masukan = await Masukan.findAll({
            where: {
                kd_masukan: req.params.id
            }
        });
        res.json(masukan[0]);
    }catch(error){
        res.json({ message: error.message })
    }
}

export const createMasukan = async (req, res) => {
    try{
        await Masukan.create(req.body);
        res.json({
            "message" : "Masukan berhasil dibuat!"
        });
    }catch(error){
        res.json({ message: error.message })
    }
}