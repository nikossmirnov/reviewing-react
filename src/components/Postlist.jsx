import React from 'react';
import Post from "./Post";

const Postlist = ({posts, title}) => {
    return (
        <div>
            <h1 style={{textAlign: 'center'}}>{title}</h1>
            {posts.map(post =>
                <Post post={post} key={post.id}/>
                )
            }
        </div>
    );
};

export default Postlist;