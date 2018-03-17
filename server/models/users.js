import Mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

import CONFIG from '../config.json';

const userModel = {
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
};

const options = {
    timestamps: true
}

const userSchema = new Schema(userModel, options);

userSchema.pre('save', async function (next) {
    try {
        const passwordHash = await bcrypt.hash(this.password, CONFIG.SALT_ROUNDS);
        this.password = passwordHash;
        next();
    } catch (error) {
        next(error);
    }
});

//custom methods
userSchema.methods.verifyPassword = async function (newPassword) {
    try {
        const isValid = await bcrypt.compare(newPassword, this.password);
        return isValid;
    } catch (error) {
        throw new Error(error);
    }
}

export const User = Mongoose.model('user', userSchema);
