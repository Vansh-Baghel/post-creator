import Feed from "@components/Feed";

export default function Home() {
  return (
    <section className='w-full flex-col'>
      <h1 className='text-center'>
        Create & Share
        <br />
        <span>Track all your expenses</span>
      </h1>
      <p className='orange_gradient text-center'>
        This is an application which will help you track your expense well.
      </p>

      <Feed />
    </section>
  );
}
