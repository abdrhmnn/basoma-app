import express from "express";
import db from "./config/database.js";
import acaraRoutes from "./route/AcaraRoutes.js";
import masukanRoutes from "./route/MasukanRoutes.js";
import userRoutes from "./route/UserRoutes.js";
import cors from "cors";

const app = express();

try{
    await db.authenticate();
    console.log('berhasil');
}catch(error){
    console.error('gagal', error);
}

app.use(cors());
app.use(express.json());
app.use('/acara', acaraRoutes)
app.use('/masukan', masukanRoutes)
app.use('/users', userRoutes)
app.listen(5000, () => console.log(`Server sedang berjalan di port http://localhost:5000`))