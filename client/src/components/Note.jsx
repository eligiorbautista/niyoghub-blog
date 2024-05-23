import React from "react";
import { FaCalendar, FaEdit, FaTrash } from "react-icons/fa";
const Card = ({ note, onDelete, onUpdate }) => {
  /* Format Date */
  const formattedDate = new Date(note.created_at).toLocaleDateString("en-US", {
    month: "long", 
    day: "numeric",  
    year: "numeric",  
  });

  return (
    <div className="sm:w-90  lg:w-75 px-6 py-4 bg-white border border-gray-200 rounded-md shadow bg-white border-gray-700">
      <a href="#">
        <h5 className="mb-2 text-lg  text-md font-bold tracking-tight text-gray-900 text-gray-800">
          {note.title}
        </h5>
      </a>

      <p className="mb-5 font-normal text-gray-700 text-gray-600">
        {note.content}
      </p>

      <div className="flex items-center mb-3">
        <FaCalendar className=" mr-2 h-4 w-3 text-gray-800" />{" "}
        {/* Calendar icon */}
        <p className="text-sm font-normal text-gray-700 text-gray-400">
          {formattedDate}
        </p>
      </div>

      <div className="flex justify-end mb-3">
        <button className="px-3" onClick={() => onUpdate(note.id)}>
          <FaEdit />
        </button>

        <button className="px-3" onClick={() => onDelete(note.id)}>
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default Card;
