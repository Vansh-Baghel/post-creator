"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";
import axios from "axios";
import Spinner from "@components/Spinner";

const UpdatePost = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const [post, setPost] = useState({ prompt: "", tag: "" });
  const [submitting, setIsSubmitting] = useState(false);
  const [loader, setLoader] = useState(false);

  console.log(promptId);

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await axios.get(`/api/post/${promptId}`);

      setPost({
        prompt: response.data.prompt,
        tag: response.data.tag,
      });
    };

    if (promptId) getPromptDetails();
  }, [promptId]);

  const updatePrompt = async (e) => {
    setLoader(true);
    e.preventDefault();
    setIsSubmitting(true);

    if (!promptId) return alert("Missing PromptId!");

    try {
      const response = await axios.patch(`/api/post/${promptId}`, {
        prompt: post.prompt,
        tag: post.tag,
      });

      if (response.status >= 200 && response.status < 300) {
        router.push("/");
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
      setLoader(false);
    }
  };

  return (
    <>
      <Suspense fallback={<Spinner />}>
        <Form
          type='Edit'
          post={post}
          setPost={setPost}
          submitting={submitting}
          handleSubmit={updatePrompt}
        />
      </Suspense>
    </>
  );
};

export default UpdatePost;
