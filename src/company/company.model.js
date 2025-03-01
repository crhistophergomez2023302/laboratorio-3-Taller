import {Schema, model} from "mongoose";

const companySchema = Schema({
    name:{
        type: String,
        required: [true, "Name is required"],
        maxLength:[25, "Name cannot exceed 25 characters"]
    },
    impactLevel:{
        type: String,
        required: [true, "Impact level is required"],
        enum: ["Alto", "Medio", "Bajo"]
    },
    experience:{
        type: Date,
        required: true,
    },
    category:{
        type: String,
        enum: ["AGRICULTURAL_CATEGORY", "INDUSTRIAL_CATEGORY", "COMMERCIAL_CATEGORY", "SERVICE_CATEGORY", "TECHNOLOGY_CATEGORY", "OTHER_CATEGORY"],
        default: "OTHER_CATEGORY"
    },
    status:{
        type: Boolean,
        default: true
    }
},
{
    versionKey: false,
    timeStamps: true
})

export default model("Company", companySchema)