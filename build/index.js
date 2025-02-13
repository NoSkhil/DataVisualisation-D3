"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./db"));
const dataImportRoutes_1 = __importDefault(require("./routes/dataImportRoutes"));
const hrRoutes_1 = __importDefault(require("./routes/hrRoutes"));
const financialRoutes_1 = __importDefault(require("./routes/financialRoutes"));
const path_1 = __importDefault(require("path"));
const manufacturingRoutes_1 = __importDefault(require("./routes/manufacturingRoutes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, 'client')));
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'client', 'index.html'));
});
app.get('/ping', (req, res) => {
    res.status(200).send("success");
});
app.use("/data", dataImportRoutes_1.default);
app.use('/hr', hrRoutes_1.default);
app.use('/financial', financialRoutes_1.default);
app.use('/manufacturing', manufacturingRoutes_1.default);
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    db_1.default.connect((err) => {
        if (err)
            console.log(err);
        else {
            console.log("Connected to supabase postgres db");
            console.log(`DV server active on port ${PORT}`);
        }
    });
}));
