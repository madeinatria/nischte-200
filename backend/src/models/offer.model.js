const offerTypeSchema = new Schema({
  // Taught of adding some index/field, but need to check for near future use-cases...
  name: {
    type: String,
    required: true,
    enums: [
      "Flat-Discount, Plus-Offer, Special-Offer, Complimentary, Discount-Dishes",
    ],
  },
});

const offerDescriptionSchema = new Schema({
  discountRate: {
    type: Number,
    required: true,
  },
  minOrder: {
    type: Number,
    required: true,
  },
  plusOffers: {
    type: Number,
  },
  specialOccasionDate: {
    type: Date,
  },
  discountDishes: {
    type: [String],
  },
  numberOfVisits: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const offerSchema = new Schema(
  {
    shopId: {
      type: Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
    },
    itemId: {
      type: Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },
    offerType: {
      type: offerTypeSchema,
      required: true,
    },
    offerDescription: {
      type: offerDescriptionSchema,
      required: true,
    },
  },
  { timestamps: true }
);

export const Offer = model("Offer", offerSchema);
