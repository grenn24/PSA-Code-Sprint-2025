import createApiClient from "../utilities/apiClient";
import store from "../redux/store";
import { setIsAuthenticated, setUser } from "../redux/slices/user";

class AuthService {
	apiClient = createApiClient("/auth");

	async login(email: string, password: string) {
		const response = await this.apiClient.post<any, any>("/log-in", {
			email,
			password,
		});
		const token = response.data?.token;
		const user = response.data?.user;

		sessionStorage.setItem("X-Access-Token", token);
		store.dispatch(setUser(user));
		store.dispatch(setIsAuthenticated(true));
		window.location.href = "/";
		return user;
	}

	async logout() {
		await this.apiClient.post("/log-out", {});
		store.dispatch(setIsAuthenticated(false));
		window.location.href = "/log-in";
	}
}

const authService = new AuthService();
export default authService;
