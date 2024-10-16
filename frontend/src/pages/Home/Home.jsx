import React, { useEffect, useRef, useState } from "react";
import "./Home.css";
// import axios from "axios"; 
import backgroundImage from "../../assets/hero-img.jpg";
import scrollImg from "../../assets/arrow.png";
import GetStartModel from "../../components/Home/Model/ShowLoginModel";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

function Home() {
  const [showGetStart, setShowGetStart] = useState(false);
  const [username, setUsername] = useState(null);

  const closeGetModel = () => setShowGetStart(false);

  const topScroll = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    // Retrieve username from localStorage when component mounts
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, [showGetStart , username]);




  // Refs for sections
  const homeRef = useRef(null);
  const galleryRef = useRef(null);
  const servicesRef = useRef(null);
  const contactRef = useRef(null);
  const aboutRef = useRef(null);

  // Function to handle scrolling
  const scrollToSection = (section) => {
    if (section === "home") {
      homeRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (section === "gallery") {
      galleryRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (section === "contact") {
      contactRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (section === "about") {
      aboutRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (section === "services") {
      servicesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="">
      <Navbar scrollToSection={scrollToSection} username={username} setUsername={setUsername} />

      {/* Hero section */}
      <div
        ref={homeRef}
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "400px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <div className="flex flex-col justify-center text-gray-300 items-center">
          <h1 className="lg:text-5xl pl-12 lg:pl-0 text-4xl font-bold">
            Welcome to <span className="text-black">Deo Vansh</span>
            <span className="text-yellow-400"> Palace</span>
          </h1>
          <p className="lg:px-20 px-4 py-2">
            Los delectus dignissimos laborum inventore amet, numquam eaque
            accusantium doloribus non perferendis modi sed?
          </p>

          {username ? (
            <div className="flex flex-col justify-center items-center">
            <h2 className="lg:text-4xl text-lg font-bold uppercase text-gray-300 py-3">Welcome, Mr. <span className="text-yellow-400">{username}!</span></h2>
            <Link to="/book_your_date"
              className="bg-blue-800 p-2 rounded-lg hover:bg-black transition duration-300"
              // onClick={handleLogout}
            >
              Book Your Date
            </Link>
            </div>
          ) : (
            <button
              onClick={() => setShowGetStart(true)}
              className="bg-blue-800 p-2 rounded-lg hover:bg-black transition duration-300"
            >
              Get Started
            </button>
          )}

          {showGetStart && <GetStartModel closeGetModel={closeGetModel} />}
        </div>
      </div>
      {/* ................. */}

      {/* .........features section........ */}
      <div
        className="lg:px-12 px-2 my-12 lg:-mt-10 lg:absolute"
        style={{
          display: "flex",
          justifyContent: "space-between",
          // gap: "20px",
          // position: "absolute",
          // marginTop: "-40px"
        }}
      >
        <div className=" lg:flex lg:gap-12 text-white">
          <div className="bg-slate-400 px-6 my-4 lg:my-0 py-4 rounded-xl hover:bg-gray-100 shadow-xl hover:shadow-xl hover:text-black transition duration-1000 ">
            <h1 className="text-xl text-black uppercase">Wedding</h1>
            <p className="py-2">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae,
              non.
            </p>
            <Link to="/" className="p-2 bg-black rounded-lg text-white">
              Open
            </Link>
          </div>
          <div className="bg-indigo-400 px-6 my-4 lg:my-0 py-4 rounded-xl hover:bg-gray-100 hover:shadow-xl hover:text-black transition duration-1000 ">
            <h1 className="text-xl text-black uppercase">
              Birthday Celebration
            </h1>
            <p className="py-2">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae,
              non.
            </p>
            <Link to="/" className="p-2 bg-black rounded-lg text-white">
              Open
            </Link>
          </div>
          <div className="bg-amber-300 px-6 py-4 rounded-xl hover:bg-gray-100 hover:shadow-xl hover:text-black transition duration-1000 ">
            <h1 className="text-xl text-black uppercase">Get together</h1>
            <p className="py-2">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae,
              non.
            </p>
            <Link to="/" className="p-2 bg-black rounded-lg text-white">
              Open
            </Link>
          </div>
        </div>
      </div>
      {/* ..................... */}
      <div className="fixed lg:bottom-8 bottom-20 right-8">
  <button onClick={topScroll}>
    <img src={scrollImg} alt="img" className="bg-indigo-400 text-white rounded-full hover:rotate-90 transition duration-700 text-xs"/>
  </button>
</div>


      {/* gallary section */}
      <div ref={galleryRef} className="lg:pt-40 lg:px-12 bg-white">
        <h1 className="text-2xl flex justify-center uppercase underline font-bold text-gray-500 py-4">
          gallary
        </h1>
        <div className="lg:flex gap-6 p-4 lg:p-12">
          <div className="my-4 lg:my-0">
            <img src={backgroundImage} alt="img" className="rounded-t-xl" />
            <div className="bg-amber-400 text-gray-700 px-2 flex justify-between items-center rounded-b-xl">
              <h1 className="">Wedding Image</h1>
              <h1 className="hover:text-white text-2xl">&rarr;</h1>
            </div>
          </div>
          <div className="my-4 lg:my-0">
            <img src={backgroundImage} alt="img" className="rounded-t-xl" />
            <div className="bg-amber-400 text-gray-700 px-2 flex justify-between items-center rounded-b-xl">
              <h1 className="">Bithday Image</h1>
              <h1 className="hover:text-white text-2xl">&rarr;</h1>
            </div>
          </div>
          <div className="my-4 lg:my-0">
            <img src={backgroundImage} alt="img" className="rounded-t-xl" />
            <div className="bg-amber-400 text-gray-700 px-2 flex justify-between items-center rounded-b-xl">
              <h1 className="">Get Together Image</h1>
              <h1 className="hover:text-white text-2xl">&rarr;</h1>
            </div>
          </div>
        </div>
      </div>
      {/* ...................... */}
      {/* services section */}
      <div ref={servicesRef} className="py-12">
        <h1 className="text-2xl flex justify-center uppercase underline font-bold text-gray-500 py-4">
          Services
        </h1>
        <div className="lg:flex gap-6 justify-center lg:px-20 px-4 flex-wrap">
          <div className="lg:w-[40%] my-4 lg:my-0">
            <img src={backgroundImage} alt="img" className="rounded-t-xl" />
            <div className="bg-amber-400 px-4 py-2 rounded-b-xl">
              <h1 className="text-xl uppercase">catering</h1>
              <p className="text-gray-700">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptatum, dolorem.
              </p>
            </div>
          </div>
          <div className="lg:w-[40%] my-4 lg:my-0">
            <img src={backgroundImage} alt="img" className="rounded-t-xl" />
            <div className="bg-indigo-400 px-4 py-2 rounded-b-xl">
              <h1 className="text-xl uppercase">Unique Decorations</h1>
              <p className="text-gray-700">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptatum, dolorem.
              </p>
            </div>
          </div>
          <div className="lg:w-[40%] my-4 lg:my-0">
            <img src={backgroundImage} alt="img" className="rounded-t-xl" />
            <div className="bg-blue-400 px-4 py-2 rounded-b-xl">
              <h1 className="text-xl uppercase">Food serve Facility</h1>
              <p className="text-gray-700">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptatum, dolorem.
              </p>
            </div>
          </div>
          <div className="lg:w-[40%] my-4 lg:my-0">
            <img src={backgroundImage} alt="img" className="rounded-t-xl" />
            <div className="bg-amber-400 px-4 py-2 rounded-b-xl">
              <h1 className="text-xl uppercase">Music band</h1>
              <p className="text-gray-700">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptatum, dolorem.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* .............. */}
      {/* contact section */}
          <div ref={contactRef} className="bg-gray-900 text-gray-300 lg:p-20 py-12 flex justify-center">
            <div className="lg:flex lg:gap-8">

              <div className="lg:bg-gray-800 lg:p-20 p-4  rounded-xl">
                <h1 className="lg:text-5xl text-3xl font-semibold text-white pb-2">Contact Us..</h1>
                <h1 className="font-semibold text-xl pb-12">Deo-Vansh Palace & Restuarent</h1>
                  <div className="flex gap-8 py-2 font-semibold">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    className="w-8 h-8 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <h1>+91 7004834415</h1>
                  </div>
                <div className="flex gap-8 pt-2 font-semibold">
                <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    className="w-8 h-8 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <h1>akashkumargoutam216@gmail.com</h1>
                </div>
              </div>

              <div>
                <form className="flex px-2 flex-col"> 
                  <input placeholder="Name" className="bg-gray-800 px-2 lg:mt-0 mt-4 py-3 font-semibold rounded-lg lg:w-[130%]"/>
                  <input placeholder="Email" className="bg-gray-800 px-2 my-4 py-3 font-semibold rounded-lg lg:w-[130%]"/>
                  <textarea className="bg-gray-800 px-2 py-4 rounded-lg font-semibold lg:w-[130%]" placeholder="message"/>
                  <button
                  type="submit"
                  className="md:w-32 bg-black hover:bg-gray-900 text-white font-bold py-3 px-6 rounded-lg mt-3 hover:bg-indigo-500 transition ease-in-out duration-300"
                >
                  Submit
                </button>
                </form>
              </div>

            </div>
          </div>
      {/* ........... */}

      <div ref={aboutRef} className="bg-gray-100 lg:px-12 px-4">
      <section className="lg:px-12">
    <div className="lg:container lg:mx-auto py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
            <div className="max-w-lg">
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">About Us</h2>
                <p className="lg:mt-4 text-gray-600 text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis
                    eros at lacus feugiat hendrerit sed ut tortor. Suspendisse et magna quis elit efficitur consequat.
                    Mauris eleifend velit a pretium iaculis. Donec sagittis velit et magna euismod, vel aliquet nulla
                    malesuada. Nunc pharetra massa lectus, a fermentum arcu volutpat vel.</p>
                <div className="mt-8">
                    <a href="#" className="text-blue-500 hover:text-blue-600 font-medium">Learn more about us
                        <span className="ml-2">&#8594;</span></a>
                </div>
            </div>
            <div className="mt-12 md:mt-0">
                <img src="https://images.unsplash.com/photo-1531973576160-7125cd663d86" alt="About Us Image" className="object-cover rounded-lg shadow-md"/>
            </div>
        </div>
    </div>
</section>
      </div>
    </div>
  );
}

export default Home;
