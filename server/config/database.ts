import mongoose from 'mongoose';
import requireDir from 'require-dir';
import path from 'path';

import env from './enviroment';

const connection = mongoose.connect(env.mongoUrl, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
});

requireDir(path.join(__dirname, '..', 'src', 'models'));

export default connection;
