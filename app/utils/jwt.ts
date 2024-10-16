import jwt, { Secret } from "jsonwebtoken";

const JWT_SECRET: Secret = process.env.JWT_KEY || "defaultSecret"; // 

export const generateToken = (loggedUser: { id: string; email: string }) => {
    return jwt.sign(
        { id: loggedUser.id, email: loggedUser.email },
        JWT_SECRET,
        { expiresIn: "1h" }
    );
};

export const verifyToken = (token: string) => {
    try {
        const data = jwt.verify(token, JWT_SECRET);
        return { success: true, data };
    } catch (error) {
        return { success: false, error };
    }
};
