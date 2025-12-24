import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: "https://thumbs.dreamstime.com/b/unknown-male-avatar-profile-image-businessman-vector-unknown-male-avatar-profile-image-businessman-vector-profile-179373829.jpg",
    },
    isAdmin: {
        type: String,
        default: false,
    },
    isSuperAdmin: {
        type: Boolean,
        default: false,
    },
}, {timestamps: true}
);

const User = mongoose.model('User', userSchema);

export default User;