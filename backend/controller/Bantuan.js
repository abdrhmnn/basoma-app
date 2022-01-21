import Bantuan from "../models/BantuanModel.js";


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
                kd_bantuan: req.params.id
            }
        });
        res.json(bantuan[0]);
    }catch(error){
        res.json({ message: error.message })
    }
}

export const getBantuanByNama = async (req, res) => {
    try{
        const bantuanNama = await Bantuan.findAll({
            where: {
                nama: req.params.nama
            }
        });
        res.json(bantuanNama);
    }catch(error){
        res.json({ message: error.message })
    }
}

export const getBantuanByKapasitasAndStatus = async (req, res) => {
    try{
        const bantuanFilter = await Bantuan.findAll({
            where: {
                kapasitas: req.params.kapasitas,
                status: req.params.status
            }
        });
        res.json(bantuanFilter);
    }catch(error){
        res.json({ message: error.message })
    }
}

export const deleteBantuan = async (req, res) => {
    try{
        await Bantuan.destroy({
            where: {
                kd_bantuan: req.params.id
            }
        });
        res.json({
            "message" : "Bantuan berhasil dihapus!"
        });
    }catch(error){
        res.json({ message: error.message })
    }
}