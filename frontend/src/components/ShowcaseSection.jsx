const ShowcaseSection = () => {
  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Heading row */}
        <div className="mb-8 lg:mb-12">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-black">
            Your primary home might
            <br className="hidden md:block" /> begin to feel left out.
          </h2>
        </div>

        {/* 2-col grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left: Featured Image */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1400&auto=format&fit=crop"
              alt="Modern House"
              className="w-full h-[320px] md:h-[420px] lg:h-[520px] object-cover rounded-xl shadow-md"
            />
            {/* Thumbnail strip */}
            <div className="absolute -bottom-4 right-4 flex -space-x-3">
              {[
                'https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=300&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1505692794403-34d4982fd1c5?q=80&w=300&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1560185008-b033106af2aa?q=80&w=300&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1502005229762-cf1b2da7c52f?q=80&w=300&auto=format&fit=crop',
              ].map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt={`Preview ${idx + 1}`}
                  className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-white shadow-md object-cover"
                />
              ))}
            </div>
          </div>

          {/* Right: Stacked content */}
          <div className="flex flex-col gap-6 lg:gap-8">
            {/* Top: heading + pill note */}
            <div className="flex items-start justify-between gap-6">
              <div className="flex-1" />
              <div className="shrink-0 bg-gray-100 rounded-full px-4 py-2 flex items-center gap-2 text-sm text-gray-700">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-black text-white">
                  ▶
                </span>
                <span className="hidden sm:block">
                  Each listing offers unique features, exceptional quality, and prime locations.
                </span>
                <span className="sm:hidden">Unique features & prime locations</span>
              </div>
            </div>

            {/* Middle cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left card */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  Big things can happen in small spaces.
                </h3>
                <p className="text-gray-600 mb-4">
                  With thoughtful design and smart organization, you can maximize every inch, making room for creativity.
                </p>
                <button className="inline-flex items-center px-4 py-2 rounded-full border border-gray-300 text-gray-800 hover:bg-gray-50">
                  Details
                </button>
              </div>

              {/* Right card */}
              <div className="bg-white rounded-xl shadow-md p-3 flex flex-col">
                <img
                  src="https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1200&auto=format&fit=crop"
                  alt="Preview property"
                  className="w-full h-44 md:h-52 rounded-lg object-cover mb-4"
                />
                <div className="px-2 pb-2">
                  <p className="text-gray-800 font-medium mb-3">Pricing Start at $256K</p>
                  <button className="inline-flex items-center justify-center gap-2 rounded-full bg-black text-white px-4 py-2 hover:bg-gray-900">
                    Explore Properties
                    <span aria-hidden>→</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom row */}
            <div className="flex items-center justify-between gap-4">
              <p className="italic text-gray-600 text-sm md:text-base">
                Whether it’s creating a cozy corner for relaxation or transforming a small area into a workspace.
              </p>
              <div className="flex items-center gap-3">
                <button className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50">←</button>
                <button className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50">→</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ShowcaseSection
