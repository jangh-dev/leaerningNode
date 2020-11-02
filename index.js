const express = require('express') // express 사용
const app = express() // express 라이브러리
const port = 3000 // 자신의 포트번호
const mongoose = require('mongoose') // mongodb 연결
const bodyParser = require('body-parser'); // body-parser 가져옴 / client에서 오는 데이터를 가져옴
const cookieParser = require('cookie-parser'); // cookie 라리브러리
const config = require('./config/key'); // config 모듈 가져 옴
const { auth } = require('./middleware/auth'); //auth 모듈 가져 옴
const { User } = require('./models/User'); // user 모듈을 가져 옴


// bodyParser에서 옵션 추가
// application/x-www-form-urlencoded 이렇게 된걸 분석해서 가져오기
app.use(bodyParser.urlencoded({
    extended: true
}));
// application/json 도 분석해서 가져오기
app.use(bodyParser.json());
// 쿠키 가져오기
app.use(cookieParser());



// 몽고디비에 연결 하는 작업
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
    // 위 4개 작성하는 이유는 에러를 안뜨게 하기위해
}).then(() => console.log('MongoDB connected!'))
    .catch(err => console.log(err));

    



app.get('/', (req, res) => {
  res.send('Hello World! 노드문이 제대로 됫는지 실험 한번 해보자')
});





app.post('/api/users/register', (req, res) => {
    // 회원가입 할때 필요한 정보들을 client에서 가져와 데이터베이스에 넣는다
    const user = new User(req.body);
    user.save((err, userInfo) => {
        if(err) return res.json({ success: false, err })
        return res.status(200).json({ //status 200은 연결 성공
            success: true
        });
    });
});







app.post('/api/users/login', (req, res) => {
    // 요청된 이메일을 데이터베이스에서 있는지 찾기
    User.findOne({ email: req.body.email }, (err, user) => {
        if(!user) {
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            });
        };

        // 요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인
        user.comparePassword(req.body.password, (err,isMatch) => {
            if(!isMatch)
                return res.json({
                    loginSuccess: false,
                    message: "비밀번호가 틀렸습니다."
                });
 
            // 비밀번호 까지 맞다면 토큰을 생성
            user.generateToken((err, user) => {
                if(err) return res.status(400).send(err);
                // 토큰을 쿠키에 저장함
                res.cookie("x_auth", user.token) // 쿠키에 x_auth라는 임의에 이름을 부여
                .status(200)
                .json({ 
                    loginSuccess: true,
                    userId: user._id
                });
            });
        });
    });
});





app.get('/api/users/auth', auth, (req, res) => {
    //여기까지 미들웨어를 통과해 왔다는 얘기는 Authentication 이 True 라는 말.
    // isAdmin에 role은 정책에 의해 바뀔수가 있음
    // 현재 적용된 정책은 role -> 0 일반유저    role 0이 아니면 관리자
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    });
});



app.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
        if(err) return res.json({success: false, err});
        return res.status(200).send({success: true});
    });
});




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});