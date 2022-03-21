import Bantuan from "../models/BantuanModel.js";

export const getAllBantuan = async (req, res) => {
    try{
        const bantuans = await Bantuan.findAll();
        res.json(bantuans);
    }catch(error){
        res.json({ message: error.message })
    }
}

export const getBantuanByID = async (req, res) => {
    try{
        const bantuan = await Bantuan.findAll({
            where: {
                id_bantuan: req.params.id
            }
        });
        res.json(bantuan[0]);
    }catch(error){
        res.json({ message: error.message })
    }
}

export const createBantuan = async (req, res) => {
    try{
        await Bantuan.create(req.body);
        res.json({
            "message" : "Bantuan berhasil dibuat!"
        });
    }catch(error){
        res.json({ message: error.message })
    }
}

export const updateBantuan = async (req, res) => {
    try{
        await Bantuan.update(req.body, {
            where: {
                id_bantuan: req.params.id
            }
        });
        res.json({
            "message" : "Data Bantuan berhasil diubah!"
        });
    }catch(error){
        res.json({ message: error.message })
    }
}

export const deleteBantuan = async (req, res) => {
    try{
        await Bantuan.destroy({
            where: {
                id_bantuan: req.params.id
            }
        });
        res.json({
            "message" : "Bantuan berhasil dihapus!"
        });
    }catch(error){
        res.json({ message: error.message })
    }
}