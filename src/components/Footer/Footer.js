"use client";

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900">
      <div className="container mx-auto px-6 py-10">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="mb-10 sm:w-1/2 sm:mb-0 sm:h-full sm:mr-5">
            <h3 className="text-2xl font-bold text-white mb-2">
              About AI Hub Central
            </h3>
            <p className="text-gray-400">
              AI Hub Central is a platform where multiple AI technologies are
              merged into a single simple to use website.
            </p>
          </div>
          <div className="sm:w-1/2 sm:h-full">
            <h3 className="text-2xl font-bold text-white mb-2">Contact Us</h3>
            <ul className="text-gray-400 break-words">
              <li>Email: ali.z.jalloul@gmail.com</li>
              <li>
                <Link
                  href="https://github.com/alijalloul"
                  target="_blank"
                  rel="noreferrer"
                >
                  Github: @alijalloul
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.linkedin.com/in/ali-jalloul-370092275/"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn: @alijalloul
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <hr className="my-12 border-gray-600" />
        <p className="text-center text-gray-400 text-sm">
          &copy; 2023 AI Hub Central. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
