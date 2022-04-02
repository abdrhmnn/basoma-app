import multer from "multer"
import * as fs from 'fs';

const DIR_IMG_USER = 'public/user'
const DIR_IMG_KK_USER = 'public/fkk'
const DIR_IMG_KTP_USER = 'public/fktp'
const DIR_IMG_BANTUAN = 'public/bantuan'

const storageUser = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/user')
    },
        filename: function (req, file, cb) {
        cb(null, file.originalname )
    }
})

const storageFormKK = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/fkk')
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

const storageBannerBantuan = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/bantuan')
    },
        filename: function (req, file, cb) {
        cb(null, file.originalname )
    }
})


const uploadImgUser = multer({ storage: storageUser }).single('gambar')
const uploadFormKK = multer({ storage: storageFormKK }).single('gambar_form_kk')
const uploadFormKTP = multer({ storage: storageFormKTP }).single('gambar_form_ktp')
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

export const saveImgFormKK = (req, res) => {
    uploadFormKK(req, res, function (err) {
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

export const deleteImgKK = (req, res) => {
    if(!req.params.imagename){
        console.log("No file received");
        return res.status(500).json('no file received')
    }else{
        console.log('file received');
        fs.unlinkSync(DIR_IMG_KK_USER + '/' + req.params.imagename)
        return res.status(200).send('ok')
    }
}

export const deleteImgKTP = (req, res) => {
    if(!req.params.imagename){
        console.log("No file received");
        return res.status(500).json('no file received')
    }else{
        console.log('file received');
        fs.unlinkSync(DIR_IMG_KTP_USER + '/' + req.params.imagename)
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