import React, { Component } from 'react';
import { render } from 'react-dom';

class App extends Component {

    constructor() {
        super();
        this.state = {profile_image: 'dk_wize_owl_product_icon.png', isSaved: false};
        
        this.addUser = this.addUser.bind(this);
        this.handleChange = this.handleChange.bind(this);

        window.addEventListener('beforeunload', (event) => {
            // // Cancel the event as stated by the standard.
            event.preventDefault();
            // // Chrome requires returnValue to be set.
            event.returnValue = '';
            const formData = new FormData();
            const actual = this.state.profile_image;
            if (actual != "dk_wize_owl_product_icon.png" && this.state.isSaved == false) {
                formData.append('deleteImage', actual);
            }
            fetch('/upload/delete', {
                method: 'POST',
                body: formData
            });
        });
    }

    addUser(e) {
        e.preventDefault();
        const form = document.getElementById("formulario");
        const formData = new FormData(form);
        const actual = this.state.profile_image;
        if (actual != "dk_wize_owl_product_icon.png") {
            formData.append('profile_image', actual);
        }
        var fData = '';
        for(var pair of formData.entries()) {
            if (pair[1]) {
                fData += pair[0]+ ': "'+ pair[1] + '" '; 
            }
            
        }
        console.log(fData);
        
        const url = '/graphql';
        const data = { 
            query: `mutation{ createUser(data: { ${fData} }){ id } }` 
        };

        fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(({data, errors}) => {
                if (errors) {
                    console.log(errors[0].message);
                    console.log(errors[0])
                    M.toast({html: 'Cooreo ya registrado', classes: 'rounded'});
                } else {
                    console.log(data);
                    M.toast({html: 'Registro exitoso', classes: 'rounded'});
                    this.setState({ isSaved :  true})
                }
            });
    }
    
    handleChange() {
        const formData = new FormData();
        const image = document.querySelector("input[type='file']");
        const actual = this.state.profile_image;
        if (actual != "dk_wize_owl_product_icon.png" && this.state.isSaved == false) {
            formData.append('deleteImage', actual);
        }
        formData.append('profile_image', image.files[0]);
        fetch('/upload', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                const { profile_image } = response;
                this.setState({ profile_image });
                this.setState({ isSaved :  false})
            });
    }

    render() {
        return (
                <div className="row">
                    {/* <form className="col s12" action="/upload" method="POST" id="usuario" encType="multipart/form-data"> */}
                    <form className="col s12" onSubmit={this.addUser} id="formulario">
                        <div className="row">
                            <div className="input-field col s6">
                                <input id="firstName" name="firstName" type="text" className="validate" required/>
                                <label htmlFor="firstName">First Name</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="'lastName'" name="lastName" type="text" className="validate" />
                                <label htmlFor="lastName">Last Name</label>
                            </div>
                        </div>

                        <div className="row">
                                <div className="input-field col s12">
                                    <input id="email" name="email" type="email" className="validate" required/>
                                    <label htmlFor="email">Email</label>
                            </div>
                        </div>
                        
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="password" name="password" type="password" className="validate" required/>
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                        
                        <div className="row">
                            <div className="col s6">
                                <div className="file-field input-field">
                                    <div className="btn">
                                        <span>File</span>
                                        <input type="file" onChange={this.handleChange} accept="image/png, image/jpg"/>
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
