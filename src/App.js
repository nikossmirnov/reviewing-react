import React, {useState,  useEffect} from 'react'
import './styles/App.css'
import Postlist from "./components/Postlist";
import MyBtn from "./components/UI/button/MyBtn";
import Postform from "./components/Postform";
import PostFilter from "./components/PostFilter";
import Modal from "./components/UI/Modal/Modal";
import {usePosts} from "./hooks/useSortedPost";
import PostService from "./API/PostService";
import Loader from "./components/UI/Loader/Loader";
import {useFetching} from "./hooks/useFetching";

function App() {

    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({sort: '', query: ''});
    const [modal, setModal] = useState(false);
    const [fetchPosts, isLoading, postError] = useFetching(async () => {
            const posts = await PostService.getAll();
            setPosts(posts);
        }
    )

    useEffect(() => {
        fetchPosts();
    }, [])

    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }
    const deletePost = (post) => {
        setPosts(posts.filter((p) => p.id !== post.id))
    }


  return (
    <div className="App">
        <MyBtn onClick={() => setModal(true)}>
            Create post
        </MyBtn>
        <Modal visible={modal} setVisible={setModal}>
            <Postform  create={createPost}/>
        </Modal>
        <hr style={{margin: '15px'}}/>
        <PostFilter
            filter={filter}
            setFilter={setFilter}
        />
        {postError &&
            <h1>{postError}</h1>
        }
        {isLoading
            ? <div style={{display: 'flex', justifyContent: 'center', marginTop: '15px'}}><Loader /></div>
            : <Postlist remove={deletePost} posts={sortedAndSearchedPosts} title={'POSTS'}/>
        }
        </div>
  );
}

export default App;
