const {Schema, model, Mongoose} = require("mongoose");

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, "El nombre es obligatoria"]
    },
    email: {
        type: String,
        required: [true, "El correo es obligatoria"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatoria"]
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        emun: ["ADMIN_ROLE", "USER_ROLE"]
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

UserSchema.methods.toJSON = function() {
    const {__v, password, ...user} = this.toObject();
    return user;
}


module.exports = model("User", UserSchema);