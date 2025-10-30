"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePromo = void 0;
const validPromoCodes = {
    SAVE10: 10, // 10% discount
    FLAT100: 100, // ₹100 discount
};
const validatePromo = (req, res) => {
    const { code } = req.body;
    if (!code) {
        return res.status(400).json({ valid: false, message: "Promo code is required" });
    }
    const discount = validPromoCodes[code.toUpperCase()];
    if (discount) {
        return res.status(200).json({ valid: true, discount, message: "Promo code applied successfully" });
    }
    else {
        return res.status(404).json({ valid: false, message: "Invalid promo code" });
    }
};
exports.validatePromo = validatePromo;
//# sourceMappingURL=promoController.js.map