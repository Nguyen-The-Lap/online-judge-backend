const express = require("express");
const router = express.Router();
const problemsController = require("../../controllers/problemsController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");
const verifyJWT = require("../../middleware/verifyJWT");
const handleGetProblem = require("../../middleware/handleGetProblem");

/**
 * @swagger
 * tags:
 *   name: Problems
 *   description: Problem management
 */

/**
 * @swagger
 * /problems:
 *   get:
 *     summary: Get all problems
 *     tags: [Problems]
 *     responses:
 *       200:
 *         description: A list of problems
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                   difficulty:
 *                     type: string
 *                   tags:
 *                     type: array
 *                     items:
 *                       type: string
 *       500:
 *         description: Server error
 *   post:
 *     summary: Add a new problem (Admin only)
 *     tags: [Problems]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               difficulty:
 *                 type: string
 *     responses:
 *       201:
 *         description: Problem created
 *       403:
 *         description: Forbidden
 *       401:
 *         description: Unauthorized
 */
router
  .route("/")
  .get(problemsController.getAllProblems)
  .post(verifyJWT, verifyRoles(ROLES_LIST.Admin), problemsController.addProblem);

/**
 * @swagger
 * /problems/{title}:
 *   get:
 *     summary: Get a single problem by title
 *     tags: [Problems]
 *     parameters:
 *       - in: path
 *         name: title
 *         schema:
 *           type: string
 *         required: true
 *         description: Problem title
 *     responses:
 *       200:
 *         description: Problem data
 *       404:
 *         description: Problem not found
 *   put:
 *     summary: Update a problem (Admin only)
 *     tags: [Problems]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: title
 *         schema:
 *           type: string
 *         required: true
 *         description: Problem title
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *               difficulty:
 *                 type: string
 *     responses:
 *       200:
 *         description: Problem updated
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *   delete:
 *     summary: Delete a problem (Admin only)
 *     tags: [Problems]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: title
 *         schema:
 *           type: string
 *         required: true
 *         description: Problem title
 *     responses:
 *       200:
 *         description: Problem deleted
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router
  .route("/:title")
  .get(handleGetProblem)
  .put(verifyJWT, verifyRoles(ROLES_LIST.Admin), problemsController.updateProblem)
  .delete(verifyJWT, verifyRoles(ROLES_LIST.Admin), problemsController.deleteProblem);

module.exports = router;
