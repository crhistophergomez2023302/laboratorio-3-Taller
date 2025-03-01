// filepath: /C:/Users/COMPUFIRE/Desktop/COPEREX/laboratorio-3-Taller/src/auth/auth.controller.js
import { hash, verify } from "argon2";
import User from "../user/user.model.js";
import { generateJWT } from "../helpers/generate-jwt.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: The user's username
 *         password:
 *           type: string
 *           description: The user's password
 */

/**
 * @swagger
 * /coperex/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User has been created
 *       500:
 *         description: User registration failed
 */
export const register = async (req, res) => {
    try {
        const data = req.body;
        data.role = "ADMIN_ROLE";
        
        const encryptedPassword = await hash(data.password);
        data.password = encryptedPassword;

        const user = await User.create(data);

        return res.status(201).json({
            message: "User has been created",
            name: user.name,
            email: user.email,
            role: user.role
        });
        
    } catch (err) {
        return res.status(500).json({
            message: "User registration failed",
            error: err.message
        });
    }
};

/**
 * @swagger
 * /coperex/v1/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Login failed, server error
 */
export const login = async (req, res) => {
    const { email, username, password } = req.body;
    try {
        const user = await User.findOne({
            $or: [{ email: email }, { username: username }]
        });

        if (!user) {
            return res.status(400).json({
                message: "Crendenciales inválidas",
                error: "No existe el usuario o correo ingresado"
            });
        }

        const validPassword = await verify(user.password, password);

        if (!validPassword) {
            return res.status(400).json({
                message: "Crendenciales inválidas",
                error: "Contraseña incorrecta"
            });
        }

        const token = await generateJWT(user.id);

        return res.status(200).json({
            message: "Login successful",
            userDetails: {
                token: token,
                profilePicture: user.profilePicture
            }
        });
    } catch (err) {
        return res.status(500).json({
            message: "login failed, server error",
            error: err.message
        });
    }
};

const createAdmin = async () => {
    try {
        const adminExists = await User.findOne({ role: "ADMIN_ROLE" });

        if (adminExists) {
            console.log("El admin ya existe, no se puede crear otro");
            return;
        }

        const hashedPassword = await hash("Admin123@");

        const admin = new User({
            name: "Admin",
            surname: "Nimda",
            username: "Admin1",
            email: "Admin@gmail.com",
            password: hashedPassword,
            role: "ADMIN_ROLE"
        });

        await admin.save();
        console.log("Admin creado correctamente.");
    } catch (error) {
        console.error("Error al verificar o crear el admin:", error.message);
    }
};

export default createAdmin;