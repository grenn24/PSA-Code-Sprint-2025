import jwt from "jsonwebtoken";
import config from "config";
const auth = (role) => (request, response, next) => {
    const accessToken = request.header("X-Access-Token");
    // Missing access token
    if (!accessToken) {
        return response.status(401).json({
            status: "MISSING_ACCESS_TOKEN",
            message: "Missing access token",
        });
    }
    try {
        const payload = jwt.verify(accessToken, config.get("SECRET_KEY"));
        if (typeof payload !== "string" &&
            payload.role === "user" &&
            role === "admin") {
            // Insufficient permissions
            return response.status(403).json({
                status: "FORBIDDEN",
                message: "Access denied",
            });
        }
        // Attach user info
        if (typeof payload !== "string") {
            response.locals.user = payload;
        }
        return next(); // ✅ ensure you return here
    }
    catch (err) {
        // Invalid access token
        return response.status(401).json({
            status: "INVALID_ACCESS_TOKEN",
            message: "Invalid access token",
        });
    }
};
export default auth;
//# sourceMappingURL=auth.js.map