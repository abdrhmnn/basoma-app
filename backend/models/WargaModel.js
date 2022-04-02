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
            key: 'bantuan_id'
        }
    },
    nama_lengkap: {
        type: DataTypes.STRING
    },
    alamat: {
        type: DataTypes.STRING
    },
    konsumsi_makanan: {
        type: DataTypes.STRING
    },
    kondisi_pakaian: {
        type: DataTypes.STRING
    },
    kesehatan: {
        type: DataTypes.STRING
    },
    asset: {
        type: DataTypes.STRING
    },
    pendidikan: {
        type: DataTypes.STRING
    },
    penghasilan: {
        type: DataTypes.STRING
    },
    luas_bangunan: {
        type: DataTypes.STRING
    },
    foto_kk: {
        type: DataTypes.STRING
    },
    foto_ktp: {
        type: DataTypes.STRING
    },
    status_penerimaan: {
        type: DataTypes.STRING
    },
    nilai_rangking: {
        type: DataTypes.INTEGER
    }
}, {
    freezeTableName: true
})

export default Warga