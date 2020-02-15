import React, { Component } from 'react';
import axios from 'axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {

    state = {
        posts: [],
        selectedId: null,
        post: null,
        isError: false
    };

    componentDidMount() {
        axios.get("https://jsonplaceholder.typicode.com/postsss")
        .then(response => {
            const posts = response.data.splice(0, 4);
            const updatedPosts = posts.map(post => {
                return {...post, author: 'Tausif'}
            });
            this.setState({posts: updatedPosts});
        })
        .catch(error => this.setState({ isError: true }));
    }

    postSelectHandler(id) {
        this.setState({selectedId: id});
    }

    render () {

        let  posts = this.state.posts.map(post => { 
            return <Post 
                    key={post.id} post={post} 
                    clicked={() => this.postSelectHandler(post.id)} 
                    selectedId={this.state.selectedId} />
        });

        if(this.state.isError) {
            posts = <p style={{textAlign: "center"}}>Something went wrong!</p>
        }
        

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost post={this.state.post} selectedId={this.state.selectedId} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        
        if(this.state.selectedId) {

            if(this.state.selectedId !== prevState.selectedId) {
                
                axios.get("https://jsonplaceholder.typicode.com/posts/" + this.state.selectedId)
                .then(response => {
                    this.setState({post: response.data});
                });
            }
        }
        
    }
}

export default Blog;