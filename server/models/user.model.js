import mongoose from "mongoose"

const genderEnum = ['male', 'female', 'other']
const qualificationEnum = ['student', 'employed', 'other']

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    phone: {
        type: String
    },
    gender: {
        type: String,
        enum: genderEnum,
        default: 'other'
    },
    qualification: {
        type: String,
        enum: qualificationEnum,
        default: 'other'
    },
    profilePic: {
        type: String
    },
    coverPic: {
        type: String
    },
    bio: {
        type: String,
        default: ''
    }
}, { collection: 'users', timestamps: true })

const userModel = mongoose.model('User', userSchema)

export default userModel