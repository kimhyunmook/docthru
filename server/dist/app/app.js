"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("../config/config");
const route_1 = __importDefault(require("./routes/route"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const SERVICE_PORT = config_1.PORT || 8000;
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.get("/", (req, res) => {
    res.send("Hello, TypeScript with Express!");
});
app.use("/api", route_1.default);
app.listen(SERVICE_PORT, () => {
    console.log(`SERVER PORT: ${SERVICE_PORT}`);
});
