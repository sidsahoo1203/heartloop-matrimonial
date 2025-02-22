import React from 'react';

const HomePage = () => {
  return (
    <div className="font-sans">
      {/* Hero Section */}
      <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://via.placeholder.com/1920x1080')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white">
          <h1 className="text-5xl font-bold mb-4 animate-fade-in">Find Your Perfect Match</h1>
          <p className="text-xl mb-8 animate-fade-in-delay">Join thousands of happy couples who found love with us.</p>
          <button className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-full text-lg animate-bounce">
            Get Started
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="container mx-auto -mt-20 p-6 bg-white rounded-lg shadow-lg animate-slide-up">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Looking for..."
            className="flex-1 p-3 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            placeholder="Location"
            className="flex-1 p-3 border border-gray-300 rounded-lg"
          />
          <button className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-lg">
            Search
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto my-20 text-center">
        <h2 className="text-4xl font-bold mb-12">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 hover:scale-105 transition-transform">
            <div className="bg-pink-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">❤️</span>
            </div>
            <h3 className="text-2xl font-semibold mb-2">Verified Profiles</h3>
            <p className="text-gray-600">We ensure all profiles are genuine and verified.</p>
          </div>
          <div className="p-6 hover:scale-105 transition-transform">
            <div className="bg-pink-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🔒</span>
            </div>
            <h3 className="text-2xl font-semibold mb-2">Secure & Private</h3>
            <p className="text-gray-600">Your privacy is our top priority.</p>
          </div>
          <div className="p-6 hover:scale-105 transition-transform">
            <div className="bg-pink-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">💍</span>
            </div>
            <h3 className="text-2xl font-semibold mb-2">Success Stories</h3>
            <p className="text-gray-600">Join thousands of happy couples.</p>
          </div>
        </div>
      </div>

      {/* Testimonials Carousel */}
      <div className="bg-pink-50 py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">Success Stories</h2>
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 p-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex-shrink-0 w-full md:w-1/3 bg-white p-6 rounded-lg shadow-lg snap-center">
                <p className="text-gray-600 mb-4">"This platform changed my life! I found my soulmate here."</p>
                <p className="font-semibold">- John & Jane</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto text-center">
          <p>&copy; 2023 Matrimonial Website. All rights reserved.</p>
          <div className="flex justify-center gap-4 mt-4">
            <a href="#" className="hover:text-pink-600">Privacy Policy</a>
            <a href="#" className="hover:text-pink-600">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;