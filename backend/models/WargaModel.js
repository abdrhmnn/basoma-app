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
    nilai_rekomendasi: {
        type: DataTypes.INTEGER
    },
    foto_rumah: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true
})

// Warga.belongsTo(User, {foreignKey: 'user_id'})

export default Warga