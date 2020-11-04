const mongoose = require('mongoose'); // 서버 껏다가 다시 킬 필요없이 바로바로 적용가능한 라이브러리
const bcrypt = require('bcrypt'); // 암호화 하는 라이브러리
const saltRounds = 10; // 10자리인 salt를 만들고 그 salt를 이용해서 암호화 함
const jwt = require('jsonwebtoken'); // jsonwebtoken 토큰 생성 시 필요한 라이브러리

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
    } else {
        next();
    }
});







userSchema.methods.comparePassword = function(plainPassword, cb) {
    // plainPassword 1234567  === 암호화된 비밀번호 $2b$10$phDGFgP7qJHQmCdY46qmhuB2.6pxAP4CZ3b1VZvPhmPB/4qqhfGY2 확인하는 작업
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if(err) return cb(err);
        cb(null, isMatch);
    });
};






userSchema.methods.generateToken = function(cb) {
    var user = this;
    
    // jsonwebtoken 을 이용해서 token을 생성하기
    var token = jwt.sign(user._id.toHexString(), 'secretToken') //mongoDB에 있는 아이디(_id)값 가져오기
    // 토큰 생성 과정
    // user._id + 'secretToken' = token
    // -> 
    // 'secretToken' -> user._id
    user.token = token
    user.save(function(err, user){
        if(err) return cb(err);
        cb(null, user);
    });
};







userSchema.statics.findByToken = function(token, cb) {
    var user = this;
    // 토큰을 decode 한다.
    jwt.verify(token, 'secretToken', function(err, decoded){
        // 유저 아이디를 이용해서 유저를 찾은 다음에 클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인
        user.findOne({"_id": decoded, "token": token}, function(err, user){
            if(err) return cb(err);
            cb(null, user);
        });
    });
};






const User = mongoose.model('User',userSchema);

// 다른곳에서도 사용 가능 하겠금 모듈화
module.exports = { User };