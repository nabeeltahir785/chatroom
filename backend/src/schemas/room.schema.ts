import * as mongoose from 'mongoose';

export const RoomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
});