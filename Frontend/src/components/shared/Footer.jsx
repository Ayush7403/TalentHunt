import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h2 className='text-xl font-bold mb-4'>Talent<span className='text-[#F83002]'>Hunt</span></h2>
          <p className="text-sm text-gray-400">
            Empowering job seekers with the right opportunities and helping companies find the best talent.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/jobs" className="hover:text-white">Jobs</a></li>
            <li><a href="/browse" className="hover:text-white">Browse</a></li>
           
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3"></h3>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Get in Touch</h3>
          <p className="text-sm text-gray-400 mb-2">Email: support@talenthunt.com</p>
          <p className="text-sm text-gray-400">Phone: +91 00000 00000</p>
          <div className="mt-4 flex space-x-4">
            <a href="#" className="hover:text-white"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="hover:text-white"><i className="fab fa-twitter"></i></a>
            <a href="#" className="hover:text-white"><i className="fab fa-linkedin-in"></i></a>
            <a href="#" className="hover:text-white"><i className="fab fa-github"></i></a>
          </div>
        </div>
      </div>
      <div className="mt-10 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} TalentHunt. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;