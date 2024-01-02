import React, {useState, useEffect} from "react";
import Header from "./components/header";
import CardGrid from "./components/cardgrid";
import axios from 'axios'

export default function JournalistPage() {
    const [cardsData, setCardsData] = useState([])
    
    const fetchData = async () => {
      try {
        const response = await axios.get("https://journey-api-eb2a.onrender.com/top");
        const updatedCardsData = response.data.result.map(article => ({
          article_id: article.article_id,
          article_heading: article.article_heading,
          article_content: article.article_content,
          article_img_link: article.article_img_link,
          j_username:article.j_username,
          name:article.name}))
          setCardsData(updatedCardsData)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
  useEffect(() => {
  
      fetchData();
  }, []);
    return (
        <>
            <Header isJournalist={true} >
            </Header>
            <CardGrid cardsData={cardsData}></CardGrid>
        </>
    )
}
