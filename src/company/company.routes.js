// filepath: /C:/Users/COMPUFIRE/Desktop/COPEREX/laboratorio-3-Taller/src/company/company.routes.js
import { Router } from "express";
import { addCompany, orderlyCompany, updateCompany } from "./company.controller.js";

const router = Router();

/**
 * @swagger
 * /coperex/v1/company/addCompany:
 *   post:
 *     summary: Add a new company
 *     tags: [Company]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Company'
 *     responses:
 *       200:
 *         description: Company added successfully
 */
router.post("/addCompany", addCompany);

/**
 * @swagger
 * /coperex/v1/company/listCompany:
 *   get:
 *     summary: List all companies
 *     tags: [Company]
 *     responses:
 *       200:
 *         description: A list of companies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Company'
 */
router.get("/listCompany", orderlyCompany);

/**
 * @swagger
 * /coperex/v1/company/updateCompany/{uid}:
 *   put:
 *     summary: Update a company
 *     tags: [Company]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: The company ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Company'
 *     responses:
 *       200:
 *         description: Company updated successfully
 */
router.put("/updateCompany/:uid", updateCompany);

export default router;