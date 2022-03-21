import { Sequelize } from "sequelize";
import db from "../config/database.js";
import User from "./UserModel.js";

const { DataTypes } = Sequelize;

const NilaiPrioritas = db.define('pengisian_prioritas_tbl', {
    id_prioritas: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.STRING,
        references: {
            model: User,
            key: 'user_id'
        }
    },
    pilihan: {
        type: DataTypes.STRING,
    },
    total_nilai: {
        type: DataTypes.NUMBER
    },
    identitas_pilihan: {
        type: DataTypes.NUMBER
    }
}, {
    freezeTableName: true
})

export default NilaiPrioritas