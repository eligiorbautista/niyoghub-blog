import React from 'react';
import { format, formatDistanceToNow, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';

const Post = ({ _id, title, summary, cover, createdAt, author }) => {

  const elapsedTime = formatDistanceToNow(parseISO(createdAt), { addSuffix: true }).replace('about', '');

  return (
    <Link to={`/post/${_id}`} >
      <div className="max-w-sm w-full lg:max-w-full mx-auto mt-10">
        <div className="h-48 w-full flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden">
          <img className="w-full h-full object-cover" src={`http://localhost:8000/${cover}`} alt="Post Cover" />
        </div>
        <div className="border border-gray-200 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal w-full">
          <div className="mb-4">
            <h2 className="text-gray-900 font-bold text-xl mb-2 truncate">{title}</h2>
            <p className="text-gray-700 text-base truncate">{summary}</p>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-900 leading-none font-semibold text-sm">{author ? author.displayName : 'test author'}</p>
              <p className="text-gray-600 text-xs mt-1">{format(new Date(createdAt), 'MMM d, yyyy')}</p>
              <p className="text-gray-600 text-xs mt-1">{format(new Date(createdAt), 'HH:mm ∙ ')}{elapsedTime && <span>{elapsedTime}</span>}</p>
            </div>

          </div>
        </div>
      </div>
    </Link>
  );
};

export default Post;
