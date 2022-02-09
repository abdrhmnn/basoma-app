import NilaiPrioritas from "../models/PengisianPrioritasModel.js";

export const getAllNilaiPrioritas = async (req, res) => {
    try{
        const nilai_prioritas = await NilaiPrioritas.findAll();
        res.json(nilai_prioritas);
    }catch(error){
        res.json({ message: error.message })
    }
}

export const getNilaiPrioritasByUserID = async (req, res) => {
    try{
        const nilai_prioritas = await NilaiPrioritas.findAll({
            where: {
                user_id: req.params.id
            }
        });
        res.json(nilai_prioritas[0]);
    }catch(error){
        res.json({ message: error.message })
    }
}

export const getNilaiPrioritasByUserIDandIdentity = async (req, res) => {
    try{
        const nilai_prioritas = await NilaiPrioritas.findAll({
            where: {
                user_id: req.params.id
            },
            order: [
                ['identitas_pilihan', 'ASC']
            ]
        });
        res.json(nilai_prioritas);
    }catch(error){
        res.json({ message: error.message })
    }
}

export const createNilaiPrioritas = async (req, res) => {
    try{
        await NilaiPrioritas.create(req.body);
        res.json({
            "message" : "Nilai Prioritas berhasil dibuat!"
        });
    }catch(error){
        res.json({ message: error.message })
    }
}