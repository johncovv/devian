import mongoose from 'mongoose';
import env from './enviroment';

const connection = mongoose.connect(env.mongoUrl, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

export default connection;
