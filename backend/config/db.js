import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      // 'mongodb+srv://chadweekboseman1000_user:chadweek@cluster0.ukvpqh1.mongodb.net/food-del'
      'mongodb+srv://ntechsite2026_db_user:ntechsite2026@cluster0.xxcteco.mongodb.net/ntech-site'
    )
    .then(() => console.log("DB Connected"));
};
