
import { Request, Response, NextFunction } from 'express'
import * as inventoryService from '../controller/index.ts'
const getAllInventory = async (req: Request, res: Response, next: NextFunction) => {
  try {
const inventories = await inventoryService.getAllInventory()
if(inventories.length==0){
  return res.status(200).json({
    data:'There arent any inventory'
  })
}else{
  return res.status(200).json({
    data:inventories
  })
}
  } catch (err) {
    console.error('Error:', err);
    next(err)
  }
}
export default getAllInventory;