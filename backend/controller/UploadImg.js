import multer from "multer"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public')
    },
        filename: function (req, file, cb) {
        cb(null, file.originalname )
    }
})

const upload = multer({ storage: storage }).single('gambar')

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