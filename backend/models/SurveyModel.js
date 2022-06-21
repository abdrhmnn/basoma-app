import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Warga from "./WargaModel.js";
import User from "./UserModel.js";
import Kriteria from "./KriteriaModel.js";
import NilaiPrioritas from "./PengisianPrioritasModel.js";

const { DataTypes } = Sequelize;

const Survey = db.define('survey_tbl', {
    id_survey: {
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
    no_kk: {
        type: DataTypes.STRING,
        references: {
            model: Warga,
            key: 'no_kk'
        }
    },
    id_kriteria: {
        type: DataTypes.STRING,
        references: {
            model: Kriteria,
            key: 'id_kriteria'
        }
    },
    id_prioritas: {
        type: DataTypes.STRING,
        references: {
            model: NilaiPrioritas,
            key: 'id_prioritas'
        }
    },
    verifikasi_kondisi: {
        type: DataTypes.STRING
    },
    keterangan: {
        type: DataTypes.STRING
    },
    identitas_survey: {
        type: DataTypes.INTEGER
    },
}, {
    freezeTableName: true
})

Survey.hasMany(User, { foreignKey: 'user_id' });
Survey.belongsTo(User, { as: 'pengguna', foreignKey: 'user_id' });
Survey.hasMany(Warga, { foreignKey: 'no_kk' });
Survey.belongsTo(Warga, { as: 'warga', foreignKey: 'no_kk' });

Survey.hasMany(Kriteria, { foreignKey: 'id_kriteria' });
Survey.belongsTo(Kriteria, { as: 'kriteria', foreignKey: 'id_kriteria' });
Survey.hasMany(NilaiPrioritas, { foreignKey: 'id_prioritas' });
Survey.belongsTo(NilaiPrioritas, { as: 'prioritas', foreignKey: 'id_prioritas' });

export default Survey