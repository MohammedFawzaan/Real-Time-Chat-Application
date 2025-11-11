import jwt from 'jsonwebtoken';

const googleAuthCallBack = async (req, res) => {
    const token = jwt.sign(
        { id: req.user._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );

    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    });

    return res.status(200).redirect(`${process.env.FRONTEND_URL}/home`);
}

const getUserData = (req, res) => {
    if (!req.user) {
        return res.status(401).json({ authenticated: false });
    }
    res.json({ userData: req.user, authenticated: true });
}

const logout = async (req, res, next) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: '/'
    });

    return res.json({ message: "Logged Out" });
}

export { googleAuthCallBack, getUserData, logout };