import React from 'react'

export default function Welcome() {
  return (
    <div>
         <section>
          <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
              <div className="relative h-64 overflow-hidden rounded-full sm:h-80 lg:order-last lg:h-full">
                <img
                  alt=""
                  src="../papa.jpg"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
        
              <div className="lg:py-24">
              <h1 className='text-3xl font-bold lg:text-6xl'>Welcome to Dominion Faith Chapel</h1>
        
                <p className="mt-4 text-gray-600">
                 Devoted to sharing God’s Word with passion and purpose. Our ministry inspires believers to grow in faith, live intentionally, and fulfill their divine calling through the transforming power of Jesus Christ. </p>
        {/* 
                <a
                  href="/search"
                  className="mt-8 inline-block rounded bg-indigo-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-yellow-400"
                >
                  Check out My Projects
                </a> */}
              </div>
            </div>
          </div>
        </section>

    </div>
  )
}
