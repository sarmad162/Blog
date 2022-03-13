import React from 'react';

import axios from 'axios';

class EditPost extends React.Component {

  constructor(props){

    super(props);

    if(!localStorage.getItem('token')){

      this.props.history.push('/login');
    }


    this.onChangeTitle = this.onChangeTitle.bind(this);

    this.onChangeContent = this.onChangeContent.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {


      title: '',

      content: '',

      autherId: '',

      isloading: true,

      error: ''

    };

  }

 
  onChangeTitle(e){
    this.setState({

      title: e.target.value,

      error:''

    });
  }

  onChangeContent(e){
    this.setState({

     content: e.target.value,

      error:''

    });
  }

  onSubmit(e){
    e.preventDefault();
    
    let data = {

      title: this.state.title,

      content: this.state.content
    };

    axios.put('/api/posts/'+this.props.match.params.id, data)

    .then(res =>{
  
      this.props.history.push('/');

    })
    
    .catch(err => {
      this.setState({
        error: err.response.data.message
      });
    })
  }

  componentDidMount(){

    axios.get('/api/posts/'+this.props.match.params.id)

    .then(res =>{
      this.setState({

        title:res.data.title,
        content: res.data.content,
        autherId: res.data.auther._id,
        isloading: false

      })
    })
  }

  renderError(){
    return this.state.error ? (<blockquote>{this.state.error}</blockquote>): "";
  }
  render() {

    if(this.state.isloading){

      return(<h4>الرجاء الانتظار</h4>);

    }
    if(localStorage.getItem('_id') !== this.state.autherId){

      return(<blockquote>خطأ 403</blockquote>);

    }
    return (
      
       <div className="column column-50 column-offset-25" >

        

         <h4>تعديل تدوينة </h4>

         <hr />

         {this.renderError()}

         <form onSubmit={this.onSubmit}>

           
           <label>العنوان</label>

          <input type="text" value={this.state.title} onChange={this.onChangeTitle} />

          <label>المحتوى</label>

          <textarea value={this.state.content} onChange={this.onChangeContent}></textarea>

          <input className="button" type="submit" value=" تعديل تدوينة " />


         </form>


       </div>
      
    );
  }
}

export default EditPost;
