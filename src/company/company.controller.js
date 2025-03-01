// filepath: /C:/Users/COMPUFIRE/Desktop/COPEREX/laboratorio-3-Taller/src/company/company.controller.js
import Company from "./company.model.js";

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
 *       201:
 *         description: Empresa agregada exitosamente
 *       500:
 *         description: La empresa no se agrego exitosamente
 */
export const addCompany = async (req, res) => {
    try {
        const data = req.body;

        const company = await Company.create(data);
        return res.status(201).json({
            message: "Empresa agregada exitosamente",
            company
        });

    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            message: "La empresa no se agrego exitosamente",
            error: err.message
        });
    }
};

/**
 * @swagger
 * /coperex/v1/company/listCompany:
 *   get:
 *     summary: List all companies
 *     tags: [Company]
 *     parameters:
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [A, Z, category, experience]
 *         description: Sort companies by specified field
 *     responses:
 *       200:
 *         description: Las empresas fueron listadas exitosamente
 *       500:
 *         description: Las empresas no fueron listadas
 */
export const orderlyCompany = async (req, res) => {
    try {
        const { sortBy } = req.query;

        let orderly;

        switch (sortBy) {
            case 'A':
                orderly = { name: 1 };
                break;
            case 'Z':
                orderly = { name: -1 };
                break;
            case 'category':
                orderly = { category: 1 };
                break;
            case 'experience':
                orderly = { experience: 1 };
                break;
            default:
                orderly = {};
        }

        const listCompanies = await Company.find().sort(orderly);

        return res.status(200).json({
            message: "Las empresas fueron listadas exitosamente",
            listCompanies
        });

    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            message: "Las empresas no fueron listadas",
            error: err.message
        });
    }
};

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
 *         description: La empresa fue actualizada exitosamente
 *       500:
 *         description: No se pudo actualizar, error al actualizar
 */
export const updateCompany = async (req, res) => {
    try {
        const { uid } = req.params;
        const data = req.body;

        const company = await Company.findByIdAndUpdate(uid, data, { new: true });

        res.status(200).json({
            succes: true,
            message: "La empresa fue actualizada exitosamente",
            company
        });

    } catch (err) {
        res.status(500).json({
            succes: false,
            message: "No se pudo actualizar, error al actualizar",
            error: err.message
        });
    }
};