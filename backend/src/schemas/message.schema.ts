

import * as mongoose from 'mongoose';

export const MessageSchema = new mongoose.Schema({
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
    sender: { type: String, required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    private: { type: Boolean, default: false },
    recipient: { type: String, required: false },
});