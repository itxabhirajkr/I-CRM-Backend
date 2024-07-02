import express from 'express';
import {
  createPurchaseOrder,
  getPurchaseOrders,
  getPurchaseOrderById,
  updatePurchaseOrder,
  deletePurchaseOrder,
} from '../controllers/purchaseOrderController.js';

const router = express.Router();

router.post('/purchase-orders', createPurchaseOrder);
router.get('/purchase-orders', getPurchaseOrders);
router.get('/purchase-orders/:id', getPurchaseOrderById);
router.put('/purchase-orders/:id', updatePurchaseOrder);
router.delete('/purchase-orders/:id', deletePurchaseOrder);

export default router;
