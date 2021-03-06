import HistoryKebijakan from "../models/HistoryKebijakanModel.js";
import { Sequelize } from "sequelize";
import Warga from "../models/WargaModel.js";

export const getAllWarga = async (req, res) => {
    try{
        const warga = await Warga.findAll();
        res.json(warga);
    }catch(error){
        res.json({ message: error.message })
    }
}

export const getWargaByBantuanID = async (req, res) => {
    try{
        const warga = await Warga.findAll({
            where: {
                id_bantuan: req.params.id
            },
            order: [
                ['nilai_rekomendasi', 'DESC']
            ]
        });
        res.json(warga);
    }catch(error){
        res.json({ message: error.message })
    }
}

export const getWargaByNoKK = async (req, res) => {
    try{
        const warga = await Warga.findAll({
            where: {
                no_kk: req.params.id
            }
        });
        res.json(warga[0]);
    }catch(error){
        res.json({ message: error.message })
    }
}

export const getWargaByUserID = async (req, res) => {
    try{
        const warga = await Warga.findAll({
            where: {
                user_id: req.params.id
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
                id_bantuan: req.params.id
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

export const updateWarga = async (req, res) => {
    try{
        await Warga.update(req.body, {
            where: {
                no_kk: req.params.id
            }
        });
        res.json({
            "message" : "Warga berhasil diubah!"
        });
    }catch(error){
        res.json({ message: error.message })
    }
}

export const updateWargaByUserID = async (req, res) => {
    try{
        await Warga.update(req.body, {
            where: {
                user_id: req.params.id
            }
        });
        res.json({
            "message" : "Warga berhasil diubah!"
        });
    }catch(error){
        res.json({ message: error.message })
    }
}

export const deleteWarga = async (req, res) => {
    try{
        await Warga.destroy({
            where: {
                user_id: req.params.id
            }
        });
        res.json({
            "message" : "Warga berhasil dihapus!"
        });
    }catch(error){
        res.json({ message: error.message })
    }
}

export const deleteWargaByBantuanID = async (req, res) => {
    try{
        await Warga.destroy({
            where: {
                id_bantuan: req.params.id
            }
        });
        res.json({
            "message" : "Warga berhasil dihapus!"
        });
    }catch(error){
        res.json({ message: error.message })
    }
}

// export const getJoinHistoryAndWarga = async (req, res) => {
//     try{
//         const warga = await Warga.findAll({
//             include: [{
//                 model: HistoryKebijakan,
//                 required: true
//             }]
//         });
        
//         console.log(JSON.stringify(warga, null, 2))
//     }catch(error){
//         res.json({ message: error.message })
//     }
// }