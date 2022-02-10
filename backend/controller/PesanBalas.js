import PesanBalas from "../models/PesanBalasModel.js";

export const getAllPesanBalas = async (req, res) => {
    try{
        const pesan_balas = await PesanBalas.findAll();
        res.json(pesan_balas);
    }catch(error){
        res.json({ message: error.message })
    }
}

export const createPesanBalas = async (req, res) => {
    try{
        await PesanBalas.create(req.body);
        res.json({
            "message" : "Pesan balas berhasil dibuat!"
        });
    }catch(error){
        res.json({ message: error.message })
    }
}