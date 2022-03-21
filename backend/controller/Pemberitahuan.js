import Pemberitahuan from "../models/PemberitahuanModel.js";

export const getAllPemberitahuan = async (req, res) => {
    try{
        const pemberitahuan = await Pemberitahuan.findAll();
        res.json(pemberitahuan);
    }catch(error){
        res.json({ message: error.message })
    }
}

export const getPemberitahuanByUserID = async (req, res) => {
    try{
        const pemberitahuan = await Pemberitahuan.findAll({
            where: {
                user_id: req.params.id
            }
        });
        res.json(pemberitahuan[0]);
    }catch(error){
        res.json({ message: error.message })
    }
}

export const createPemberitahuan = async (req, res) => {
    try{
        await Pemberitahuan.create(req.body);
        res.json({
            "message" : "Pemberitahuan berhasil dibuat!"
        });
    }catch(error){
        res.json({ message: error.message })
    }
}

export const deletePemberitahuan = async (req, res) => {
    try{
        await Pemberitahuan.destroy({
            where: {
                user_id: req.params.id
            }
        });
        res.json({
            "message" : "Pemberitahuan berhasil dihapus!"
        });
    }catch(error){
        res.json({ message: error.message })
    }
}