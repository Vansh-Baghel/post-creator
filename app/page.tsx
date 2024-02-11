import Feed from "@components/Feed";

export default function Home() {
  return (
    <section className='w-full flex-col'>
      <h1 className='head_text text-center'>
        Create & Share
        <br className='max-md:hidden' />
        <span className='orange_gradient text-center'>
          {" "}
          Track all your expenses
        </span>
      </h1>
      <p className='desc text-center'>
        This is an application which will help you track your expense well.
      </p>
      <Feed />
    </section>
  );
}
