import express from 'express';
import * as inventoryController from '../api/index.ts';
const router = express.Router()
router.route('/')
  .post(inventoryController.addInventory)
  .get(inventoryController.getAllInventory)
router.route('/:inventoryId')
.patch(inventoryController.updateInventory)
router.route('/:inventoryId/details')
.get(inventoryController.getInventoryDetails)
export default router;