import { Schema, model, Model } from "mongoose";
import { IUser } from "../types";
import { PasswordManager } from "../utils/passwordManager";
import {encrypt} from "../utils"

//an interface that describes attributes a user model should have
interface UserModel extends Model<IUser> {
  build(attrs: IUser): IUser;
}

//create User schema
const UserSchema = new Schema<IUser, UserModel>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    phonenumber: {
      type: Number,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    walletAddress: {
      type: String,
      unique: true,
    },
    privateKey: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
      transform(_doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
      versionKey: false,
    },
    timestamps: true,
  }
);

//pre save hook to hash the updated password before it is saved to DB
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await PasswordManager.toHash(this.password);
  this.privateKey = await encrypt(this.privateKey);
  next();
});

//statics
UserSchema.statics.build = (attrs: IUser) => {
  return new User(attrs);
};

//creating user model
const User = model<IUser>("User", UserSchema);

export { User };
