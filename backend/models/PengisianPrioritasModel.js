import { Sequelize } from "sequelize";
import db from "../config/database.js";
import User from "./UserModel.js";
import Kriteria from "./KriteriaModel.js";

const { DataTypes } = Sequelize;

const NilaiPrioritas = db.define('pengisian_prioritas_tbl', {
    prioritas_id: {
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
    id_kriteria: {
        type: DataTypes.STRING,
        references: {
            model: Kriteria,
            key: 'id_kriteria'
        }
    },
    pilihan: {
        type: DataTypes.STRING,
    },
    total_nilai: {
        type: DataTypes.NUMBER
    }
    
}, {
    freezeTableName: true
})

export default NilaiPrioritas