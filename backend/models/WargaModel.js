import { Sequelize } from "sequelize";
import db from "../config/database.js";
import User from "./UserModel.js";
import Bantuan from "./BantuanModel.js";

const { DataTypes } = Sequelize;

const Warga = db.define('warga_tbl', {
    no_kk: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    no_ktp: {
        type: DataTypes.STRING
    },
    user_id: {
        type: DataTypes.STRING,
        references: {
            model: User,
            key: 'user_id'
        }
    },
    id_bantuan: {
        type: DataTypes.STRING,
        references: {
            model: Bantuan,
            key: 'id_bantuan'
        }
    },
    nama_lengkap: {
        type: DataTypes.STRING
    },
    alamat: {
        type: DataTypes.STRING
    },
    no_telepon: {
        type: DataTypes.STRING
    },
    status_rekomendasi: {
        type: DataTypes.STRING
    },
    foto_kk: {
        type: DataTypes.STRING
    },
    foto_ktp: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true
})

// Warga.hasMany(HistoryKebijakan)
// HistoryKebijakan.belongsTo(Warga)

export default Warga