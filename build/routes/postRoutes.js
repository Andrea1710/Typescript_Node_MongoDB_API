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
const Posts_1 = __importDefault(require("../models/Posts"));
class PostRoutes {
    constructor() {
        this.getPosts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const posts = yield Posts_1.default.find();
            res.json(posts);
        });
        this.getPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { url } = req.params;
            const post = yield Posts_1.default.findOne({ url: url });
            res.json(post);
        });
        this.createPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { title, url, content, image } = req.body;
            const newPost = new Posts_1.default({ title, url, content, image });
            yield newPost.save();
            res.json({ data: newPost });
        });
        this.updatePost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { url } = req.params;
            const updatedPost = yield Posts_1.default.findOneAndUpdate({ url: url }, req.body, {
                new: true
            });
            res.json(updatedPost);
        });
        this.deletePost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { url } = req.params;
            yield Posts_1.default.findOneAndDelete({ url: url });
            res.json({ message: "Post deleted successfully" });
        });
        this.routes = () => {
            this.router.get("/", this.getPosts);
            this.router.get("/:url", this.getPost);
            this.router.post("/", this.createPost);
            this.router.put("/:url", this.updatePost);
            this.router.delete("/:url", this.deletePost);
        };
        this.router = express_1.Router();
        this.routes();
    }
}
const postRoutes = new PostRoutes();
exports.default = postRoutes.router;
