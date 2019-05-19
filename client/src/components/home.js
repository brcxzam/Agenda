import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Home extends Component {
	render() {
		return (
			<div>
				<nav className="blue-grey">
					<div className="nav-wrapper container ">
						<Link to="/" className="brand-logo ">
							Agenda
						</Link>
						<ul className="right hide-on-med-and-down">
							<li>
								<Link to="/acceder">
									<button className="waves-effect waves-light btn  blue-grey darken-4">
										Acceder
									</button>
								</Link>
							</li>
							<li>
								<Link to="/registrar">Registrar</Link>
							</li>
						</ul>
					</div>
				</nav>
			</div>
		)
	}
}

export default Home
