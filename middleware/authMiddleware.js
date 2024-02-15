const { verifyIdToken } = require("firebase-admin/auth")
const admin = require("firebase-admin");

//Replace  the following enviroment variable with your own firebase project credentials.
const serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
    credential:  admin.credential.cert(serviceAccount),
});

const validateFirebaseToken = async (req, res, next) => {
    const token = req.headers.authorization || req.query.token;

    if(!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const decodedToken = await verifyIdToken(token, checkRevoked = true);
        res.local.user = decodedToken.uid;
        next();
    } catch (error) {
        console.error("Error verifying Firebase token:", error);
        return res.status(403).json({error: "Unauthorized!"});
    }
}

export default validateFirebaseToken;

