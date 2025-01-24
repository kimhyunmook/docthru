"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("../config/config");
const app = (0, express_1.default)();
const SERVICE_PORT = config_1.PORT || 8000;
app.get("/", (req, res) => {
    res.send("Hello, TypeScript with Express!");
});
app.listen(SERVICE_PORT, () => {
    console.log(`SERVER PORT: ${SERVICE_PORT}`);
});
