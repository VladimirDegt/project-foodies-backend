import express from 'express';
import ingredientsControllers from '../controllers/ingredientsControllers.js';

const ingredientsRouter = express.Router();

/**
 * @swagger
 * /api/ingredients:
 *   get:
 *     summary: Retrieve a list of ingredients
 *     description: Retrieve a list of food ingredients from the database.
 *     tags:
 *       - Ingredients
 *     responses:
 *       200:
 *         description: A list of ingredients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The ingredient ID
 *                     example: "640c2dd963a319ea671e37aa"
 *                   name:
 *                     type: string
 *                     description: The name of the ingredient
 *                     example: Squid
 *                   desc:
 *                     type: string
 *                     description: Description of the ingredient
 *                     example: A type of cephalopod with a soft, cylindrical body and long tentacles, often used in seafood dishes such as calamari or grilled squid.
 *                   img:
 *                     type: string
 *                     format: url
 *                     description: URL to an image of the ingredient
 *                     example: https://ftp.goit.study/img/so-yummy/ingredients/640c2dd963a319ea671e37aa.png
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
ingredientsRouter.get('/', ingredientsControllers.getIngredients);

export default ingredientsRouter;
