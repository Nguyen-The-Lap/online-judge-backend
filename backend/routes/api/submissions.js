const express = require("express");
const router = express.Router();
const submissionsController = require("../../controllers/submissionsController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");
const verifyJWT = require("../../middleware/verifyJWT");

/**
 * @swagger
 * tags:
 *   name: Submissions
 *   description: Submission history and results
 */

/**
 * @swagger
 * /submissions:
 *   get:
 *     summary: Get all submissions for the logged-in user
 *     tags: [Submissions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of user submissions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   problemTitle:
 *                     type: string
 *                   language:
 *                     type: string
 *                   status:
 *                     type: string
 *                   submittedAt:
 *                     type: string
 *                     format: date-time
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (User role required)
 */
router
  .route("/")
  .get(verifyJWT, verifyRoles(ROLES_LIST.User), submissionsController.getAllSubmissions);

module.exports = router;
