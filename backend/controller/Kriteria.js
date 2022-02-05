import Kriteria from "../models/KriteriaModel.js";

export const getAllKriteria = async (req, res) => {
    try{
        const kriteria = await Kriteria.findAll();
        res.json(kriteria);
    }catch(error){
        res.json({ message: error.message })
    }
}

export const updateKriteria = async (req, res) => {
    try{
        await Kriteria.update(req.body, {
            where: {
                id_kriteria: req.params.id
            }
        });
        res.json({
            "message" : "Kriteria berhasil diubah!"
        });
    }catch(error){
        res.json({ message: error.message })
    }
}

export const deleteKriteria = async (req, res) => {
    try{
        await Kriteria.destroy({
            where: {
                id_kriteria: req.params.id
            }
        });
        res.json({
            "message" : "Kriteria berhasil dihapus!"
        });
    }catch(error){
        res.json({ message: error.message })
    }
}

export const getKriteriaByID = async (req, res) => {
    try{
        const kriteria = await Kriteria.findAll({
            where: {
                id_kriteria: req.params.id
            }
        });
        res.json(kriteria);
    }catch(error){
        res.json({ message: error.message })
    }
}