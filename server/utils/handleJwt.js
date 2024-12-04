import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET;

export const tokenSign = async (user) => {
    const sign = jwt.sign(
        {
            id: user.id,
            username: user.username,
            role_id: user.role_id,
        },
        JWT_SECRET,
        {
            expiresIn: "8h",
        }
    );
    return sign;
};

export const tokenVerify = async (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
};