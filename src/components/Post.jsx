import React from 'react';
import '../styles/App.css'
import MyBtn from "./UI/button/MyBtn";

const Post = ({post, number, remove}) => {
    return (
        <div className='post'>
            <div className='post__content'>
                <div>{number}</div>
                <div>{post.id}</div>
                <div>{post.title}</div>
                <div>{post.body}</div>

            </div>
            <div className='post__btn'>
                <MyBtn onClick={() => remove(post)}>Delete</MyBtn>
            </div>
        </div>
    );
};

export default Post;