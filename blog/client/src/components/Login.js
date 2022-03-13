import React from 'react';

import axios from 'axios';

class Login extends React.Component {

  constructor(props){

    super(props);

    if(localStorage.getItem('token')){

      this.props.history.push('/');
    }


    this.onChangeEmail = this.onChangeEmail.bind(this);

    this.onChangePassword = this.onChangePassword.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {


      email: '',

      password: '',

      error: ''

    };

  }

 
  onChangeEmail(e){
    this.setState({

      email: e.target.value,

      error:''

    });
  }

  onChangePassword(e){
    this.setState({

      password: e.target.value,

      error:''

    });
  }

  onSubmit(e){
    e.preventDefault();
    
    let data = {

      email: this.state.email,

      password: this.state.password
    };

    axios.post('/api/auth', data)

    .then(res =>{

      localStorage.setItem('token', res.data.token);

      localStorage.setItem('_id', res.data._id);

      axios.defaults.headers.common = {'Authorization': res.data.token};

      this.props.history.push('/');
    })
    
    .catch(err => {
      this.setState({
        error: err.response.data.message
      });
    })
  }

  renderError(){
    return this.state.error ? (<blockquote>{this.state.error}</blockquote>): "";
  }
  render() {
    return (
      
       <div className="column column-50 column-offset-25" >

        

         <h4>تسجيل الدخول </h4>

         <hr />

         {this.renderError()}

         <form onSubmit={this.onSubmit}>

           
           <label>البريد الالكتروني</label>

          <input type="email" value={this.state.email} onChange={this.onChangeEmail} />

          <label>كلمة المرور</label>

          <input type="password"  value={this.state.password} onChange={this.onChangePassword} />

          <input className="button" type="submit" value=" تسجيل الدخول " />


         </form>


       </div>
      
    );
  }
}

export default Login;
