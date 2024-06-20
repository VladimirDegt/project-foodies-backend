import express from 'express';
import areasControllers from '../controllers/areasControllers.js';

const areasRouter = express.Router();

/**
 * @swagger
 * /api/areas:
 *   get:
 *     summary: Retrieve a list of areas
 *     description: Retrieve a list of culinary areas from the database.
 *     tags:
 *       - Areas
 *     responses:
 *       200:
 *         description: A list of areas
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
 *                         description: The area ID
 *                         example: 6462a6f04c3d0ddd28897f9b
 *                   name:
 *                     type: string
 *                     description: The name of the area
 *                     example: Ukrainian
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
areasRouter.get('/', areasControllers.getAreas);

export default areasRouter;
