import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Bantuan = db.define('bantuan_tbl', {
    kd_bantuan: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    nama: {
        type: DataTypes.STRING
    },
    kapasitas: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true
})

export default Bantuan