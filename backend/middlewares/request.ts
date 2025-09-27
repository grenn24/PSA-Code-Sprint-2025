import mongoose from "mongoose";

export function getID(request: any, response: any, next: any) {
	const _id = request.params.ID;
	// Check object id format
	if (_id && !mongoose.Types.ObjectId.isValid(_id)) {
		return response.status(400).send({ message: "Invalid user ID format" });
	}
	response.locals._id = _id;
	next();
}
