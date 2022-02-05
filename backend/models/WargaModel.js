import { Sequelize } from "sequelize";
import db from "../config/database.js";
import User from "./UserModel.js";

const { DataTypes } = Sequelize;

const Warga = db.define('warga_tbl', {
    no_ktp: {
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
    nama_lengkap: {
        type: DataTypes.STRING
    },
    alamat: {
        type: DataTypes.STRING
    },
    pekerjaan: {
        type: DataTypes.STRING
    },
    penghasilan: {
        type: DataTypes.STRING
    },
    pendidikan: {
        type: DataTypes.STRING
    },
    luas_bangunan: {
        type: DataTypes.STRING
    },
    sumber_penerangan_rumah: {
        type: DataTypes.STRING
    },
    foto_ktp: {
        type: DataTypes.STRING
    },
    foto_bangunan_rumah: {
        type: DataTypes.STRING
    },
}, {
    freezeTableName: true
})

export default Warga