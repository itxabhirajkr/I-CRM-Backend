import PurchaseOrder from '../models/PurchaseInvoice.js';



// Create a new purchase order
export const createPurchaseOrder = async (req, res) => {
    try {
      const purchaseOrder = new PurchaseOrder(req.body);
      await purchaseOrder.save();
      res.status(201).json(purchaseOrder);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Get all purchase orders
  export const getPurchaseOrders = async (req, res) => {
    try {
      const purchaseOrders = await PurchaseOrder.find().populate('vendorId projectId preparedBy reviewedBy');
      res.status(200).json(purchaseOrders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Get a single purchase order by ID
  export const getPurchaseOrderById = async (req, res) => {
    try {
      const { id } = req.params;
      const purchaseOrder = await PurchaseOrder.findById(id).populate('vendorId projectId preparedBy reviewedBy');
      if (!purchaseOrder) {
        return res.status(404).json({ message: 'Purchase order not found' });
      }
      res.status(200).json(purchaseOrder);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Update a purchase order by ID
  export const updatePurchaseOrder = async (req, res) => {
    try {
      const { id } = req.params;
      const purchaseOrder = await PurchaseOrder.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
      if (!purchaseOrder) {
        return res.status(404).json({ message: 'Purchase order not found' });
      }
      res.status(200).json(purchaseOrder);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Delete a purchase order by ID
  export const deletePurchaseOrder = async (req, res) => {
    try {
      const { id } = req.params;
      const purchaseOrder = await PurchaseOrder.findByIdAndDelete(id);
      if (!purchaseOrder) {
        return res.status(404).json({ message: 'Purchase order not found' });
      }
      res.status(204).json({ message: 'Purchase order deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };