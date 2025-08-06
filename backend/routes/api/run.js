const express = require("express");
const router = express.Router();
const runController = require("../../controllers/runController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");
const verifyJWT = require("../../middleware/verifyJWT");

/**
 * @swagger
 * tags:
 *   name: Run
 *   description: Code execution
 */

/**
 * @swagger
 * /run:
 *   post:
 *     summary: Execute user-submitted code (User only)
 *     tags: [Run]
 *     security:
 *       - bearerAuth: []
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
 *                 example: '#include<iostream>\nint main(){ std::cout<<"Hello"; return 0; }'
 *               input:
 *                 type: string
 *                 example: ""
 *     responses:
 *       200:
 *         description: Execution result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 output:
 *                   type: string
 *                 error:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (if role is not User)
 */
router
  .route("/")
  .post(verifyJWT, verifyRoles(ROLES_LIST.User), runController.handleRun);

module.exports = router;
