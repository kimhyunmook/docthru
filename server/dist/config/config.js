"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { PORT, JWT_SECRET } = process.env;
exports.PORT = PORT;
exports.JWT_SECRET = JWT_SECRET;
if (!!!JWT_SECRET)
    new Error("JWT_SCRECT 설정해");
