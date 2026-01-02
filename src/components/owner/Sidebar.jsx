import React, { useState } from "react";
import { assets, ownerMenuLinks } from "../../assets/assets";
import { NavLink, useLocation } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Sidebar = () => {
  const { user, axios, fetchUser } = useAppContext();
  const location = useLocation();
  const [image, setImage] = useState("");

  const updateImage = async () => {
    try {
      const formData = new FormData();
      formData.append("image", image);
      const { data } = await axios.put("/api/owner/update-image", formData);

      if (data.success) {
        fetchUser();
        toast.success(data.message);
        setImage("");
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      className="relative min-h-screen flex flex-col items-center pt-6
      w-14 md:max-w-60 md:w-full border-r border-borderColor text-sm"
    >
      {/* Profile */}
      <div className="group relative">
        <label htmlFor="image">
          <img
            src={
              image
                ? URL.createObjectURL(image)
                : user?.image ||
                  "https://images.unsplash.com/photo-1494905998402-395d579af36f"
            }
            className="h-8 w-8 md:h-14 md:w-14 rounded-full mx-auto"
          />
          <input
            type="file"
            hidden
            id="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <div className="absolute hidden top-0 left-0 right-0 bottom-0 bg-black/10 rounded-full group-hover:flex items-center justify-center">
            <img src={assets.edit_icon} className="h-3 w-3" />
          </div>
        </label>
      </div>

      {image && (
        <button
          className="absolute top-1 right-1 p-1 bg-primary/10 text-primary"
          onClick={updateImage}
        >
          <img src={assets.check_icon} width={12} />
        </button>
      )}

      <p className="mt-2 text-base hidden md:block">{user?.name}</p>

      {/* Links */}
      <div className="mt-6 w-full flex flex-col items-center md:items-stretch">
        {ownerMenuLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            className={`relative flex items-center justify-center md:justify-start gap-2 w-full py-3 md:pl-4
              ${
                link.path === location.pathname
                  ? "bg-primary/10 text-primary"
                  : "text-gray-600"
              }
            `}
          >
            <img
              src={
                link.path === location.pathname ? link.coloredIcon : link.icon
              }
              className="h-5 w-5"
            />
            <span className="hidden md:block">{link.name}</span>

            <div
              className={`${link.path === location.pathname && "bg-primary"}
              w-1.5 h-6 rounded-l absolute right-0`}
            ></div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
