import express from "express";
import db from "./config/database.js";
import acaraRoutes from "./route/AcaraRoutes.js";
import masukanRoutes from "./route/MasukanRoutes.js";
import userRoutes from "./route/UserRoutes.js";
import bantuanRoutes from "./route/BantuanRoutes.js";
import kriteriaRoutes from "./route/KriteriaRoutes.js";
import wargaRoutes from "./route/WargaRoutes.js";
import nilaiPrioritasRoutes from "./route/PengisianPrioritasRoutes.js";
import pemberitahuanRoutes from "./route/PemberitahuanRoutes.js";
import cors from "cors";
import uploadRouter from "./route/UploadImgRouter.js";

const app = express();

try{
    await db.authenticate();
    console.log('berhasil');
}catch(error){
    console.error('gagal', error);
}

app.use(cors());
app.use(express.json());
app.use(express.static('public')); 
app.use('/acara', acaraRoutes)
app.use('/masukan', masukanRoutes)
app.use('/users', userRoutes)
app.use('/bantuan', bantuanRoutes)
app.use('/uploads', uploadRouter)
app.use('/kriteria', kriteriaRoutes)
app.use('/warga', wargaRoutes)
app.use('/nilai-prioritas', nilaiPrioritasRoutes)
app.use('/pemberitahuan', pemberitahuanRoutes)
app.use('/public', express.static('public'));
app.listen(5000, () => console.log(`Server sedang berjalan di port http://localhost:5000`))