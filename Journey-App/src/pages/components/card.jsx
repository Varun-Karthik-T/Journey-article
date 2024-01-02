import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Card = ({ id, title, subheading, author, imageLink }) => {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    async function fetchLike(id) {
      try {
        const response = await axios.post('https://journey-api-eb2a.onrender.com/fetchlike', {
          id: id,
        });
        setIsLiked(response.data.like);
      } catch (error) {
        console.error('Error while fetching like:', error);
      }
    }
    fetchLike(id);
  }, [id]); 
  
  return (
    <div className="bg-secondary rounded-lg shadow-md p-6 m-10 transition duration-200 hover:-translate-y-1 hover:scale-105">
      {imageLink && (
        <img src={imageLink} alt="Article" className="mb-4 rounded-lg w-full" />
      )}
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="mb-4">
        <p className="text-background font-extrabold border-solid border-primary py-2 border-b-2 rounded">{subheading}</p>
        <p className="text-background">Author: {author}</p>
      </div>
      <div className="flex space-x-4 justify-between">
        <Link to={`/article/${id}`}>
          <button
            className="bg-primary text-white hover:bg-green-800 py-2 px-4 rounded transition-colors"
          >
            View Article
          </button>
        </Link>
        <button
          className="transition-colors flex justify-between w-full sm:w-auto  text-white py-2 px-4 rounded"
          onClick={async () => {
            setIsLiked(!isLiked)
              try {
                const response = await axios.post('https://journey-api-eb2a.onrender.com/like', {
                  id: id,
                });
              } catch (error) {
                console.error('Error liking:', error);
              }
            }
          }
        >

          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={isLiked ? '#dd000d' : '#ffffff'} className="w-8 h-8 hover:stroke-red-700">
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>

        </button>
      </div>
    </div>
  );
};

export default Card;