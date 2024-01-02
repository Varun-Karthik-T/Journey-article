/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from './components/header';
import Comments from './components/comment_section';

const ArticlePage = () => {
  const { id } = useParams()

  const [isEditor, setIsEditor] = useState(false)
  const [articleData, setArticleData] = useState({
    id: '',
    title: '',
    imageLink: '',
    author: '',
    content: '',
  });

  useEffect(() => {
    async function fetchArticle(id) {
      try {
        const response = await axios.post('https://journey-api-eb2a.onrender.com/article', {
          id: id,
        });
        setArticleData({
          id: response.data.id,
          title: response.data.title,
          imageLink: response.data.img,
          content: response.data.content,
          author: response.data.journalist,
          time: new Date(response.data.e_time).toString(),
          like_count: response.data.like_count,
          review: response.data.review,
        });
        if (response.data.role == 'editor') {
          setIsEditor(true)
        }
      } catch (error) {
        console.error('Error while fetching article:', error);
      }
    }
    fetchArticle(id);
  }, [id]);



  return (
    <>
      <Header>

      </Header>
      <br />
      <div className="bg-secondary text-background p-6 rounded-md shadow-lg">
        <h1 className="text-4xl font-bold mb-4">{articleData.title}</h1>
        {articleData.imageLink && (
          <img src={articleData.imageLink} alt="Article" className="mb-4 rounded-lg max-w-md mx-auto" />
        )}
        <p className="text-xl p-4"><span className='text-primary'>Author:</span> {articleData.author}</p>
        <p className="text-xl p-4"><span className='text-primary'>Published on:</span> {articleData.time}</p>
        <p className="text-xl p-4"><span className='text-primary'>{articleData.like_count}</span> people have liked this article!</p>
        <p className="text-lg">{articleData.content}</p>
        {isEditor && (
          <>
            <div className="relative inline-block text-left ml-4">
              <button
                type="button"
                onClick={async () => {
                  try {
                    const response = await axios.post('https://journey-api-eb2a.onrender.com/publish', {
                      id: articleData.id,
                    });
                    
                    alert('Article published successfully!')
                  } catch (error) {
                    console.error('Error in publish: ', error);
                  }
                }}
                className="inline-flex justify-center w-full rounded-md border-none px-4 py-2 bg-primary transition duration-200 hover:-translate-y-1 hover:scale-105 text-sm font-medium text-white"
              >
                Publish article
              </button>
            </div>
            <div className="relative inline-block text-left ml-4">
              <button
                type="button"
                onClick={async () => {
                  try {
                    const response = await axios.post('https://journey-api-eb2a.onrender.com/discard', {
                      id: articleData.id,
                    });
                    alert('Article discarded successfully!')
                  } catch (error) {
                    console.error('Error in publish: ', error);
                  }
                }}
                className="inline-flex justify-center w-full rounded-md border-none px-4 py-2 bg-red-600 transition duration-200 hover:-translate-y-1 hover:scale-105 text-sm font-medium text-white"
              >
                Discard article
              </button>
            </div>
          </>
        )}

        <div>
          <Comments
            article_id={articleData.id}>
          </Comments>
        </div>
      </div>
    </>
  );
};

export default ArticlePage;