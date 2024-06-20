import express from 'express';
import testimonialsControllers from '../controllers/testimonialsControllers.js';

const testimonialsRouter = express.Router();

/**
 * @swagger
 * /api/testimonials:
 *   get:
 *     summary: Retrieve a list of testimonials
 *     description: Retrieve a list of user testimonials from the database.
 *     tags:
 *       - Testimonials
 *     responses:
 *       200:
 *         description: A list of testimonials
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
 *                         description: The testimonial ID
 *                         example: "647495d0c825f1570b04182d"
 *                   owner:
 *                     type: object
 *                     properties:
 *                       $oid:
 *                         type: string
 *                         description: The user ID of the testimonial owner
 *                         example: "64c8d958249fae54bae90bb9"
 *                   testimonial:
 *                     type: string
 *                     description: The testimonial text
 *                     example: "Foodies has transformed my cooking experience! With its diverse recipe collection and user-friendly interface, I can easily find, save, and cook delicious meals for any occasion. From quick dinners to elaborate feasts, this app has become my go-to kitchen companion. Highly recommended!"
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
testimonialsRouter.get('/', testimonialsControllers.getTestimonials);

export default testimonialsRouter;
