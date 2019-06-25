"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class PostRoutes {
    constructor() {
        this.getPosts = (req, res) => { };
        this.getPost = () => { };
        this.createPost = () => { };
        this.updatePost = () => { };
        this.deletePost = () => { };
        this.routes = () => {
            this.router.get("/", this.getPosts);
            this.router.get("/:url", this.getPost);
            this.router.post("/:url", this.createPost);
            this.router.put("/:url", this.updatePost);
            this.router.delete("/:url", this.deletePost);
        };
        this.router = express_1.Router();
        this.routes();
    }
}
const postRoutes = new PostRoutes();
exports.default = postRoutes.router;
