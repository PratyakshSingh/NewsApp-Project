import React from 'react'

const NewsItem = ({title, description, imageUrl, newsUrl, author, date}) => { 
            return (
            <div className="my-3">
                <div className="container">
                <div className="card">
                    <img src={!imageUrl?"https://cdn.cnn.com/cnnnext/dam/assets/200318101551-01-us-canada-border-file-super-tease.jpg":imageUrl} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-muted">By <strong>{author?author:"Unknown"}</strong> on {new Date(date).toGMTString()}</small></p>
                        <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">Read more</a>
                    </div>
                </div>
                </div>
            </div>
        )
}
export default NewsItem


