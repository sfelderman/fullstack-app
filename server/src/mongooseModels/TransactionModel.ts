import { Schema, model, Document } from 'mongoose';
import { ObjectId } from 'mongodb';

const TransactionSchema = new Schema({
  _id: {
    type: String,
    required: true
  },
  account_id: {
    type: Schema.Types.ObjectId,
    ref: 'accounts',
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  pending: {
    type: Boolean,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  category: {
    type: Array
  },
  category_id: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  payment_channel: {
    type: String,
    required: true
  },

  merchant_name: {
    type: String
  },
  unofficial_currency_code: {
    type: String
  },
  iso_currency_code: {
    type: String
  },
  pending_transaction_id: {
    type: String
  }

  // // TODO
  // accountName: {
  //   type: String // TODO
  // },
});

// TransactionSchema.virtual('id').get(function () {
//   // @ts-ignore
//   return this._id.toHexString();
// });

TransactionSchema.set('toObject', {
  virtuals: true
});

export interface TransactionInterface {
  // accountName: string; // TODO
  account_id: string; // TODO might be objectId

  userId: ObjectId;
  pending: boolean;
  date: Date;
  category: string[];
  category_id: string;
  name: string;
  amount: number;
  payment_channel: string;

  merchant_name?: string;
  unofficial_currency_code?: string;
  iso_currency_code?: string;
  pending_transaction_id?: string;
}

export interface ITransactionDocument extends TransactionInterface, Document {}

const Transaction = model<ITransactionDocument>('transaction', TransactionSchema);

// module.exports = Transaction = mongoose.model('transaction', TransactionSchema);
export default Transaction;
