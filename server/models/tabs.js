import Mongoose, { Schema } from 'mongoose';

const tabModel = {
    tabInfo: {
        songName: {
            type: String,
            required: true
        },
        artist: String,
        timeSignature: String,
        key: String,
        capo: String,
        difficulty: String,
        year: String,
        genre: String

    },
    text: {
        type: String,
        required: true
    },
    lyric: {
        type: [String]
    },
    chords: {
        type: [String]
    },
    rank: {
        type: String
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}

const options = {
    timestamps: true
}

const tabSchema = new Schema(tabModel, options);

export const Tab = Mongoose.model('tab', tabSchema);