import React, {useState} from 'react';
import MyInput from "./UI/input/MyInput";
import MyBtn from "./UI/button/MyBtn";

const Postform = ({create}) => {
    const [post, setPost] = useState({
        title: '',
        body: ''
    })
    const addNewPost = (e) => {
        e.preventDefault();
        const newPost = {
            ...post,
            id: Date.now()
        }
        create(newPost)
        setPost({title: '', body: ''})
    }

    return (
        <form>
            <MyInput
                value={post.title}
                type='text'
                placeholder='post name'
                onChange={((e) => {setPost({...post, title: e.target.value})})}
            />
            <MyInput
                value={post.body}
                onChange={((e) => {setPost({...post, body:e.target.value})})}
                type='text'
                placeholder='post desc'
            />
            <MyBtn onClick={addNewPost} >Create post</MyBtn>
        </form>
    );
};

export default Postform;