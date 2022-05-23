import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Warga from "./WargaModel.js";

const { DataTypes } = Sequelize;

const Survey = db.define('survey_tbl', {
    id_survey: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    no_kk: {
        type: DataTypes.STRING,
        references: {
            model: Warga,
            key: 'no_kk'
        }
    },
    verifikasi_kondisi: {
        type: DataTypes.STRING
    },
    keterangan: {
        type: DataTypes.STRING
    },
    identitas_survey: {
        type: DataTypes.INTEGER
    },
}, {
    freezeTableName: true
})

export default Survey