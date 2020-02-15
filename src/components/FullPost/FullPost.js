import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {

    deletePostHandler = () => {
        axios.delete("https://jsonplaceholder.typicode.com/posts/" + this.props.selectedId)
        .then(response => console.log(response));
    };

    render () {
        let post = <p style={{textAlign: "center"}}>Please select a Post!</p>;

        if(this.props.selectedId){
            <p style={{textAlign: "center"}}>Loading...</p>
        }

        if(this.props.post) {
            post = (
                <div className="FullPost">
                    <h1>{this.props.post.title}</h1>
                    <p>{this.props.post.body}</p>
                    <div className="Edit">
                        <button className="Delete" onClick={this.deletePostHandler}>Delete</button>
                    </div>
                </div>
    
            );        
        }       
        return post;
    }
}

export default FullPost;