import jwt from "jsonwebtoken";

const googleAuthCallBack = async (req, res) => {
    const user = req.user;
    // Create jwt token.
    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
    // Set token as cookie.
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    res.status(200).redirect('http://localhost:5173/home');
}

const getUserData = (req, res) => {
    if (!req.user) {
        return res.status(401).json({ authenticated: false });
    }
    res.json({ userData: req.user, authenticated: true });
}

const logout = async (req, res, next) => {
    req.logOut(error => {
        if(error) return next(error);
        res.clearCookie('token');
        res.json({ message: "Logged Out" });
    });
}

export { googleAuthCallBack, getUserData, logout };