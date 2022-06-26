import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import Loader from "../components/UI/Loader/Loader";

const PostIdPage = () => {
    const params = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);

    const [fetchPostId, isLoading, error] = useFetching(async (id) => {
        const response = await PostService.getId(id)
        setPost(response.data)
    })
    const [fetchComments, isComLoading, comError] = useFetching(async (id) => {
        const response = await PostService.getComments(id)
        setComments(response.data)
        console.log(comments)
    })
    useEffect(() => {
        fetchPostId(params.id)
        fetchComments(params.id)
    }, [])
    return (
        <div>
            <h1>opened{params.id}</h1>
            {isLoading
                ? <Loader />
                : <div> {post.id} {post.title}</div>
            }
            <h1>Comments</h1>
            {isComLoading
                ? <Loader />
                : <div >
                    {comments.map(c =>
                        <div style={{marginTop: '15px'}}>
                            <div>{c.email}</div>
                            <div>{c.body}</div>
                        </div>
                    )}
                   </div>
            }
        </div>

    );
};

export default PostIdPage;