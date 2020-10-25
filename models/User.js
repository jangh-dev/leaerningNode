const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        maxlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    // 관리자 분류 
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    // 토큰 생명주기 (유효기간)
    tokenExp: {
        type: Number
    }
})

const User = mongoose.model('User',userSchema);

// 다른곳에서도 사용 가능 하겠금 모듈화
module.exports = { User };