import { Request, Response, NextFunction } from 'express';
import { findInventory } from '../controller/utils.ts';
import * as inventoryService from '../controller/index.ts';
import { InventoryUpdateDTOSchema } from '../zod/schemas.ts';
import { findHistoryByDesc } from '../controller/history/index.ts'
const updateInventory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const inventoryId = req.params.inventoryId;

    // Validate inventoryId
    if (!inventoryId || typeof inventoryId !== 'string') {
      return res.status(400).json({ code: 400, message: 'Valid inventory ID is required' });
    }

    // Check if inventory exists and get the actual inventory object
    const inventory = await findInventory(inventoryId);
    if (!inventory) {
      return res.status(404).json({ code: 404, message: 'Inventory not found' });
    }
    console.log(inventory);
    // Handle null quantity - treat as 0
    const currentQuantity = inventory.quantity ?? 0;

    // Parse and validate request body
    const parsedBody = InventoryUpdateDTOSchema.safeParse({
      ...req.body
    });

    if (!parsedBody.success) {
      return res.status(400).json({
        code: 400,
        message: 'Validation error',
        errors: parsedBody.error.issues.map(issue => issue.message)
      });
    }

    // Validate quantity
    if (parsedBody.data.quantity <= 0) {
      return res.status(400).json({
        code: 400,
        message: 'Quantity must be a positive number'
      });
    }

    // Calculate new quantity based on action type
    let newQuantity: number = currentQuantity;

    if (parsedBody.data.actionType === 'in') {
      newQuantity += parsedBody.data.quantity;
    } else if (parsedBody.data.actionType === 'out') {
      if (currentQuantity < parsedBody.data.quantity) {
        return res.status(400).json({
          code: 400,
          message: 'Insufficient inventory quantity'
        });
      }
      newQuantity -= parsedBody.data.quantity;
    } else {
      return res.status(400).json({
        code: 400,
        message: 'Invalid action type'
      });
    }

    // Prepare update data with guaranteed number types
    const updateData = {
      ...parsedBody.data,
      newQuantity: newQuantity
    };


    // Call service layer
    const updatedInventory = await inventoryService.updateInventory(updateData, inventoryId);


    // Return success response
    res.status(200).json({
      code: 200,
      message: 'Inventory updated successfully',
      //  data: updatedInventory
    });

  } catch (err: any) {
    console.error('Error updating inventory:', {
      message: err.message,
      inventoryId: req.params.inventoryId,
      timestamp: new Date().toISOString()
    });

    // Handle specific error types
    if (err.message.includes('Insufficient inventory')) {
      return res.status(400).json({
        code: 400,
        message: err.message
      });
    }

    if (err.message.includes('Inventory item not found')) {
      return res.status(404).json({
        code: 404,
        message: 'Inventory item not found'
      });
    }

    // Pass to error handling middleware for unexpected errors
    next(err);
  }
};

export default updateInventory;