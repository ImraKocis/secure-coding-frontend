import { User } from "@/lib/types/user";
import { ImageDB } from "@/lib/types/image";

export interface Post {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  description?: string;
  hashtags: string[];
  userId: number;
}

export interface PostExtended extends Post {
  user: User;
  image: ImageDB;
}
