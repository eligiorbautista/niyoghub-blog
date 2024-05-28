import React from "react";

const About = () => {
  const teamMembers = [
    {
      name: "Eli Bautista",
      role: "Lead Dev",
      imageUrl:
        "https://scontent.fmnl4-7.fna.fbcdn.net/v/t39.30808-1/441936809_2811533052338666_2287532679421027603_n.jpg?stp=dst-jpg_s200x200&_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFYi2ifsE1vdt6C9QsgrO9RpGqQsXGj-kOkapCxcaP6QwW80mR2aRrbpQKt3T0RvmSfEciquIA2ySRDc6eiEh1n&_nc_ohc=PZ6s7dvWVuUQ7kNvgEIaeaO&_nc_ht=scontent.fmnl4-7.fna&oh=00_AYCzMtSEbI0IDemCPb09mh0soIBeLJtd3pcUjJcLWmSOmA&oe=66567D37",
    },
    {
      name: "Enya Almendras",
      role: "Backend Dev",
      imageUrl:
        "https://scontent.fmnl4-2.fna.fbcdn.net/v/t39.30808-1/438303950_1129146958379297_4947716357198358034_n.jpg?stp=dst-jpg_p200x200&_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFv5W_Gwr1x60L81WpMxdeEoN2HcXe6x-Gg3Ydxd7rH4W_4FSGkjHHDXrwSWU1UGXCw6AhOU0aU5BrlwzFy1mG5&_nc_ohc=dUoXD7lWkc0Q7kNvgE6SFs0&_nc_ht=scontent.fmnl4-2.fna&oh=00_AYC_5_tSmwNTuZtjCq4WoauwDu5T1vEsNg83gklu7gNqyQ&oe=66566516",
    },
    {
      name: "Marianne Nikki Bernardo",
      role: "Frontend Dev",
      imageUrl:
        "https://scontent.fmnl4-3.fna.fbcdn.net/v/t39.30808-1/380587054_2272323679621635_7675024752347681022_n.jpg?stp=dst-jpg_p200x200&_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGx8W-hBvV4cKpOKorz9Nvhf-YVAhhM2ot_5hUCGEzai1l1iyvK2i7_0Awmz5KEMm6oCRKon7qzdQlg5rNHQHUj&_nc_ohc=UAuYwkpZMM0Q7kNvgF00oUr&_nc_ht=scontent.fmnl4-3.fna&oh=00_AYD-NWdpr2V05JD_sDMzYb2tOU5XHOeMAB-E1uUGIz9NkA&oe=66567116",
    },
    {
      name: "Glenn Oreto",
      role: "Frontend Dev",
      imageUrl:
        "https://scontent.fmnl4-4.fna.fbcdn.net/v/t39.30808-6/438031826_1031393065012682_5156900648938981102_n.jpg?stp=c0.23.206.206a_cp6_dst-jpg_p206x206&_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHoDjlpK_3iwVr1O89M_H2DVtbFpq4FIQpW1sWmrgUhCqFpFEf_HqiEIXCZHKNL3ZyvrrmPj0w5MTvyo02KLMn8&_nc_ohc=Z20rbWn0kMYQ7kNvgF0ci4v&_nc_ht=scontent.fmnl4-4.fna&oh=00_AYAYiO_O4HFKKDo6fJkHbJhvp5_MP28NIFDXUFVKUXk2ag&oe=6656880D",
    },
  ];

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            About NiyogHub
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            NiyogHub is your go-to platform for creating, discovering, and
            sharing captivating blog content. Whether you're a seasoned writer
            or just starting your blogging journey, NiyogHub provides you with
            the tools and community support you need to thrive.
          </p>
        </div>
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Meet Our Project Team
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We are proud to present the talented individuals who contributed to
            our project NiyogHub
          </p>
        </div>
        <ul
          role="list"
          className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
        >
          {teamMembers.map((member) => (
            <li key={member.name}>
              <div className="flex items-center gap-x-6">
                <img
                  className="h-16 w-16 rounded-full"
                  src={member.imageUrl}
                  alt={member.name}
                />
                <div>
                  <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                    {member.name}
                  </h3>
                  <p className="text-sm font-semibold leading-6 text-emerald-600">
                    {member.role}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default About;
