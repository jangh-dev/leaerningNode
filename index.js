const express = require('express') // express 사용
const app = express()
const port = 3000
const mongoose = require('mongoose') // mongodb 연결
const bodyParser = require('body-parser'); // body-parser 가져옴 / client에서 오는 데이터를 가져옴
const { User } = require('./models/User'); // user 모듈을 가져 옴

const config = require('./config/key');

// bodyParser에서 옵션 추가
// application/x-www-form-urlencoded 이렇게 된걸 분석해서 가져오기
app.use(bodyParser.urlencoded({
    extended: true
}));
// application/json 도 분석해서 가져오기
app.use(bodyParser.json());



// 몽고디비에 연결 하는 작업
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
    // 위 4개 작성하는 이유는 에러를 안뜨게 하기위해
}).then(() => console.log('MongoDB connected!'))
    .catch(err => console.log(err))


    

app.get('/', (req, res) => {
  res.send('Hello World! 노드문이 제대로 됫는지 실험 한번 해보자')
})


app.post('/register', (req, res) => {
    // 회원가입 할때 필요한 정보들을 client에서 가져와 데이터베이스에 넣는다
    const user = new User(req.body);
    user.save((err, userInfo) => {
        if(err) return res.json({ success: false, err })
        return res.status(200).json({ //status 200은 연결 성공
            success: true
        })
    })
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})