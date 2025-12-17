import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import routes from './routes';
import { env } from './config/env';
import { errorHandler, notFound } from './middleware/errorHandler';

const app = express();
app.set('trust proxy', 1); // trust Render's proxy so secure cookies work

// Allow multiple origins via CORS_ORIGINS env (comma-separated) with credentials
const allowedOrigins = Array.isArray(env.corsOrigins)
	? env.corsOrigins
	: [env.corsOrigins, 'http://127.0.0.1:5173'];

app.use(
	cors({
		origin: (origin, callback) => {
			// Allow non-browser requests (no origin) and any allowed origin
			if (!origin || allowedOrigins.includes(origin)) {
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

app.use('/api', routes);

app.use(notFound);
app.use(errorHandler);

export { app };
