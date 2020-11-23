import { ObjectId } from 'mongodb';
import { Schema, model, Document } from 'mongoose';

const PlaidAccountSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  accessToken: {
    type: String,
    required: true
  },
  itemId: {
    type: String,
    required: true
  },
  institutionId: {
    type: String,
    required: true
  },
  institutionName: {
    type: String
  },
  accountName: {
    type: String
  },
  accountType: {
    type: String
  },
  accountSubtype: {
    type: String
  }
});

PlaidAccountSchema.virtual('id').get(function () {
  // @ts-ignore
  return this._id.toHexString();
});

PlaidAccountSchema.set('toObject', {
  virtuals: true
});

export interface PlaidAccountInterface {
  userId: ObjectId;
  accessToken: string;
  itemId: string;
  institutionId: string;

  institutionName?: string;
  accountName?: string;
  accountType?: string;
  accountSubtype?: string;
}

export interface IPlaidAccountDocument extends PlaidAccountInterface, Document {}

const PlaidAccount = model<IPlaidAccountDocument>('plaid_account', PlaidAccountSchema);

export default PlaidAccount;
