import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import path from 'path';
import routes from './routes';
import { env } from './config/env';
import { errorHandler, notFound } from './middleware/errorHandler';

const app = express();
app.set('trust proxy', 1); // trust Render's proxy so secure cookies work

// Allow multiple origins via CORS_ORIGINS env (comma-separated) with credentials
const rawAllowedOrigins = Array.isArray(env.corsOrigins)
	? env.corsOrigins
	: [env.corsOrigins, 'http://127.0.0.1:5173'];
// Normalize origins by removing any trailing slashes for robust matching
const allowedOrigins = rawAllowedOrigins.map((o) => o.replace(/\/$/, ''));

app.use(
	cors({
		origin: (origin, callback) => {
			const normalized = origin ? origin.replace(/\/$/, '') : origin;
			// Allow non-browser requests (no origin) and any allowed origin
			if (!normalized || allowedOrigins.includes(normalized)) {
				return callback(null, true);
			}
			return callback(new Error(`CORS blocked for origin: ${origin}`));
		},
		credentials: true,
	})
);
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve static files from client build
app.use(express.static(path.join(__dirname, '../../client/dist')));

app.use('/api', routes);

// SPA fallback: serve index.html for all non-API routes
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});

app.use(notFound);
app.use(errorHandler);

export { app };
