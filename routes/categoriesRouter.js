import express from 'express';
import categoriesControllers from '../controllers/categoriesControllers.js';

const categoriesRouter = express.Router();

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Retrieve a list of categories
 *     description: Retrieve a list of food categories from the database.
 *     tags:
 *       - Categories
 *     responses:
 *       200:
 *         description: A list of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: object
 *                     properties:
 *                       $oid:
 *                         type: string
 *                         description: The category ID
 *                         example: 6462a6cd4c3d0ddd28897f8a
 *                   name:
 *                     type: string
 *                     description: The name of the category
 *                     example: Seafood
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: "Internal server error"
 */
categoriesRouter.get('/', categoriesControllers.getCategories);

export default categoriesRouter;
