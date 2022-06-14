import express from 'express';

const app = express();

app.get('/info', (req, res) => {
	return res.status(200).json({
		status: 200,
		repository: {
			name: process.env.npm_package_name ?? null,
			version: process.env.npm_package_version ?? null,
		},
	});
});

const port = process.env.PORT ?? 3000;

app.listen(port, () => console.log(`Running on port ${port}`));
