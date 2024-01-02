import React, { useState } from 'react';
import Header from './components/header';
import axios from 'axios';

const ArticleForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageLink, setImageLink] = useState('');
    const [selectedTag, setSelectedTag] = useState('');

    const tags = ['Technology', 'Travel', 'Science', 'Health', 'Sports','Politics'];

    const maxContentLength = 1800;

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log('')
            const response = await axios.post('https://journey-api-eb2a.onrender.com/submit', {
              title:title,
              content:content,
              imageLink:imageLink,
              tag: selectedTag
            });
            alert('Your article has been submitted successfully!')
            setTitle('');
            setContent('');
            setImageLink('');
            setSelectedTag('');
          } catch (error) {
            console.error('Error creating article:', error);
            alert('There was a problem in submitting your article, please try again')
          }
    };

    return (
        <>
            <Header>

            </Header>
            <div className="max-w-2xl mx-auto mt-8 p-6 bg-white shadow-md rounded-md">
                <h2 className="text-2xl font-bold mb-4 text-indigo-700">Create an Article</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-600">
                            Title:
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="mt-1 p-2 border border-indigo-300 rounded-md w-full focus:outline-none focus:ring focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="content" className="block text-sm font-medium text-gray-600">
                            Content:
                        </label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows="8"
                            maxLength={maxContentLength}
                            className="mt-1 p-2 border border-indigo-300 rounded-md w-full focus:outline-none focus:ring focus:border-indigo-500"
                            required
                        />
                        <p className="mt-2 text-sm text-gray-500">
                            {content.length}/{maxContentLength} characters
                        </p>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="imageLink" className="block text-sm font-medium text-gray-600">
                            Image Link:
                        </label>
                        <input
                            type="text"
                            id="imageLink"
                            value={imageLink}
                            onChange={(e) => setImageLink(e.target.value)}
                            className="mt-1 p-2 border border-indigo-300 rounded-md w-full focus:outline-none focus:ring focus:border-indigo-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="tag" className="block text-sm font-medium text-gray-600">
                            Select a Tag:
                        </label>
                        <select
                            id="tag"
                            value={selectedTag}
                            onChange={(e) => setSelectedTag(e.target.value)}
                            className="mt-1 p-2 border border-indigo-300 rounded-md w-full focus:outline-none focus:ring focus:border-indigo-500"
                            required
                        >
                            <option value="" disabled>
                                Choose a Tag
                            </option>
                            {tags.map((tag) => (
                                <option key={tag} value={tag}>
                                    {tag}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full p-2 bg-indigo-700 text-white rounded-md hover:bg-indigo-800 focus:outline-none focus:ring focus:border-indigo-500"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </>
    );
};

export default ArticleForm;
