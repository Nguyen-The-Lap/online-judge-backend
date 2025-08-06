const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User profile and account details
 */

/**
 * @swagger
 * /user/{user}:
 *   get:
 *     summary: Get user details
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: user
 *         schema:
 *           type: string
 *         required: true
 *         description: Username or user ID
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *                 role:
 *                   type: string
 *                 joinedAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: User not found
 */
router
  .route("/:user")
  .get(userController.getUserDetails);

module.exports = router;
