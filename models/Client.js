import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    contact_id : { type: mongoose.Schema.Types.ObjectId, ref: 'Contact', required: true },
    is_new_lead: { type: Boolean, default: true },
    notes: { type: String },
},
    { timestamps: true }
);

export default mongoose.model('Client', contactSchema);