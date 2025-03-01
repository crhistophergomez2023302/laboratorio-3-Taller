import Company from "./company.model.js"

export const addCompany = async (req, res) => {
    try {
        const data = req.body

        const company = await Company.create(data)
        return res.status(201).json({
            message: "Empresa agregada exitosamente",
            company
        })

    } catch (err) {
        console.log(err.message)
        return res.status(500).json({
            message: "La empresa no se agrego exitosamente",
            error: err.message
        })
    }
}

export const orderlyCompany = async (req, res) => {
    try {

        const { sortBy } = req.query

        let orderly

        switch (sortBy) {
            case 'A':
                orderly = { Name: 1 }
            break;
            case 'Z':
                orderly = { Name: -1 }
            break;
            case 'category':
                orderly = { category: 1 }
            break;
            case 'experience':
                orderly = { experienceStart: 1}
            break;
            default:
                orderly = {};
        }

        const listCompanies = await Company.find().sort(orderly)

        return res.status(200).json({
            message: "Las empresas fueron listadas exitosamente",
            listCompanies
        })

    } catch (err) {
        console.log(err.message)
        return res.status(500).json({
            message: "Las empresas no fueron listadas",
            error: err.message

        })
    }
}

export const updateCompany = async (req, res) => {
    try {

        const { uid } = req.params;
        const data = req.body;

        const company = await Company.findByIdAndUpdate(uid, data, { new: true })

        res.status(200).json({
            succes: true,
            message: "La empresa fue actualizada exitosamente",
            company
        })

    } catch (err) {
        res.status(500).json({
            succes: false,
            message: "No se pudo actualizar, error al actualizar",
            error: err.message
        })
    }
}