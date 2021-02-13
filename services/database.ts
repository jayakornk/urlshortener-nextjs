import mongoose from 'mongoose';

function connect(): void {
  if (mongoose.connection.readyState === 0) {
    console.log();
    mongoose
      .connect(`${process.env.NEXTAUTH_DATABASE_URL}`, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      })
      .then(
        () => {
          console.log(
            `Connected to database: ${process.env.NEXTAUTH_DATABASE_URL}`
          );
        },
        (err) => console.log('Database Error:', err)
      );
  }
}

export default { connect };
