import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
    displayName : {
        type : String,
        max : 24,
        required : true,
    },
    email : {
        type : String,
        max : 24,
        unique : true,
        required : true,
    },
    password : {
        type : String,
        min : 8,
        max : 24,
        required : true,
    },
})

const UserModel = model('User', UserSchema);

export default UserModel;
