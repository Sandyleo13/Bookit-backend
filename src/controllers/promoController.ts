import { Request, Response } from "express";

const validPromoCodes: { [key: string]: number } = {
  SAVE10: 10,   // 10% discount
  FLAT100: 100, // ₹100 discount
};

export const validatePromo = (req: Request, res: Response) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ valid: false, message: "Promo code is required" });
  }

  const discount = validPromoCodes[code.toUpperCase()];

  if (discount) {
    return res.status(200).json({ valid: true, discount, message: "Promo code applied successfully" });
  } else {
    return res.status(404).json({ valid: false, message: "Invalid promo code" });
  }
};
