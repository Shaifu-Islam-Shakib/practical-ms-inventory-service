import express from 'express';
import inventoryRoutes from './inventoryRoutes.ts'
const router = express.Router();

router.use('/inventories',inventoryRoutes)
export default router;
