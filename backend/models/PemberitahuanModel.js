import { Sequelize } from "sequelize";
import db from "../config/database.js";
import User from "./UserModel.js";

const { DataTypes } = Sequelize;

const Pemberitahuan = db.define('pemberitahuan_tbl', {
    kd_pemberitahuan: {
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
    nama: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true
})

export default Pemberitahuan