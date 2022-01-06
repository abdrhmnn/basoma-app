import User from "../models/UserModel.js";

export const getAllUser = async (req, res) => {
    try{
        const users = await User.findAll();
        res.json(users);
    }catch(error){
        res.json({ message: error.message })
    }
}

export const getUserByID = async (req, res) => {
    try{
        const user = await User.findAll({
            where: {
                user_id: req.params.id
            }
        });
        res.json(user[0]);
    }catch(error){
        res.json({ message: error.message })
    }
}

export const updateUser = async (req, res) => {
    try{
        await User.update(req.body, {
            where: {
                user_id: req.params.id
            }
        });
        res.json({
            "message" : "Data user berhasil diubah!"
        });
    }catch(error){
        res.json({ message: error.message })
    }
}