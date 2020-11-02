const { User } = require("../models/User");

let auth = (req, res, next) => {
    //인증 처리 하는 곳
    // 클라이언트 쿠키에서 토큰을 가져온다.
    let token = req.cookies.x_auth;
    // 토큰을 복호화 한 후 유저를 찾는다.
    User.findByToken(token, (err, user) => {
        if(err) throw err;
        if(!user) return res.json({
            isAuth: false,
            error: true
        });
        // index.js 에서 req.token, req.user를 사용할 수 있게 하기 위함
        req.token = token;
        req.user = user;
        next(); // index.js 에 app.get('/api/users/auth', auth, (req, res) 에 auth를 이어 갈 수 있게
    })
}

module.exports = { auth };