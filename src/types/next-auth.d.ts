import "next-auth";
// import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      id: string;
      name: string;
      email: string;
      image?: string;
    };
  }

  interface Profile {
    id: string;
    name: string;
    email: string;
    picture?: {
      data: {
        url: string;
      };
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
  }
}
