import { Sequelize } from "sequelize";
import db from "../config/database.js";
import User from "./UserModel.js";

const { DataTypes } = Sequelize;

const Alternatif = db.define('data_alternatif_tbl', {
    id_alternatif: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.STRING,
        references: {
            model: User,
            key: 'user_id'
        }
    },
    nilai_ci: {
        type: DataTypes.INTEGER
    },
    nilai_cr: {
        type: DataTypes.INTEGER
    }
}, {
    freezeTableName: true
})

export default Alternatif