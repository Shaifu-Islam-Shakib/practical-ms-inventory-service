import { NextFunction, Request, Response } from 'express'
import { InventoryCreateDTOSchema } from '../zod/schemas.ts'
import * as inventoryService from '../controller/index.ts'
import { v4 as uuidV4 } from 'uuid'
const addInventory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const {} = req.body

    const parsedBody = InventoryCreateDTOSchema.safeParse({
      ...req.body
    })
    if (!parsedBody.success) {
     return  res.status(400).json({ message: parsedBody.error.issues.map(issue => ({ error: issue.message })) })
    }
    //console.log(parsedBody);
    const response = await inventoryService.addInventory(parsedBody.data)
    res.status(200).json({code:201,data:response})
  } catch (err) {
    next(err)

  }
}
export default addInventory;