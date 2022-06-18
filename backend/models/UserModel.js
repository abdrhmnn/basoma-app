import { Sequelize } from "sequelize";
import db from "../config/database.js";
// import HistoryKebijakan from "./HistoryKebijakanModel.js";
// import Warga from "./WargaModel.js";

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

// User.belongsTo(HistoryKebijakan, { foreignKey : 'user_id'});
// HistoryKebijakan.hasMany(User, { foreignKey : 'user_id'});
// User.hasMany(Warga, {foreignKey: 'user_id'})

export default User