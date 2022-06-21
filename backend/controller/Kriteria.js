import Kriteria from "../models/KriteriaModel.js";

export const getAllKriteria = async (req, res) => {
    try{
        const kriteria = await Kriteria.findAll({
            order: [
                ['identitas_kriteria', 'ASC']
            ]
        });
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