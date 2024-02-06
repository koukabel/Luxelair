"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const PUBLIC_DIR = "public";
if (!fs_1.default.existsSync(PUBLIC_DIR)) {
    fs_1.default.mkdirSync(PUBLIC_DIR);
}
const app = (0, express_1.default)();
// Servir les fichiers (lecture)
app.use(express_1.default.static(PUBLIC_DIR));
// Permettre l'envoi de fichiers (écriture)
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, PUBLIC_DIR);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage: storage });
app.post("/", upload.single("file"), (req, res) => {
    var _a;
    return res.status(201).json({
        filename: (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename,
    });
});
app.use(express_1.default.static("public"));
app.listen(5001, () => {
    console.log("File hosting server listening on port 5001.");
});
