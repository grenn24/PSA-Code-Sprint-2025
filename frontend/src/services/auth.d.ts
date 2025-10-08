declare class AuthService {
    apiClient: import("../utilities/apiClient").ApiClient;
    login(email: string, password: string): Promise<any>;
    logout(): Promise<void>;
}
declare const authService: AuthService;
export default authService;
