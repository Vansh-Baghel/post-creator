import { PuffLoader } from "react-spinners";

export default function Spinner() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className='w-full flex justify-center items-center'>
      <PuffLoader color='black' />
    </div>
  );
}
