import React, { Component } from 'react';
import { render } from 'react-dom';

class App extends Component {

    addUser(e) {
        e.preventDefault();
        const formData = new FormData(document.getElementById("formulario"));
        fetch('/upload', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response));
    }

    render() {
        return (
                <div className="row">
                    {/* <form className="col s12" action="/upload" method="POST" id="usuario" encType="multipart/form-data"> */}
                    <form className="col s12" onSubmit={this.addUser} id="formulario">
                        <div className="row">
                            <div className="input-field col s6">
                                <input id="firstName" name="firstName" type="text" className="validate"/>
                                <label htmlFor="firstName">First Name</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="'lastName'" name="lastName" type="text" className="validate"/>
                                <label htmlFor="lastName">Last Name</label>
                            </div>
                        </div>

                        <div className="row">
                                <div className="input-field col s12">
                                    <input id="email" name="email" type="email" className="validate"/>
                                    <label htmlFor="email">Email</label>
                            </div>
                        </div>
                        
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="password" name="password" type="password" className="validate"/>
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                        
                        <div className="row">
                            <div className="col s12">
                                <div className="file-field input-field">
                                    <div className="btn">
                                        <span>File</span>
                                        <input type="file" name="profile_image"/>
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
