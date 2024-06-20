import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import 'dotenv/config';
import helmet from 'helmet';
import {
  recipesRouter,
  usersRouter,
  categoriesRouter,
  areasRouter,
  ingredientsRouter,
  testimonialsRouter,
} from './routes/index.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swaggerConfig.js';

const app = express();

app.use(helmet());
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/recipes', recipesRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/areas', areasRouter);
app.use('/api/ingredients', ingredientsRouter);
app.use('/api/testimonials', testimonialsRouter);
app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((_, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

export default app;
