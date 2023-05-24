'use client';

import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-900">
      <div className="container mx-auto px-6 py-10">
        <div className="md:flex md:items-center md:justify-between">
          <div className="mb-10 md:w-1/2 md:mb-0 md:h-full md:mr-5">
            <h3 className="text-2xl font-bold text-white mb-2">About AI Hub Central</h3>
            <p className="text-gray-400">AI Hub Central is a platform where multiple AI technologies are merged into a single simple to use website.</p>
          </div>
          <div className="md:w-1/2 md:h-full">
            <h3 className="text-2xl font-bold text-white mb-2">Contact Us</h3>
            <ul className="text-gray-400 break-words">
              <li>Email: business.ali.z.jalloul@gmail.com</li>
              <li><Link href="https://github.com/alijalloul" target='_blank' rel="noreferrer">Github: @alijalloul</Link></li>
              <li><Link href="https://twitter.com/Jack_OA_Trade" target='_blank' rel="noreferrer">Twitter: @Jack_OA_Trade</Link></li>
              <li><Link href="https://www.facebook.com/profile.php?id=100092434484333" target='_blank' rel="noreferrer">Facebook: Ali Jalloul</Link></li>
              <li><Link href="https://www.youtube.com/@JackTrade-om3pv" target='_blank' rel="noreferrer">YouTube: @JackTrade</Link></li>
            </ul>
          </div>
        </div>
        <hr className="my-12 border-gray-600" />
        <p className="text-center text-gray-400 text-sm">&copy; 2023 AI Hub Central. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
