import jwt from "jsonwebtoken";

export const authenticationToken = (req, res, next) => {
    // console.log(req.header("Authorization"));
    // const token = req.header("Authorization");
    const token = req.cookies.jwt;
    
    console.log(token);

    if(!token) return res.status(401).json({ message: "Access denied. No token provided" });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) return res.status(403).json({ message: "Invalid token."});

        req.user = user;
        next();
    })
}