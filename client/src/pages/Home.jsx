import React from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { FaList, FaPlus } from "react-icons/fa";

const Home = () => {
  const features = [
    {
      name: "View Notes",
      description:
        "View all your notes in one place. Easily search, filter, and organize your notes to find what you need quickly.",
      icon: FaList,
    },
    {
      name: "Add New Note",
      description:
        "Create new notes effortlessly. Add titles, content, and tags to your notes to keep your ideas organized.",
      icon: FaPlus,
    },
  ];

  return (
    <div>
      <Navigation />
      <div className="bg-white py-24 sm:py-32 h-full sm:mb-10 lg:mb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="font-semibold text-2xl text-emerald-500">
              Your Note Taking Hub
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Streamline Your Note-Taking Experience
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Access all your notes, anytime, anywhere. With our intuitive
              interface and powerful features, managing your notes has never
              been easier.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-sm bg-emerald-500">
                      <feature.icon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
