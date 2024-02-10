import React from "react";
import {
  GithubSignInButton,
  GoogleSignInButton,
} from "@/components/authButtons";
import { getServerSession } from "next-auth";
import { authConfig } from "@lib/auth";
import { redirect } from "next/navigation";

const SignIn = async () => {
  const session = await getServerSession(authConfig);

  if (session) return redirect("/");

  return (
    <>
      <div>SignIn</div>

      <GoogleSignInButton />
      <GithubSignInButton />
    </>
  );
};

export default SignIn;
