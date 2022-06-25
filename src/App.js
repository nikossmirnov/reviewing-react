import React, {useState, useRef, useMemo} from 'react'
import './styles/App.css'
import Post from "./components/Post";
import Postlist from "./components/Postlist";
import MyBtn from "./components/UI/button/MyBtn";
import MyInput from "./components/UI/input/MyInput";
import Postform from "./components/Postform";
import MySelect from "./components/UI/select/MySelect";
import PostFilter from "./components/PostFilter";

function App() {

    const [posts, setPosts] = useState([
        {id: 1, title: 'adsadsd', body: 'aewqeqwsdsad'},
        {id: 2, title: 'sdaasd', body: 'asddddsad'},
        {id: 3, title: 'dasdasd', body: 'aewqeqwsdsad'},
    ])
    const [filter, setFilter] = useState({sort: '', query: ''})

    const sortedPosts = useMemo(() => {
        console.log('CALL')
        if(filter.sort) {
            return [...posts].sort((a,b) => a[filter.sort].localeCompare(b[filter.sort]));
        }
        return posts;
    }, [filter.sort, posts])

    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query.toLowerCase()))
    }, [filter.query, sortedPosts])
    const createPost = (newPost) => {
        setPosts([...posts, newPost])
    }
    const deletePost = (post) => {
        setPosts(posts.filter((p) => p.id !== post.id))
    }


  return (
    <div className="App">
        <Postform  create={createPost}/>
        <hr style={{margin: '15px'}}/>
        <PostFilter
            filter={filter}
            setFilter={setFilter}
        />
        <Postlist remove={deletePost} posts={sortedAndSearchedPosts} title={'POSTS'}/>
        </div>
  );
}

export default App;
