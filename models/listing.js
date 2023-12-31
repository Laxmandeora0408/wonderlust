const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");


const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url:String,
    filename:String,
  },
  price: Number,
  location: String,
  country: String,
  reviews:[
    {
      type:Schema.Types.ObjectId,
      ref:"Review",
    }
  ],
  owner:{
    type:Schema.Types.ObjectId,
    ref:"User",
  },
  category: {
    type: String,
    enum: ["Mountains", "Trending", "Rooms", "Iconic Cities", "Castle", "Amazing Pools", "Camping", "Farms", "Arctic"]
}

  
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ listing: listing._id });
  }})

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;