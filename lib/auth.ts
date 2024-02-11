import User from "@models/user";
import { connectToDB } from "@utils/database";
import { NextAuthOptions } from "next-auth";
import defaultImage from "@public/default-profile.webp";

import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

export const authConfig: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password)
          return null;

        // const dbUser = await prisma.user.findFirst({
        //   where: { email: credentials.email },
        // });

        //Verify Password here
        //We are going to use a simple === operator
        //In production DB, passwords should be encrypted using something like bcrypt...
        // if (dbUser && dbUser.password === credentials.password) {
        //   const { password, createdAt, id, ...dbUserWithoutPassword } = dbUser;
        //   return dbUserWithoutPassword as User;
        // }

        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session }) {
      // store the user id from MongoDB to session
      const sessionUser = await User.findOne({ email: session?.user?.email });
      // if (session?.user?.id) session.user.id = sessionUser._id.toString();

      return sessionUser;
    },
    async signIn({ user }) {
      console.log(user);

      try {
        await connectToDB();

        console.log(user, " Auth");

        // check if user already exists
        const userExists = await User.findOne({ email: user?.email });

        // if not, create a new document and save user in MongoDB
        if (!userExists) {
          await User.create({
            email: user?.email,
            name: user?.name?.replace(" ", "").toLowerCase(),
            image: user.image || defaultImage.src,
          });
        }

        return true;
      } catch (error) {
        if (error instanceof Error) {
          console.log("Error checking if user exists: ", error.message);
          return false;
        } else {
          console.log("Unknown error occurred: ", (error as Error).message);
          return false;
        }
      }
    },
  },
};

// export async function loginIsRequiredServer() {
//   const session = await getServerSession(authConfig);
//   if (!session) return redirect("/");
// }
