import React, { Component } from 'react';
import { render } from 'react-dom';

class App extends Component {

    addUser(e) {
        e.preventDefault();
        var formData = new FormData(document.getElementById("usuario"))
        console.log(formData.get('first_name'));
        var url = '/graphql';
        var data = { "query" : `mutation{ 
            createUser(data: { 
                firstName: "${formData.get('first_name')}" 
                lastName: "${formData.get('last_name')}"
                email: "${formData.get('email')}"
                password: "${formData.get('password')}"
            }){
                id 
            } 
        }` };

        fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response));
    }

    render() {
        return (
                    <div className="row">
                        <form className="col s12" onSubmit={this.addUser} id="usuario">
                            <div className="row">
                                <div className="input-field col s6">
                                    <input id="first_name" name="first_name" type="text" className="validate"/>
                                    <label htmlFor="first_name">First Name</label>
                                </div>
                                <div className="input-field col s6">
                                    <input id="'last_name'" name="last_name" type="text" className="validate"/>
                                    <label htmlFor="last_name">Last Name</label>
                                </div>
                            </div>
                            
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="password" name="password" type="password" className="validate"/>
                                    <label htmlFor="password">Password</label>
                                </div>
                            </div>

                            <div className="row">
                                    <div className="input-field col s12">
                                        <input id="email" name="email" type="email" className="validate"/>
                                        <label htmlFor="email">Email</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s12">
                                    <div className="file-field input-field">
                                        <div className="btn">
                                            <span>File</span>
                                            <input type="file"/>
                                        </div>
                                        <div className="file-path-wrapper">
                                            <input className="file-path validate" type="text"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s12">
                                    <button className="btn waves-effect waves-light" type="submit" name="action">Submit
                                        <i className="material-icons right">send</i>
                                    </button>
                                </div>
                            </div>
                    </form>
                    </div>
        )
    }
}

render(<App />, document.getElementById('app'));
