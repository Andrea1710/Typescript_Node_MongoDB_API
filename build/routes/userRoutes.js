"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = __importDefault(require("../models/User"));
class UserRoutes {
    constructor() {
        this.getUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const users = yield User_1.default.find();
            res.json(users);
        });
        this.getUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { username } = req.params;
            const user = yield User_1.default.findOne({ username: username });
            res.json(user);
        });
        this.createUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const newUser = new User_1.default(req.body);
            yield newUser.save();
            res.json({ data: newUser });
        });
        this.updateUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { username } = req.params;
            const updatedUser = yield User_1.default.findOneAndUpdate({ username: username }, req.body, {
                new: true
            });
            res.json(updatedUser);
        });
        this.deleteUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { username } = req.params;
            yield User_1.default.findOneAndDelete({ username: username });
            res.json({ message: "User deleted successfully" });
        });
        this.routes = () => {
            this.router.get("/", this.getUsers);
            this.router.get("/:username", this.getUser);
            this.router.post("/", this.createUser);
            this.router.put("/:username", this.updateUser);
            this.router.delete("/:username", this.deleteUser);
        };
        this.router = express_1.Router();
        this.routes();
    }
}
const userRoutes = new UserRoutes();
exports.default = userRoutes.router;
