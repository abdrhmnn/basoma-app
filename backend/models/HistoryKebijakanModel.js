import { Sequelize } from "sequelize";
import db from "../config/database.js";
import User from "./UserModel.js";
import Warga from "./WargaModel.js";

const { DataTypes } = Sequelize;

const HistoryKebijakan = db.define('history_kebijakan_tbl', {
    id_history: {
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
    no_kk: {
        type: DataTypes.STRING,
        references: {
            model: Warga,
            key: 'no_kk'
        }
    },
    waktu_kebijakan: {
        type: DataTypes.STRING
    },
    keterangan: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true
})

HistoryKebijakan.hasMany(User, { foreignKey: 'user_id' });
HistoryKebijakan.belongsTo(User, { as: 'pengguna', foreignKey: 'user_id' });
HistoryKebijakan.hasMany(Warga, { foreignKey: 'no_kk' });
HistoryKebijakan.belongsTo(Warga, { as: 'warga', foreignKey: 'no_kk' });

export default HistoryKebijakan