import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Kriteria = db.define('kriteria_tbl', {
    id_kriteria: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    nama: {
        type: DataTypes.STRING
    },
    nilai_bobot: {
        type: DataTypes.NUMBER
    },
    nilai_prioritas: {
        type: DataTypes.NUMBER
    },
    keterangan: {
        type: DataTypes.STRING
    },
    pilihan_satu: {
        type: DataTypes.STRING
    },
    pilihan_dua: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true
})

export default Kriteria