"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const promoController_1 = require("../controllers/promoController");
const router = express_1.default.Router();
router.post("/validate", promoController_1.validatePromo);
exports.default = router;
//# sourceMappingURL=promoRoutes.js.map