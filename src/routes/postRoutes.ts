import { Request, Response, Router } from "express";

import Post from "../models/Post";

class PostRoutes {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public getPosts = async (req: Request, res: Response): Promise<void> => {
    const posts = await Post.find();
    res.json(posts);
  };

  public getPost = async (req: Request, res: Response): Promise<void> => {
    const { url } = req.params;
    const post = await Post.findOne({ url: url });
    res.json(post);
  };

  public createPost = async (req: Request, res: Response): Promise<void> => {
    const { title, url, content, image } = req.body;
    const newPost = new Post({ title, url, content, image });
    await newPost.save();
    res.json({ data: newPost });
  };

  public updatePost = async (req: Request, res: Response): Promise<void> => {
    const { url } = req.params;
    const updatedPost = await Post.findOneAndUpdate({ url: url }, req.body, {
      new: true
    });
    res.json(updatedPost);
  };

  public deletePost = async (req: Request, res: Response): Promise<void> => {
    const { url } = req.params;
    await Post.findOneAndDelete({ url: url });
    res.json({ message: "Post deleted successfully" });
  };

  public routes = () => {
    this.router.get("/", this.getPosts);
    this.router.get("/:url", this.getPost);
    this.router.post("/", this.createPost);
    this.router.put("/:url", this.updatePost);
    this.router.delete("/:url", this.deletePost);
  };
}

const postRoutes = new PostRoutes();
export default postRoutes.router;
