import mongoose from 'mongoose';

let connected = false;
const uri = process.env.NEXT_MONGODB_URI;

export const connectDb = async () => {
  mongoose.set('strictQuery', false);

  if (connected) {
    console.log('Mongo already connected');
    return;
  }

  try {
    await mongoose.connect(uri);
    connected = true;
    console.log('connected with db');
    // const connection = mongoose.connection;
    // connection.on('connected', () => {
    //   console.log('mongodb is connected');
    // });
    // // console.log('Mongo connected...');
    // connection.on('error', (error) => {
    //   console.log('Error connecting with mongoDb ' + error);
    //   connected = false;
    //   process.exit();
    // });
  } catch (error) {
    console.log('Errror connecting with mongoDb: ' + error);
    console.log();
    // process.exit();
  }
};
