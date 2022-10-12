import { Request, Response } from 'express';
import { validateObjAgainstSchema, createLabel, listLabels, deleteLabel, updateLabel } from '../helpers';
import { Label } from '../entities';
import { ObjectId } from 'mongodb';

class LabelController {
    async storeLabel(req: Request, res: Response){
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

    async showLabels(req: Request, res: Response) {
        if (req.query.name) req.query.name = {
            $regex: req.query.name,
            $options: 'i'
        }

        if(req.query._id) {
            try {
                new ObjectId(req.query._id as string)
            } catch (error) {
                return res.status(400).json({error: "Invalid ID format."})
            }
        }

        const labels = await (await listLabels(req.query)).toArray()

        if (labels.length) {
            return res.status(200).json({result: labels})
        }

        return res.status(404).json({error: 'No data found.'})
    }

    async updateLabels(req: Request, res: Response) {
        if (!req.params.labelId) return res.status(400).json({error: "No labelId provided."})

        try {
            new ObjectId(req.params.labelId as string)
        } catch (error) {
            return res.status(400).json({error: "Invalid ID format."})
        }

        try {
            await updateLabel(req.params.labelId, req.body)

            return res.status(200).json({message: "Label updated."})
        } catch (error: any) {
            return res.status(404).json({error: error.message})
        }
    }

    async deleteLabels(req: Request, res: Response) {
        if (!req.params.labelId) return res.status(400).json({error: "No labelId provided."})

        try {
            new ObjectId(req.params.labelId as string)
        } catch (error) {
            return res.status(400).json({error: "Invalid ID format."})
        }

        await deleteLabel(req.params.labelId)

        return res.status(204).end()
    }
}

export default new LabelController();