import { Schema, model, Model } from "mongoose";
import { Transact } from "../types";

//create transaction schema
const TransactionSchema = new Schema<Transact>(
  {
    txhash: {
      type: String,
      unique: true,
    },
    to: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    from: {
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

//statics
TransactionSchema.statics.build = (attrs: Transact) => {
  return new Transaction(attrs);
};

//create model
const Transaction = model<Transact>("Transaction", TransactionSchema);

export { Transaction };
