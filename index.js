const express = require('express') // express 사용
const app = express()
const port = 3000
const mongoose = require('mongoose') // mongodb 연결


// 몽고디비에 연결 하는 작업
mongoose.connect('mongodb+srv://zhanghe90:zh1234@react-learning.lm8xn.mongodb.net/<dbname>?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
    // 위 4개 작성하는 이유는 에러를 안뜨게 하기위해
}).then(() => console.log('MongoDB connected!'))
    .catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})