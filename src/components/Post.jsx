import React from 'react';
import './styles/App.css'

const Post = ({post}) => {
    return (
        <div className='post'>
            <div className='post__content'>
                <div>{post.id}</div>
                <div>{post.title}</div>
                <div>{post.body}</div>

            </div>
            <div className='post__btn'>
                <button>Delete</button>
            </div>
        </div>
    );
};

export default Post;