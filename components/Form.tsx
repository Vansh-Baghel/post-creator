import Link from "next/link";
import { Suspense } from "react";
import Spinner from '@components/Spinner';

type Props = {
  type: string;
  post: {
    prompt: string;
    tag: string;
  };
  setPost: React.Dispatch<
    React.SetStateAction<{
      prompt: string;
      tag: string;
    }>
  >;
  submitting: boolean;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
};

const Form = ({ type, post, setPost, submitting, handleSubmit }: Props) => {
  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{type} Post</span>
      </h1>
      <p className='desc text-left max-w-md'>
        {type} and share amazing posts with the world, and let your imagination
        run wild.
      </p>

      <form
        onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
      >
        {post.prompt === "" ? (
          <Spinner />
        ) : (
          <>
            <label>
              <span className='font-satoshi font-semibold text-base text-gray-700'>
                Your Post
              </span>
              <textarea
                value={post.prompt}
                onChange={(e) => setPost({ ...post, prompt: e.target.value })}
                placeholder='Write your post here'
                required
                className='form_textarea'
              />
            </label>

            <label>
              <span className='font-satoshi font-semibold text-base text-gray-700'>
                Field of Prompt{" "}
                <span className='font-normal'>
                  (#product, #webdevelopment, #idea, etc.)
                </span>
              </span>
              <input
                value={post.tag}
                onChange={(e) => setPost({ ...post, tag: e.target.value })}
                type='text'
                placeholder='#Tag'
                required
                className='form_input'
              />
            </label>
          </>
        )}

        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href='/' className='text-black text-sm'>
            Cancel
          </Link>

          <button
            type='submit'
            disabled={submitting}
            className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
          >
            {submitting ? `${type === "Create" && "Creat"}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
