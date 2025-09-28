import Port from "@common/types/port";
import createApiClient from "../utilities/apiClient";

class PortService {
	apiClient = createApiClient("/port");

	getAllPorts() {
		return this.apiClient.get<Port[]>("/");
	}
}

const portService = new PortService();
export default portService;