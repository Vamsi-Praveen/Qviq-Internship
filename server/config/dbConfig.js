import mongoose from "mongoose";

export const initDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL).then(() => {
            console.log('Db connected Succesfully')
        })
            .catch((err) => {
                console.log(err)
            })
    } catch (err) {
        console.log(err)
    }
}