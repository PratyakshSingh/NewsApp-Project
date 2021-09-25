import React, { useState, useEffect } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";




const News = (props) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const updateNews = async () => {
        props.setProgress(0);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=d7d97c5699734c42888db675150b0619&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(10);
        let parsedData = await data.json();
        props.setProgress(30);
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false); 
        props.setProgress(100);
    }

    useEffect(() => {
        updateNews();
    }, [])
    

    // handlePrevClick = async () => {
    //     this.setState({page: this.state.page - 1});
    //     this.updateNews();
    // }

    // handleNextClick = async () => {
    //     this.setState({page: this.state.page + 1});
    //     this.updateNews();
    // }   

    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=d7d97c5699734c42888db675150b0619&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page+1);
        setLoading(true);
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
        setLoading(false);
      }

        return (
            <>
                <div className="container">
                    <h1 className="my-5 text-center">News Monkey - Top  {props.category.charAt(0).toUpperCase()+ props.category.slice(1)} Headlines</h1>
                    {loading && <Spinner/>}
                    
                    <InfiniteScroll
                        dataLength={articles.length}
                        next={fetchMoreData}
                        hasMore={articles.length !== totalResults}
                        loader={<Spinner/>}
                        >
                            <div className="container">
                                <div className="row">
                                    {
                                    articles.map((e) => {
                                        return <div className="col-md-4" key={e.url}>
                                        <NewsItem title={e.title} description={e.description} imageUrl={e.urlToImage} newsUrl={e.url} author={e.author} date={e.publishedAt}/>
                                        </div>
                                    })}
                                </div>
                            </div>
                    </InfiniteScroll>
                </div>
            </>
        )
}

News.defaultProps = {
    country: 'in',
    pageSize: 6,
    category: 'general'
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News;