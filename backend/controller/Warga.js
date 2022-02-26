import Warga from "../models/WargaModel.js";

export const getAllWarga = async (req, res) => {
    try{
        const warga = await Warga.findAll();
        res.json(warga);
    }catch(error){
        res.json({ message: error.message })
    }
}

export const createWarga = async (req, res) => {
    try{
        await Warga.create(req.body);
        res.json({
            "message" : "Warga berhasil dibuat!"
        });
    }catch(error){
        res.json({ message: error.message })
    }
}

export const getWargaByBantuanID = async (req, res) => {
    try{
        const warga = await Warga.findAll({
            where: {
                kd_bantuan: req.params.id
            }
        });
        res.json(warga);
    }catch(error){
        res.json({ message: error.message })
    }
}

export const getWargaByNoKTP = async (req, res) => {
    try{
        const warga = await Warga.findAll({
            where: {
                no_ktp: req.params.id
            }
        });
        res.json(warga[0]);
    }catch(error){
        res.json({ message: error.message })
    }
}

export const getAllWargaAndSortByNilaiRangking = async (req, res) => {
    try{
        const warga = await Warga.findAll({
            where: {
                kd_bantuan: req.params.id
            },
            order: [
                ['nilai_rangking', 'DESC']
            ]
        });
        res.json(warga);
    }catch(error){
        res.json({ message: error.message })
    }
}
