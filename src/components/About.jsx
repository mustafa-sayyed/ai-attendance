import React from "react";

function About() {
  return (
    <div className="min-h-[90vh] text-white text-center">
      <div className="py-12 md:max-w-4xl mx-auto">
        <h1 className="text-3xl">About the Product</h1>
        <div className="flex flex-col sm:flex-row justify-center items-center my-10 gap-10 px-10">
          <div className="w-full h-64 bg-gray-900">
          </div>
          <div className="w-full text-left">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis iste
            cupiditate, ut dicta quod pariatur delectus laboriosam quasi? Tenetur nisi
            nesciunt voluptate debitis aspernatur architecto molestias nam eius commodi,
            ducimus saepe quia neque perspiciatis natus earum amet? Rem ratione, ut,
            corporis adipisci ducimus iusto vel, laborum eum debitis veniam at.
          </div>
        </div>
        <h1 className="text-3xl">About the Developer</h1>
        <div className="mt-10 flex flex-col md:flex-row justify-center items-center gap-8 px-10    ">
          <div className="h-64 bg-gray-900 w-64 rounded-full ">
            <img src="#" alt="" className="" />
          </div>
          <div className="md:w-[60%] text-left">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt
              doloremque consectetur animi iste sint, laudantium, nam fugit dolor optio
              quasi ullam in magnam voluptas nisi eius facere id mollitia? Odio quod
              voluptatibus sunt magni! Doloribus animi voluptatum laudantium nostrum odit?
            </p>
          </div>
        </div>
        <div className="py-10 px-10">
          <h1 className="text-2xl text-left">Skills</h1>
          <div className="flex justify-center items-center mt-10 flex-col md:flex-row gap-10">
            <div className="h-40 w-56 rounded-2xl bg-gray-900 "></div>
            <div className="h-40 w-56 rounded-2xl bg-gray-900 "></div>
            <div className="h-40 w-56 rounded-2xl bg-gray-900 "></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
