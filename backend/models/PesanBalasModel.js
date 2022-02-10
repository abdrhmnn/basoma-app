import { Sequelize } from "sequelize";
import db from "../config/database.js";
import User from "./UserModel.js";
import Masukan from "./MasukanModel.js";

const { DataTypes } = Sequelize;

const PesanBalas = db.define('pesan_balas_tbl', {
    kd_pesan_balas: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.STRING,
        references: {
            model: User,
            key: 'user_id'
        }
    },
    kd_masukan: {
        type: DataTypes.STRING,
        references: {
            model: Masukan,
            key: 'kd_masukan'
        }
    },
    pesan_balas: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true
})

export default PesanBalas