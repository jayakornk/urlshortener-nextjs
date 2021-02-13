import mongoose from 'mongoose';

function connect(): void {
  if (mongoose.connection.readyState === 0) {
    mongoose.connect(
      `${
        process.env.MONGO_URL || 'mongodb://localhost:27017'
      }/urlshortener-next`,
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        // useUnifiedTopology: true,
        useFindAndModify: false,
      }
    );
  }
}

export default { connect };
