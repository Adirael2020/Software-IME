import Image from 'next/image';

function Images() {
  return (
    <div className='md:shrink-0 opacity-70'>
      <Image src="/feed.jpg" alt="Feed" width={367} height={200} />
    </div>
  );
}

export default Images;
