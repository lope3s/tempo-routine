import { Request, Response } from 'express';
import { validateObjAgainstSchema, createLabel } from '../helpers';
import { Label } from '../entities';

class LabelController {
    async createLabel(req: Request, res: Response){
        const isBodyValid = validateObjAgainstSchema(Label, req.body)

        if(!isBodyValid.valid) {
            return res.status(400).json({
                error: "The following fields are missing",
                missingFields: isBodyValid.missingFields
            })
        }

        const labelCreated = await createLabel(isBodyValid.obj)

        return res.status(201).json({
            message: "Label created.",
            id: labelCreated.insertedId
        })
    }
}

export default new LabelController();