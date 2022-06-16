import mongoose from 'mongoose';

/**
 * Initiating mongoose
 */
export function initMongoose() {
	mongoose.connect('', {});

	mongoose.connection.on('connected', () => {
		console.info('[MONGO] default connection is open');
	});
	mongoose.connection.on('error', (err) => {
		console.error('[MONGO] default connection has occured: ', err);
	});
	mongoose.connection.on('disconnected', () => {
		console.error('[MONGO] default connection is closed');
	});

	process.on('SIGINT', () => {
		mongoose.connection.close(() => {
			console.error('[MONGO] default connection is closed due to application termination');
			process.exit(0);
		});
	});
}
