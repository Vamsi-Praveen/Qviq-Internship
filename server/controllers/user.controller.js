import bcrypt from "bcrypt"
import userModel from "../models/user.model.js";

export const registerUser = async (req, res) => {
    try {
        const { fullName, email, password, phone, gender, qualification, profilePic, coverPic, bio } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({
            fullName,
            email,
            password: hashedPassword,
            phone,
            gender,
            qualification,
            profilePic,
            coverPic,
            bio
        })
        await newUser.save()
            .then(() => {
                return res.status(201).send({ message: 'User Created Successfully', data: newUser })
            })
            .catch((err) => {
                return res.status(500).send({ 'message': "Internal Server Error", error: err })
            })
    }
    catch (err) {
        console.log(err)
        return res.status(500).send({ 'message': "Internal Server Error", error: err })

    }
}


export const getUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await userModel.findById(userId)
        return res.status(200).send({
            data: user
        })
    } catch (error) {
        console.error('Error getting user:', error);
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedUserData = req.body;
        const updatedUser = await userModel.findByIdAndUpdate(userId, updatedUserData, { new: true });
        return res.status(200).send({ message: 'Data Updated Successfully', updatedData: updatedUser })
    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedUser = await userModel.findByIdAndDelete(userId)
        return res.status(200).send({ message: "user deleted successfully", user: deletedUser })
    } catch (error) {
        console.error('Error deleting user:', error);
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

export const getUserByEmail = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await userModel.findOne({ email: email })
        return res.status(200).send({ data: user })
    } catch (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}
