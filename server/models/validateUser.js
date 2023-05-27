import mongoose from 'mongoose';

const validateUserSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        password: {type: String,required: true},

    },
    {timestamps: true}
);

const Profile = mongoose.model("Profile", validateUserSchema)
export default Profile;