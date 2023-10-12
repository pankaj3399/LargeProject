//import React from 'react';
import React, { useState } from 'react';

const app_name = 'progress-tracker-4331-88c53c23c126'

function buildPath(route)
{
    if (process.env.NODE_ENV === 'production') 
    {
        return 'https://' + app_name +  '.herokuapp.com/' + route;
    }
    else
    {        
        return 'http://localhost:5000/' + route;
    }
}

function Login()
{
    var loginName;
    var loginPassword;
    const [message, setMessage] = useState('');


        const doLogin = async event => 
        {
            event.preventDefault();
    
            var obj = {login:loginName.value,password:loginPassword.value};
            var js = JSON.stringify(obj);
    
            try
            {

                const response = await fetch(buildPath('api/login'),{method:'POST',body:js,headers:{'Content-Type': 'application/json'}});


                var res = JSON.parse(await response.text());
                if( res.id <= 0 )
                {
                    setMessage('User/Password combination incorrect');
                }
                else
                {
                    var user = {firstName:res.firstName,lastName:res.lastName,id:res.id}
                    localStorage.setItem('user_data', JSON.stringify(user));
    
                    setMessage('');
                    window.location.href = '/users';            /// sends the user to a page /users which does not exist in this case.      // could change to /home
                }
            }
            catch(e)
            {
                //setMessage("Error is here!!");
                alert(e.toString());
                return;
            }
        };
        
    
    return(
      <div id="loginDiv">
        <form onSubmit={doLogin}>
        <span id="inner-title">PLEASE LOG IN</span><br />
    <input type="text" id="loginName" placeholder="Username" ref={(c) => loginName = c} />
    <br/>
    <input type="password" id="loginPassword" placeholder="Password" ref={(c) => loginPassword = c} />
    <br/>
    <input type="submit" id="loginButton" class="buttons" value = "Do It"
          onClick={doLogin} />
        </form>
        <span id="loginResult">{message}</span>

     </div>
    );
};

export default Login;