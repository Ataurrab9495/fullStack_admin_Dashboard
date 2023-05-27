import express from "express";
import { getProducts, getCreators, getTransactions, getGeography } from "../controllers/client.js"

const router = express.Router();

router.get("/products", getProducts);
router.get("/creators", getCreators);
router.get("/transactions", getTransactions);
router.get("/geography", getGeography);

export default router;