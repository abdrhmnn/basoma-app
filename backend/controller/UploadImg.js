import multer from "multer"
import * as fs from 'fs';

const DIR_IMG_USER = 'public/user'
const DIR_IMG_KTP_USER = 'public/fktp'
const DIR_IMG_BANGUNAN_USER = 'public/fbangunan'

const storageUser = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/user')
    },
        filename: function (req, file, cb) {
        cb(null, file.originalname )
    }
})

const storageFormKTP = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/fktp')
    },
        filename: function (req, file, cb) {
        cb(null, file.originalname )
    }
})

const storageFormBangunan = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/fbangunan')
    },
        filename: function (req, file, cb) {
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
const uploadFormKTP = multer({ storage: storageFormKTP }).single('gambar_form_ktp')
const uploadFormBangunan = multer({ storage: storageFormBangunan }).single('gambar_form_bangunan')
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

export const saveImgFormKTP = (req, res) => {
    uploadFormKTP(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
    
        return res.status(200).send(req.file)
    })
}

export const saveImgFormBangunan = (req, res) => {
    uploadFormBangunan(req, res, function (err) {
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

export const deleteImgKTP_User = (req, res) => {
    if(!req.params.imagename){
        console.log("No file received");
        return res.status(500).json('no file received')
    }else{
        console.log('file received');
        fs.unlinkSync(DIR_IMG_KTP_USER + '/' + req.params.imagename)
        return res.status(200).send('ok')
    }
}

export const deleteImgBangunan_User = (req, res) => {
    if(!req.params.imagename){
        console.log("No file received");
        return res.status(500).json('no file received')
    }else{
        console.log('file received');
        fs.unlinkSync(DIR_IMG_BANGUNAN_USER + '/' + req.params.imagename)
        return res.status(200).send('ok')
    }
}