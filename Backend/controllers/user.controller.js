const googleAuthCallBack = async (req, res) => {
    res.status(200).redirect('https://real-time-chat-application-cyan-gamma.vercel.app/home');
}

const getUserData = (req, res) => {
    if (!req.user) {
        return res.status(401).json({ authenticated: false });
    }
    res.json({ userData: req.user, authenticated: true });
}

const logout = async (req, res, next) => {
    req.logOut(() => {
        req.session.destroy(err => {
            if (err) return res.status(500).json({ message: "Logout failed" });
            res.clearCookie("connect.sid");
            res.json({ message: "Logged out successfully" });
        });
    });
}

export { googleAuthCallBack, getUserData, logout };