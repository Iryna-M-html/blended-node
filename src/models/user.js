import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

userSchema.pre('save', function (next) {
  if (!this.name) {
    this.name = this.email;
  }
  next();
});

userSchema.methods.toJSON = function () {
  // Берёт документ и превращает его в обычный объект (this.toObject()).
  const obj = this.toObject();
  //Удаляет поле password, чтобы оно никогда не утекло на клиент.
  delete obj.password;
  return obj; //Возвращает «очищенный» объект.
};
export const User = model('User', userSchema);
