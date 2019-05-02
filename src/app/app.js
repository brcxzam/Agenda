import React, { Component } from 'react';
import { render } from 'react-dom';

class App extends Component {

    constructor() {
        super();
        this.state = {profile_image: 'dk_wize_owl_product_icon.png'};
        
        this.addUser = this.addUser.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    addUser(e) {
        e.preventDefault();
        const form = document.getElementById("formulario");
        const formData = new FormData(form);
        fetch('/upload', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                const { profile_image } = response;
                this.setState({ profile_image });
            });
    }
    
    handleChange() {
        const form = document.getElementById("formulario");
        const formData = new FormData(form);
        fetch('/upload', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                const { profile_image } = response;
                console.log(profile_image);
                this.setState({ profile_image });
            });
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
                            <div className="col s6">
                                <div className="file-field input-field">
                                    <div className="btn">
                                        <span>File</span>
                                        <input type="file" name="profile_image" onChange={this.handleChange}/>
                                    </div>
                                    <div className="file-path-wrapper">
                                        <input className="file-path validate" type="text"/>
                                    </div>
                                </div>
                            </div>
                            <div className="col s6">
                                <div className="col s12 m8 offset-m2 l6 offset-l3">
                                    <div className="card-panel grey lighten-5 z-depth-1">
                                    <div className="row valign-wrapper">
                                        <div className="col s12">
                                        <img src={'img/uploads/'+this.state.profile_image} alt="" className="circle responsive-img"/>
                                        </div>
                                    </div>
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
