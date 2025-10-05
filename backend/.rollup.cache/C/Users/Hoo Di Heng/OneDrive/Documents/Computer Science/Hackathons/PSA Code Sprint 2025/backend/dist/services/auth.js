import { HttpError } from "../middlewares/error.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "config";
class AuthService {
    async login(email, password) {
        // 1. Find user by email
        const user = await User.findOne({ email: email.toLowerCase() })
            .populate("supervisor")
            .populate("subordinates")
            .populate("mentors")
            .populate("mentees")
            .populate("mentorshipRequests.sender")
            .exec();
        if (!user) {
            throw new HttpError("Invalid email or password", "INVALID_EMAIL_PASSWORD", 401);
        }
        // 2. Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new HttpError("Invalid email or password", "INVALID_EMAIL_PASSWORD", 401);
        }
        // 3. Create JWT payload
        const payload = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            position: user.position,
        };
        // 4. Sign JWT token (expires in 1 day)
        const token = jwt.sign(payload, config.get("SECRET_KEY"), {
            expiresIn: "1d",
        });
        // 5. Return token + user info (optional)
        return { token, user };
    }
    async validateAccessToken(accessToken) {
        try {
            const payload = jwt.verify(accessToken, config.get("SECRET_KEY"));
            if (typeof payload !== "string") {
                return payload;
            }
        }
        catch (err) {
            return false;
        }
    }
}
const authService = new AuthService();
export default authService;
//# sourceMappingURL=auth.js.map