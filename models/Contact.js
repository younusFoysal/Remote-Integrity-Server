import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    contact_name: { type: String, required: true },
    contact_email: { type: String, required: true, unique: true },
    contact_phone: { type: Number, required: true },
    contact_type: { type: String, required: true },
    company_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
    notes: { type: String },
},
    { timestamps: true }
);

export default mongoose.model('Contact', contactSchema);