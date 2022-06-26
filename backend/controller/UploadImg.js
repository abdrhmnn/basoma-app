import multer from "multer"
import path from "path";
import * as fs from 'fs';

const DIR_IMG_USER = 'public/user'
const DIR_IMG_RUMAH = 'public/frumah'
const DIR_IMG_BANTUAN = 'public/bantuan'

const storageUser = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/user')
    },
        filename: function (req, file, cb) {
        cb(null, file.originalname )
    }
})

const storageFormRumah = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/frumah')
    },
    filename: function (req, file, cb) {
        const time = new Date()
        // let fn = 'IMG' + time.getSeconds() + path.extname(file.originalname);
        cb(null, file.originalname )
    }
})

const storageBannerBantuan = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/bantuan')
    },
        filename: function (req, file, cb) {
        cb(null, file.originalname )
    }
})

const uploadImgUser = multer({ storage: storageUser }).single('gambar')
const uploadFormRumah = multer({ storage: storageFormRumah }).single('gambar_form_rumah')
const uploadBannerBantuan = multer({ storage: storageBannerBantuan }).single('gambar_tambah_bantuan')

export const saveImgUser = (req, res) => {
    uploadImgUser(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
    
        return res.status(200).send(req.file)
    })
}

export const saveImgFormRumah = (req, res) => {
    uploadFormRumah(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
    
        return res.status(200).send(req.file)
    })
}

export const saveImgBannerBantuan = (req, res) => {
    uploadBannerBantuan(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
    
        return res.status(200).send(req.file)
    })
}

export const deleteImgUser = (req, res) => {
    if(!req.params.imagename){
        console.log("No file received");
        return res.status(500).json('no file received')
    }else{
        console.log('file received');
        fs.unlinkSync(DIR_IMG_USER + '/' + req.params.imagename)
        return res.status(200).send('ok')
    }
}

export const deleteImgRumah = (req, res) => {
    if(!req.params.imagename){
        console.log("No file received");
        return res.status(500).json('no file received')
    }else{
        console.log('file received');
        fs.unlinkSync(DIR_IMG_RUMAH + '/' + req.params.imagename)
        return res.status(200).send('ok')
    }
}

export const deleteImgBantuan = (req, res) => {
    if(!req.params.imagename){
        console.log("No file received");
        return res.status(500).json('no file received')
    }else{
        console.log('file received');
        fs.unlinkSync(DIR_IMG_BANTUAN + '/' + req.params.imagename)
        return res.status(200).send('ok')
    }
}