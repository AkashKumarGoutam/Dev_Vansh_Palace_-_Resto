import React from "react";
import logo from "../../assets/logo.png";

function Footer() {
  return (
    <div className="bg-gray-700 text-white">
      <div className="lg:flex items-center lg:px-16 px-4 pb-20 lg:pt-10 pt-10 gap-6">
        <div className="lg:w-[150%] my-4 lg:my-0">
          <img src={logo} alt="img-logo" className="rounded-xl" />
        </div>
        <div className="my-4 lg:my-0">
            <h1 className="text-xl text-blue-300 underline">INTRODUCTION</h1>
          <h1>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
            similique eaque libero autem natus reiciendis ad porro mollitia qui
            quidem tempore aliquam, fuga sint impedit voluptatibus tenetur, at
            fugiat quibusdam modi? Quaerat sunt dolores dicta aspernatur
            deleniti laborum iste suscipit soluta labore sint recusandae fuga
            natus, minus voluptas facilis delectus!
          </h1>
        </div><hr/>
        <div>
          <ul>
            <li className="hover:text-white hover:pl-1 transition duration-700 text-yellow-600 py-1 w-40">&rarr; fsdsttfssghdgg</li><hr/>
            <li className="hover:text-white hover:pl-1 transition duration-700 text-yellow-600 py-1 w-40">&rarr; fsdsttfssghdgg</li><hr/>
            <li className="hover:text-white hover:pl-1 transition duration-700 text-yellow-600 py-1 w-40">&rarr; fsdsttfssghdgg</li><hr/>
            <li className="hover:text-white hover:pl-1 transition duration-700 text-yellow-600 py-1 w-40">&rarr; fsdsttfssghdgg</li><hr/>
            <li className="hover:text-white hover:pl-1 transition duration-700 text-yellow-600 py-1 w-40">&rarr; fsdsttfssghdgg</li><hr/>
          </ul>
        </div>
        
      </div>
    </div>
  );
}

export default Footer;
