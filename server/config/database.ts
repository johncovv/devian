import mongoose from 'mongoose';
import requireDir from 'require-dir';
import path from 'path';

import env from './enviroment';

const { databaseUser, databasePassword, databaseName } = env;

const MongoUrl = `mongodb+srv://${databaseUser}:${databasePassword}@main-cluster.vvp86.mongodb.net/${databaseName}?retryWrites=true&w=majority`;

const connection = mongoose.connect(MongoUrl, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
});

requireDir(path.join(__dirname, '..', 'src', 'models'));

export default connection;
