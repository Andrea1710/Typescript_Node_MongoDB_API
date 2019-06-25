import { Request, Response, Router } from "express";

import User from "../models/User";

class UserRoutes {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public getUsers = async (req: Request, res: Response): Promise<void> => {
    const users = await User.find();
    res.json(users);
  };

  public getUser = async (req: Request, res: Response): Promise<void> => {
    const { username } = req.params;
    const user = await User.findOne({ username: username });
    res.json(user);
  };

  public createUser = async (req: Request, res: Response): Promise<void> => {
    const newUser = new User(req.body);
    await newUser.save();
    res.json({ data: newUser });
  };

  public updateUser = async (req: Request, res: Response): Promise<void> => {
    const { username } = req.params;
    const updatedUser = await User.findOneAndUpdate(
      { username: username },
      req.body,
      {
        new: true
      }
    );
    res.json(updatedUser);
  };

  public deleteUser = async (req: Request, res: Response): Promise<void> => {
    const { username } = req.params;
    await User.findOneAndDelete({ username: username });
    res.json({ message: "User deleted successfully" });
  };

  public routes = () => {
    this.router.get("/", this.getUsers);
    this.router.get("/:username", this.getUser);
    this.router.post("/", this.createUser);
    this.router.put("/:username", this.updateUser);
    this.router.delete("/:username", this.deleteUser);
  };
}

const userRoutes = new UserRoutes();
export default userRoutes.router;
