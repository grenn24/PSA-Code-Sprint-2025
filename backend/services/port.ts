import Port from "../models/port";

class PortService {
	async getAllPorts() {
		return await Port.find().exec();
	}
}

const portService = new PortService();
export default portService;
