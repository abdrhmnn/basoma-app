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
