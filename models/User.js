const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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
        minlength: 5
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
});

userSchema.pre('save', function( next ){
    var user = this; // 위에 있는 userSchema 불러 옴
    // password만 바뀌었을때 적용 시킨다
    if(user.isModified('password')) {
        // 비밀번호를 암호화 시킨다.
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err);

            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err);
                user.password = hash; // 암호화 된 암호로 변경
                next();
            });
        });
    };
});

const User = mongoose.model('User',userSchema);

// 다른곳에서도 사용 가능 하겠금 모듈화
module.exports = { User };