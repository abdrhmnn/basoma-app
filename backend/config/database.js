import { Sequelize } from "sequelize";

const db = new Sequelize('basoma_db', 'root', '', {
    host: "localhost",
    dialect: "mysql",
    define: {
        timestamps: false
    }
});

export default db;