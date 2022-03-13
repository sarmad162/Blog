import React from 'react';

import axios from 'axios';

import {Link} from 'react-router-dom';


class ViewPost extends React.Component{

  constructor(props){

    super(props);

    this.deletePost = this.deletePost.bind(this);

    this.onChangeComment = this.onChangeComment.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state ={

      post:{},

      comment: '',

      commentError: '',

      error:''
    };
  }


  onChangeComment(e){

    this.setState({

      comment:e.target.value,

      commentError:''
    });

  }

  onSubmit(e){

    e.preventDefault();

    let data = {content: this.state.comment};

    axios.post('/api/comments/'+this.props.match.params.id, data)

    .then(res =>{

      let post = this.state.post;

      post.comments.push({
        _id: res.data._id,

        content: res.data.content,

        auther: {_id: localStorage.getItem('_id')}

      });

      this.setState({

        post: post,

        commentError:'',

        comment:''

      });
    })

    .catch(err =>{

      this.setState({

        commentError: <blockquote>{err.response.data.message}</blockquote>
      });
    });
  }

  deletePost(){

    axios.delete("/api/posts/"+this.state.post._id)

    .then(res =>{

      this.props.history.push('/');

    })
  }


  componentDidMount(){

    let postId = this.props.match.params.id;
    axios.get('/api/posts/'+postId)
    .then(res =>{
      this.setState({
        post:res.data,

        error:''
      });
    })

    .catch(err => {
      this.setState({
        error:err.response.data.message
      });
    });
  }

  renderAction(){

    if(localStorage.getItem('token')&& localStorage.getItem('_id')===this.state.post.auther._id){

      return(

        <span>

          <Link to={"/post/edit/"+this.state.post._id}>

            <button>تعديل</button>
          </Link>

          <button onClick={this.deletePost}>حذف</button>

        </span>
      )
    }
  }

  renderComments(){

    let comments = <p>لا يوجد تعليقات</p>;

    if(this.state.post.comments.length){

      comments = this.state.post.comments.map(comment =>{

        return(

          <p key={comment._id}>
            <strong className='title' >
              {comment.auther._id === localStorage.getItem('_id') ? 'أنا': comment.auther.name}
            </strong>
            <br/>

            {comment.content}

          </p>

        );

      });
    }

    return comments;

  }

  renderCommentForm(){

    if(!localStorage.getItem('token')){

      return(<p>الرجاء تسجيل الدخول للتعليق على هذه التدوينة</p>);

    }

    return(
      <div>

        <h4>اضافة تعليق</h4>

        {this.state.commentError}

        <form onSubmit={this.onSubmit}>

          <textarea value={this.state.comment} onChange={this.onChangeComment}></textarea>

          <input className='button-primary' type="submit" value= "ارسال" />

        </form>
      </div>
    )
  }

  render(){

    if(this.state.error){
      return(<blockquote>{this.state.error}</blockquote>);

    }

    if(!this.state.post.title){

      return(<h4>الرجاء الانتظار</h4>);

    }

    return(

      <div className="column" >

            <h4>{this.state.post.title}</h4>

            <h6 className="title" >{this.state.post.auther.name}</h6>

            <p>{this.state.post.content}</p>

            {this.renderAction()}
            
            <hr />

            <h4>التعليقات</h4>

            {this.renderComments()}

            {this.renderCommentForm()}


      </div>
    );

          
  }

}


export default ViewPost;
