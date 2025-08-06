const express = require("express");
const router = express.Router();
const submitController = require("../../controllers/submitController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");
const verifyJWT = require("../../middleware/verifyJWT");

/**
 * @swagger
 * tags:
 *   name: Submit
 *   description: Code submission
 */

/**
 * @swagger
 * /submit/{title}:
 *   post:
 *     summary: Submit code for a specific problem
 *     tags: [Submit]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: title
 *         schema:
 *           type: string
 *         required: true
 *         description: The title of the problem to submit code for
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               language:
 *                 type: string
 *                 example: cpp
 *               code:
 *                 type: string
 *                 example: |
 *                   #include<iostream>
 *                   int main() {
 *                     std::cout << "Hello World";
 *                     return 0;
 *                   }
 *     responses:
 *       200:
 *         description: Submission received and being evaluated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 submissionId:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (User role required)
 *       404:
 *         description: Problem not found
 */
router
  .route("/:title")
  .post(verifyJWT, verifyRoles(ROLES_LIST.User), submitController.handleSubmit);

module.exports = router;
