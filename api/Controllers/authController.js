const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');


if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET is not defined in environment variables');
    process.exit(1);
}

const secret = process.env.JWT_SECRET;
const salt = bcrypt.genSaltSync(10);

module.exports = {
    login: async (req, res) => {
        const { username, password } = req.body;
        
        if (!username || !password) {
            return res.status(400).json('Username and password are required');
        }
        
        const usernameToCheck = username.toLowerCase();

        try {
            const userDoc = await User.findOne({ username: usernameToCheck });
            if (!userDoc) {
                return res.status(400).json('User not found');
            }
            const passOk = bcrypt.compareSync(password, userDoc.password);
            if (passOk) {
                jwt.sign({ username: usernameToCheck, id: userDoc._id }, secret, {}, (err, token) => {
                    if (err) throw err;
                    
                    // Set cookie for same-domain scenarios
                    res.cookie('token', token, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production',
                        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                        domain: process.env.NODE_ENV === 'production' ? undefined : undefined,
                        maxAge: 24 * 60 * 60 * 1000 
                    });
                    
                    // Also send token in response for cross-domain scenarios
                    res.json({
                        id: userDoc._id,
                        username: usernameToCheck,
                        token: token // Include token in response
                    });
                });
            } else {
                res.status(400).json('wrong credentials');
            }
        } catch (err) {
            res.status(500).json('Internal server error');
        }
    },

    register: async (req, res) => {
        const { username, password } = req.body;
        
        if (!username || !password) {
            return res.status(400).json('Username and password are required');
        }
        
        const usernameToSave = username.toLowerCase();

        try {
            const userDoc = await User.create({
                username: usernameToSave,
                password: bcrypt.hashSync(password, salt),
            });
            res.json(userDoc);
        } catch (e) {
            res.status(400).json(e);
        }
    },

    profile: (req, res) => {
        try {
            // Check for token in cookies first (for same-domain), then Authorization header (for cross-domain)
            let token = req.cookies.token;
            
            if (!token) {
                const authHeader = req.headers.authorization;
                if (authHeader && authHeader.startsWith('Bearer ')) {
                    token = authHeader.substring(7);
                }
            }
            
            console.log('Profile request - Token exists:', !!token);
            console.log('Profile request - Origin:', req.get('Origin'));
            
            if (!token) return res.status(401).json({ message: "NOT LOGIN" });
    
            jwt.verify(token, secret, {}, (err, info) => {
                if (err) {
                    console.error("Token Verification Error:", err);
                    return res.status(401).json({ message: "Invalid token" });
                }
                console.log('Profile verified for user:', info.username);
                res.json(info);
            });
        } catch (err) {
            console.error("Profile Error:", err);
            res.status(500).json({ message: "Error checking profile" });
        }
    },

    refreshToken: async (req, res) => {
        const {token} = req.cookies;
        jwt.verify(token, secret, {}, (err, info) => {
            if (err) throw err;
            res.json(info);
        });
    },

    logout: (req, res) => {
        res.cookie('token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            domain: process.env.NODE_ENV === 'production' ? undefined : undefined,
            maxAge: 0
        }).json('ok');
    }
};
