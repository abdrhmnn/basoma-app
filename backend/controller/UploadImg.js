import multer from "multer"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public')
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


const upload = multer({ storage: storage }).single('gambar')
const uploadFormKTP = multer({ storage: storageFormKTP }).single('gambar_form_ktp')
const uploadFormBangunan = multer({ storage: storageFormBangunan }).single('gambar_form_bangunan')
const uploadBannerBantuan = multer({ storage: storageBannerBantuan }).single('gambar_tambah_bantuan')

export const saveImg = (req, res) => {
    upload(req, res, function (err) {
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