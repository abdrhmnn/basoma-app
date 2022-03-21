import { Sequelize } from "sequelize";
import db from "../config/database.js";
import User from "./UserModel.js";

const { DataTypes } = Sequelize;

const Masukan = db.define('masukan_tbl', {
    id_masukan: {
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
    nm_depan: {
        type: DataTypes.STRING
    },
    nm_belakang: {
        type: DataTypes.STRING
    },
    pesan: {
        type: DataTypes.STRING
    },
}, {
    freezeTableName: true
})


// User.hasMany(Masukan, )

export default Masukan