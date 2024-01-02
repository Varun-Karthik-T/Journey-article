import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const Header = ({ isJournalist, isEditor, editorCards }) => {
    const [filter, setFilter] = useState(false);
    const [sort, setSort] = useState(false);
    const navigate = useNavigate();

    const [tag, setTag] = useState('');
    const [search, setSearch] = useState('');
    const [ssort, setSsort] = useState('');

    useEffect(() => 
    console.log('isEditor: '+ isEditor +'isJournalist: ' + isJournalist),[])

    function toggleFilter() {
        if (filter) {
            setFilter(false);
            setSort(false);
        } else {
            setFilter(true);
            setSort(false);
        }
    }

    function toggleSort() {
        if (sort) {
            setSort(false);
            setFilter(false);
        } else {
            setSort(true);
            setFilter(false);
        }
    }
   
    const handleSearch = async (e) => {
        e.preventDefault();

        console.log('Search Query:', search);
        console.log('Selected Tag:', tag);
        console.log('Sort Option:', ssort);

        try {
            const response = await axios.post('https://journey-api-eb2a.onrender.com/search', {
                search: search,
                tag: tag,
                sort: ssort,
            });
            console.log(response.data)
            editorCards(response.data.result)
        } catch (error) {
            console.error('Error in search: ', error);
        }


    };

    const handleReview = async () => {
        try {
            const response = await axios.get('https://journey-api-eb2a.onrender.com/review');
            const updatedCardsData = response.data.result.map(article => ({
                article_id: article.article_id,
                article_heading: article.article_heading,
                article_content: article.article_content,
                article_img_link: article.article_img_link,
                j_username: article.j_username
            }));
            editorCards(updatedCardsData);
        } catch (error) {
            console.error('Error in review: ', error);
        }
    };


    return (
        <>
            <header className="flex flex-col sm:flex-row items-center justify-between bg-transparent rounded-lg text-primary p-4">
                <div className="flex items-center mb-2 sm:mb-0">
                    <button className="text-2xl text-font font-bold"
                        onClick={() => {
                            if (isJournalist) {
                                navigate('/journalist',{replace: true})
                            } else if (isEditor) {
                                navigate('/editor',{replace: true})
                            } else {
                                navigate('/reader',{replace: true})
                            }
                        }
                        }
                    ><img src='/banner.png' className=' h-40 w-40 ' /></button>
                </div>
                <div className="flex items-center">
                    <input
                        type="text"
                        placeholder="Search..."
                        onChange={(e) => setSearch(e.target.value)}
                        className="p-2 border border-none focus:outline-none focus:ring-2 focus:ring-offset-none focus:ring-primary bg-black text-font rounded mr-2 w-full sm:w-auto pl-8 relative"
                        style={{
                            backgroundImage: `url('/search.svg')`,
                            backgroundSize: '24px',
                            backgroundPosition: 'left center',
                            backgroundRepeat: 'no-repeat',
                        }}
                    />


                    <div className="relative inline-block text-left m-2">
                        <button
                            type="button"
                            onClick={handleSearch}
                            className="inline-flex justify-center w-full rounded-md px-4 py-2 text-sm font-medium text-primary transition duration-200 hover:-translate-y-1 hover:scale-105"
                        >
                            Search
                        </button>
                    </div>
                    <div className="relative inline-block text-left m=2">

                        <button
                            onClick={toggleFilter}
                            type="button"
                            className="inline-flex justify-center w-full rounded-md px-4 py-2 text-sm font-medium text-secondary transition duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-primary hover:text-black"
                        >
                            Filter
                        </button>
                        {filter && (
                            <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                <div
                                    className="py-1"
                                    role="menu"
                                    aria-orientation="vertical"
                                    aria-labelledby="options-menu"
                                >
                                    <button
                                        className={`block px-4 py-2 text-sm ${tag === 'Technology' ? 'text-white bg-primary' : 'text-font hover:bg-gray-100'
                                            } w-full`}
                                        role="menuitem"
                                        onClick={() => {
                                            if (tag !== 'Technology') {
                                                setTag('Technology');
                                            } else {
                                                setTag('');
                                            }
                                        }}
                                    >
                                        Technology {tag === 'Technology' && '✔'}
                                    </button>
                                    <button
                                        className={`block px-4 py-2 text-sm ${tag === 'Science' ? 'text-white bg-primary' : 'text-font hover:bg-gray-100'
                                            } w-full`}
                                        role="menuitem"
                                        onClick={() => {
                                            if (tag !== 'Science') {
                                                setTag('Science');
                                            } else {
                                                setTag('');
                                            }
                                        }}
                                    >
                                        Science {tag === 'Science' && '✔'}
                                    </button>
                                    <button
                                        className={`block px-4 py-2 text-sm ${tag === 'Sports' ? 'text-white bg-primary' : 'text-font hover:bg-gray-100'
                                            } w-full`}
                                        role="menuitem"
                                        onClick={() => {
                                            if (tag !== 'Sports') {
                                                setTag('Sports');
                                            } else {
                                                setTag('');
                                            }
                                        }}
                                    >
                                        Sports {tag === 'Sports' && '✔'}
                                    </button>
                                    <button
                                        className={`block px-4 py-2 text-sm ${tag === 'Travel' ? 'text-white bg-primary' : 'text-font hover:bg-gray-100'
                                            } w-full`}
                                        role="menuitem"
                                        onClick={() => {
                                            if (tag !== 'Travel') {
                                                setTag('Travel');
                                            } else {
                                                setTag('');
                                            }
                                        }}
                                    >
                                        Travel {tag === 'Travel' && '✔'}
                                    </button>
                                    <button
                                        className={`block px-4 py-2 text-sm ${tag === 'Health' ? 'text-white bg-primary' : 'text-font hover:bg-gray-100'
                                            } w-full`}
                                        role="menuitem"
                                        onClick={() => {
                                            if (tag !== 'Health') {
                                                setTag('Health');
                                            } else {
                                                setTag('');
                                            }
                                        }}
                                    >
                                        Health {tag === 'Health' && '✔'}
                                    </button>
                                    <button
                                        className={`block px-4 py-2 text-sm ${tag === 'Politics' ? 'text-white bg-primary' : 'text-font hover:bg-gray-100'
                                            } w-full`}
                                        role="menuitem"
                                        onClick={() => {
                                            if (tag !== 'Politics') {
                                                setTag('Politics');
                                            } else {
                                                setTag('');
                                            }
                                        }}
                                    >
                                        Politics {tag === 'Politics' && '✔'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="relative inline-block text-left ml-4">
                        <button
                            onClick={toggleSort}
                            type="button"
                            className="inline-flex justify-center w-full rounded-md px-4 py-2 text-sm font-medium text-secondary transition duration-200 hover:-translate-y-1 hover:scale-105 hover:bg-primary hover:text-black"
                        >
                            Sort
                        </button>
                        {sort && (
                            <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                <div
                                    className="py-1"
                                    role="menu"
                                    aria-orientation="vertical"
                                    aria-labelledby="options-menu"
                                >
                                    <button
                                        className={`flex items-center justify-between px-4 py-2 text-sm ${ssort === 'popularity-ascending' ? 'text-white bg-primary' : 'text-font hover:bg-gray-100'
                                            } w-full`}
                                        role="menuitem"
                                        onClick={() => {
                                            if (ssort === 'popularity-ascending') {
                                                setSsort('')
                                            } else {
                                                setSsort('popularity-ascending')
                                            }
                                        }}
                                    >
                                        By popularity {ssort === 'popularity-ascending' && '✔'} <img src="/up.svg" alt="up" className="ml-2" />
                                    </button>

                                    <button
                                        className={`flex items-center justify-between px-4 py-2 text-sm ${ssort === 'popularity-descending' ? 'text-white bg-primary' : 'text-font hover:bg-gray-100'
                                            } w-full`}
                                        role="menuitem"
                                        onClick={() => {
                                            if (ssort === 'popularity-descending') {
                                                setSsort('')
                                            } else {
                                                setSsort('popularity-descending')
                                            }
                                        }}
                                    >
                                        By popularity {ssort === 'popularity-descending' && '✔'} <img src="/down.svg" alt="down" className="ml-2" />
                                    </button>
                                    <button
                                        className={`flex items-center justify-between px-4 py-2 text-sm ${ssort === 'date-descending' ? 'text-white bg-primary' : 'text-font hover:bg-gray-100'
                                            } w-full`}
                                        role="menuitem"
                                        onClick={() => {
                                            if (ssort === 'date-descending') {
                                                setSsort('')
                                            } else {
                                                setSsort('date-descending')
                                            }
                                        }}
                                    >
                                        By Date {ssort === 'date-descending' && '✔'} <img src="/up.svg" alt="up" className="ml-2" />
                                    </button>
                                    <button
                                        className={`flex items-center justify-between px-4 py-2 text-sm ${ssort === 'date-ascending' ? 'text-white bg-primary' : 'text-font hover:bg-gray-100'
                                            } w-full`}
                                        role="menuitem"
                                        onClick={() => {
                                            if (ssort === 'date-ascending') {
                                                setSsort('')
                                            } else {
                                                setSsort('date-ascending')
                                            }
                                        }}
                                    >
                                        By Date {ssort === 'date-ascending' && '✔'} <img src="/down.svg" alt="down" className="ml-2" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    {isJournalist && (
                        <div className="relative inline-block text-left ml-4">
                            <button
                                type="button"
                                onClick={() => navigate('/submit')}
                                className="inline-flex justify-center w-full rounded-md border-none px-4 py-2 bg-accent transition duration-200 hover:-translate-y-1 hover:scale-105 text-sm font-medium text-white"
                            >
                                Submit a new article
                            </button>
                        </div>
                    )}
                    {isEditor && (
                        <div className="relative inline-block text-left ml-4">
                            <button
                                type="button"
                                onClick={() => handleReview()}
                                className="inline-flex justify-center w-full rounded-md border-none px-4 py-2 hover:bg-accent transition duration-200 hover:-translate-y-1 hover:scale-105 text-sm font-medium text-accent hover:text-black"
                            >
                                Review articles
                            </button>
                        </div>
                    )}
                    <div className="relative inline-block text-left m-2">
                        <button
                            type="button"
                            onClick={async () => {
                                try {
                                    const response = await axios.get('https://journey-api-eb2a.onrender.com/signout');
                                    console.log(response.data)
                                    if (response.data.success == true) {
                                        navigate('/')
                                    }
                                } catch (error) {
                                    console.error('Error in signout: ', error);
                                }
                            }}
                            className="inline-flex justify-center w-full rounded-md px-4 py-2 text-red-600 hover:bg-red-600 hover:text-black text-sm font-medium transition duration-200 hover:-translate-y-1 hover:scale-105"
                        >
                            Sign out
                        </button>
                    </div>
                    <div className="relative inline-block text-left m=2"></div>
                </div>
            </header>
            <hr className='border-primary border-t-2' ></hr>
        </>
    );
}

export default Header;
