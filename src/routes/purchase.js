
import express from 'express';
import {  confirmPurchase } from '../service/purchase';


const router = express.Router({ mergeParams: true });

router.post('/purchase', async (req, res, next) => {
  try {
    const data = await confirmPurchase();
    res.json({
      success: true,
      message: 'purchase is confirmed',
      data
    });
  } catch (err) {
    res.status(500);
    next(err);
  }
});

 



export default router;