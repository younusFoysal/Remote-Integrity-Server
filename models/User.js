import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


const userSchema = new mongoose.Schema({
    user_name: { type: String, required: true, unique: true },
    user_email: { type: String, required: true, unique: true },
    user_password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
},
    { timestamps: true }
);


// Hash the password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('user_password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.user_password = await bcrypt.hash(this.user_password, salt);
    next();
    });

const User = mongoose.model('User', userSchema);
export default User;