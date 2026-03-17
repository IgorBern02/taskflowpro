import { AuthUser, User } from "@supabase/supabase-js";

declare global {
  namespace Express {
    interface User extends User {}
    interface Request {
      user: AuthUser;
    }
  }
}
