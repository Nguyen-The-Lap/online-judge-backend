const express = require("express");
const router = express.Router();
const leaderboardController = require("../../controllers/leaderboardController");

/**
 * @swagger
 * tags:
 *   name: Leaderboard
 *   description: Leaderboard management
 */

/**
 * @swagger
 * /leaderboard:
 *   get:
 *     summary: Get the leaderboard
 *     tags: [Leaderboard]
 *     responses:
 *       200:
 *         description: A list of top users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   username:
 *                     type: string
 *                   score:
 *                     type: integer
 *       500:
 *         description: Server error
 */
router
  .route("/")
  .get(leaderboardController.getLeaderboard);

module.exports = router;
