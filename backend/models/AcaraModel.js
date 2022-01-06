import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Acara = db.define('acara_tbl', {
    id_acara: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    nama: {
        type: DataTypes.STRING
    },
    tanggal: {
        type: DataTypes.DATE
    },
    deskripsi: {
        type: DataTypes.STRING
    },
    banner: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true
})

export default Acara