import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const User = db.define('users', {
    user_id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    nm_depan: {
        type: DataTypes.STRING
    },
    nm_belakang: {
        type: DataTypes.STRING
    },
    username: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    role: {
        type: DataTypes.STRING
    },
    gambar: {
        type: DataTypes.STRING
    },
    status_pengisian: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true
})

export default User