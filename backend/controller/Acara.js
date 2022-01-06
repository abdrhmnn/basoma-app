import Acara from "../models/AcaraModel.js";

export const getAllAcara = async (req, res) => {
    try{
        const acara = await Acara.findAll();
        res.json(acara);
    }catch(error){
        res.json({ message: error.message })
    }
}

export const createAcara = async (req, res) => {
    try{
        await Acara.create(req.body);
        res.json({
            "message" : "Acara berhasil dibuat!"
        });
    }catch(error){
        res.json({ message: error.message })
    }
}

export const getAcaraByID = async (req, res) => {
    try{
        const acara = await Acara.findAll({
            where: {
                id_acara: req.params.id
            }
        });
        res.json(acara[0]);
    }catch(error){
        res.json({ message: error.message })
    }
}

export const updateAcara = async (req, res) => {
    try{
        await Acara.update(req.body, {
            where: {
                id_acara: req.params.id
            }
        });
        res.json({
            "message" : "Acara berhasil diubah!"
        });
    }catch(error){
        res.json({ message: error.message })
    }
}

export const deleteAcara = async (req, res) => {
    try{
        await Acara.destroy({
            where: {
                id_acara: req.params.id
            }
        });
        res.json({
            "message" : "Acara berhasil dihapus!"
        });
    }catch(error){
        res.json({ message: error.message })
    }
}