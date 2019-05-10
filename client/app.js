import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'

class App extends React.Component {
    constructor(props) {
        super();
        this.state={
            fields: {
                
            },
            errors: {
                
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitSignupForm = this.submitSignupForm.bind(this);
        
    }

    handleChange(e) {
        console.log(e.target.value);
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
            fields
        });
    }

    submitSignupForm(e) {
        e.preventDefault();
        if(this.validateForm()) {
            let fields = {};
            fields["fullname"] = "",
            fields["emailid"] = "",
            fields["phonenumber"] = "",
            fields["password"] = ""

            this.setState({fields: fields});
            alert("Form submitted");
        }
    }

    validateForm() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if(!fields["fullname"]) {
            formIsValid = false;
            errors["fullname"] = "Please enter fullname"
        }

        if (typeof fields["fullname"] !== "undefined") {
            if (!fields["fullname"].match(/^[a-zA-Z ]*$/)) {
              formIsValid = false;
              errors["fullname"] = "*Please enter alphabet characters only.";
            }
        }

        if(!fields["emailid"]) {
            formIsValid = false;
            errors["emailid"] = "plese enter email id";
        }

        if (typeof fields["emailid"] !== "undefined") {
            //regular expression for email validation
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(fields["emailid"])) {
              formIsValid = false;
              errors["emailid"] = "*Please enter valid email-ID.";
            }
          }

          if (!fields["phonenumber"]) {
            formIsValid = false;
            errors["phonenumber"] = "Please enter your phone number.";
          }
    
          if (typeof fields["phonenumber"] !== "undefined") {
            if (!fields["phonenumber"].match(/^[0-9]{10}$/)) {
              formIsValid = false;
              errors["phonenumber"] = "*Please enter valid phone number.";
            }
          }

        

        if(!fields["password"]) {
            formIsValid = false;
            errors['password'] = "please enter the password"
        }

        if(typeof fields["password"] !== "undefined") {
            if (!fields["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
                formIsValid = false;
                errors["password"] = "*Please enter secure and strong password.";
            }
        }


        this.setState({
            errors: errors
        });

        return formIsValid;
    }
    
   
    render() {
       return(
        <div>
            
            <div id="sign-up">
                <form method="post" name="userSignUpForm" onSubmit={this.submitSignupForm}>
                    <h3>Sign Up Here</h3>
                    <label>
                        Name
                    </label>
                    <input type="text" name="fullname" value={this.state.fields.fullname} onChange={this.handleChange} />
                    <div className="errorMsg">{this.state.errors.fullname}</div>
                    <label>Email Id</label>
                    <input type="text" name="emailid" value={this.state.fields.emailid} onChange={this.handleChange}/>
                    <div className="errorMsg">{this.state.errors.emailid}</div>
                    <label>Password</label>
                    <input type="password" name="password" value={this.state.fields.password} onChange={this.handleChange}/> 
                    <div className="errorMsg">{this.state.errors.password}</div>
                    <label>Phone Number</label>
                    <input type="text" name="phonenumber" value={this.state.fields.phonenumber} onChange={this.handleChange} />
                    <div className="errorMsg">{this.state.errors.phonenumber}</div>
                    
                    
                    <input type="submit" className="button" value="Submit" />
                </form>
            </div>
            
        </div>
       ); 
        
            
    }
}

ReactDOM.render(<App/>, document.getElementById('root'))