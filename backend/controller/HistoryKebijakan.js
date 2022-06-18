import { Sequelize } from "sequelize";
import HistoryKebijakan from "../models/HistoryKebijakanModel.js";
import User from "../models/UserModel.js";
import Warga from "../models/WargaModel.js";

export const getAllHistoryKebijakan = async (req, res) => {
    try{
        const historyKebijakan = await HistoryKebijakan.findAll({
            attributes: {
                include: [
                    [
                        Sequelize.fn
                        (
                          "DATE_FORMAT", 
                          Sequelize.col("waktu_kebijakan"), 
                          `%d-%m-%Y %H:%i`
                        ),
                        "waktu_kebijakan",
                      ]
                ]
            }
        });
        res.json(historyKebijakan);
    }catch(error){
        res.json({ message: error.message })
    }
}

export const getHistoryByID = async (req, res) => {
    try{
        const history = await HistoryKebijakan.findAll({
            where: {
                id_history: req.params.id
            },
            attributes: {
                include: [
                    "id_history",
                    "user_id",
                    "no_kk",
                    [
                        Sequelize.fn
                        (
                          "DATE_FORMAT", 
                          Sequelize.col("waktu_kebijakan"), 
                          `%d-%m-%Y %H:%i`
                        ),
                        "waktu_kebijakan",
                      ],
                      "keterangan"
                ]
            }
        });
        res.json(history[0]);
    }catch(error){
        res.json({ message: error.message })
    }
}

export const createHistoryKebijakan = async (req, res) => {
    try{
        await HistoryKebijakan.create(req.body);
        res.json({
            "message" : "History kebijakan berhasil dibuat!"
        });
    }catch(error){
        res.json({ message: error.message })
    }
}

export const deleteHistoryKebijakan = async (req, res) => {
    try{
        await HistoryKebijakan.destroy({
            where: {
                no_kk: req.params.id
            }
        });
        res.json({
            "message" : "History kebijakan berhasil dihapus!"
        });
    }catch(error){
        res.json({ message: error.message })
    }
}

export const getHistoryInTableUser = async (req, res) => {
    try{
        const history = await HistoryKebijakan.findAll({
            attributes: {
                include: [
                    "id_history",
                    "user_id",
                    "no_kk",
                    [
                        Sequelize.fn
                        (
                          "DATE_FORMAT", 
                          Sequelize.col("waktu_kebijakan"), 
                          `%d-%m-%Y %H:%i`
                        ),
                        "waktu_kebijakan",
                      ],
                      "keterangan"
                ]
            },
            include: [
                { 
                    model: User,
                    as: 'pengguna', 
                    required: true,
                },
                { 
                    model: Warga,
                    as: 'warga', 
                    required: true,
                },
            ]
        });
        res.json(history);
    }catch(error){
        res.json({ message: error.message })
    }
}

export const getHistoryInTableUserByID = async (req, res) => {
    try{
        const history = await HistoryKebijakan.findAll({
            where: {
                user_id: req.params.id
            },
            attributes: {
                include: [
                    "id_history",
                    "user_id",
                    "no_kk",
                    [
                        Sequelize.fn
                        (
                          "DATE_FORMAT", 
                          Sequelize.col("waktu_kebijakan"), 
                          `%d-%m-%Y %H:%i`
                        ),
                        "waktu_kebijakan",
                      ],
                      "keterangan"
                ]
            },
            include: [
                { 
                    model: User,
                    as: 'pengguna', 
                    required: true,
                    // distinct: true
                    // where : { user_id : Sequelize.col('user_id') }
                },
                { 
                    model: Warga,
                    as: 'warga', 
                    required: true,
                    // where : { user_id : Sequelize.col('user_id') }
                },
            ]
        });
        res.json(history);
    }catch(error){
        res.json({ message: error.message })
    }
}