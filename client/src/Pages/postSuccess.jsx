import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

export default function PostSuccess() {
  return (
  <div>
           <section>
  <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16 mb-16">
      <div className="relative h-64 overflow-hidden rounded-full sm:h-80 lg:order-last lg:h-full">
        <img
          alt=""
          src="../pastor.jpg"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      <div className="lg:py-24">
      <h1 className='text-3xl font-bold lg:text-6xl'> Post Successful</h1>

        <p className="mt-4 text-gray-600 text-2xl">
          Your post is currently pending and waiting for approval by the Admin!.
          </p>

           <Link to={'/Dashboard?tab=myposts'}>
                      <Button
                        type='button'
                        gradientDuoTone='purpleToPink'
                        className='w-30 mt-5'
                      >
                        View Posts
                      </Button>
                    </Link>
      </div>
    </div>



  </div>
</section>
  </div>
  );
}