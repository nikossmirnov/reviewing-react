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
import {getPageCount, getPagesArray} from "./utils/pages";
import Pagination from "./components/UI/pagination/Pagination";

function App() {

    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({sort: '', query: ''});
    const [modal, setModal] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] =  useState(1);

    const [fetchPosts, isLoading, postError] = useFetching(async (limit, page) => {
            const response = await PostService.getAll(limit, page);
            setPosts(response.data);
            const totalCount = response.headers['x-total-count'];
            setTotalPages(getPageCount(totalCount, limit))
        }
    )


    useEffect(() => {
        fetchPosts(limit, page);
    }, [])

    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }
    const deletePost = (post) => {
        setPosts(posts.filter((p) => p.id !== post.id))
    }

    const changePage = (page) => {
        setPage(page);
        fetchPosts(limit, page);
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
        <Pagination page={page} changePage={changePage} totalPages={totalPages} />
        </div>
  );
}

export default App;
