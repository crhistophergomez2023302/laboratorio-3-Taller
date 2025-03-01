import { Router } from "express"
import { addCompany, orderlyCompany, updateCompany } from "./company.controller.js"

const router = Router()

router.post("/addCompany", addCompany);

router.get("/listCompany", orderlyCompany);

router.put("/updateCompany/:uid", updateCompany);

export default router