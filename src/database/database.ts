import mongoose from 'mongoose';
import { config } from '../config/app.config';

const connectionDatabase = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log('Connected to Mongo database');
  } catch (error) {
    console.error('Error conecting to Mongo database: ', error);
    process.exit(1);
  }
};

export default connectionDatabase;
