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
    }
}, {
    freezeTableName: true
})

const Masukan = db.define('masukan_tbl', {
    kd_masukan: {
        type: DataTypes.STRING,
        primaryKey: true
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
    user_id: {
        type: DataTypes.STRING,
        references: {
            model: User,
            key: 'user_id'
        }
    }
}, {
    freezeTableName: true
})


// User.hasMany(Masukan, )

export default Masukan