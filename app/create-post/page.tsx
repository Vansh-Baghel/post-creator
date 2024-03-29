"use client";

import { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";
import Spinner from "@components/Spinner";

const CreatePost = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });
  const [loading, setLoading] = useState(false);

  const createPrompt: React.FormEventHandler<HTMLFormElement> = async (e) => {
    setLoading(true);
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log(session?._id);

      const response = await axios.post("/api/post/new", {
        prompt: post.prompt,
        userId: session?._id,
        tag: post.tag,
      });
      // const response = await fetch("/api/prompt/new", {
      //   method: "POST",
      //   body: JSON.stringify({
      //     prompt: post.prompt,
      //     userId: session?._id,
      //     tag: post.tag,
      //   }),
      // });

      if (response.status >= 200 && response.status < 300) {
        router.push("/");
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Spinner />}
      <Form
        type='Create'
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPrompt}
      />
    </>
  );
};

export default CreatePost;
