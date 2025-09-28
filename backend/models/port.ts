import mongoose from "mongoose";

const portSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	coordinates: {
		type: {
            lat: {
                type: Number,
                required: true,
            },
            lng: {
                type: Number,
                required: true,
            },
        },
		required: true,
	},
});

const Port = mongoose.model("Port", portSchema);
export default Port;
