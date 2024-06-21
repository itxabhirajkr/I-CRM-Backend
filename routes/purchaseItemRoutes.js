import express from 'express';
import {
  createPurchaseItem,
  getPurchaseItems,
  getPurchaseItemById,
  updatePurchaseItem,
  deletePurchaseItem,
} from '../controllers/purchaseController.js';

const router = express.Router();

router.post('/purchase-items', createPurchaseItem);
router.get('/purchase-items', getPurchaseItems);
router.get('/purchase-items/:id', getPurchaseItemById);
router.put('/purchase-items/:id', updatePurchaseItem);
router.delete('/purchase-items/:id', deletePurchaseItem);

export default router;