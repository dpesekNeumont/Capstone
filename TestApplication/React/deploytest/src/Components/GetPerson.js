import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class getperson extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            searchString: 'http://localhost:8080/person',
            people: []
       }
   }

   handleClick = () => {
       fetch(this.state.searchString)
       .then(response => response.json())
       .then(data => this.setState({people: data}, () => {console.log(data)}))
   }
    
    render() {
        return (
           <React.Fragment>
               <div className="container">
                   <h3>Get All People</h3>
                   <input type="submit" onClick={this.handleClick}/>

                   <div className="searchResults">
                        <h3>Search Results:</h3>
                        {
                            this.state.people.map(function(p, index) {
                                return (
                                    <Link to={"/person/" + p.id} className="nav-link-item" key={index}>
                                        <div className="personQuickInfoDisplay">
                                            <p>First Name: {p.firstName}</p>
                                            <p>Last Name: {p.lastName}</p>
                                        </div>
                                    </Link>
                                )
                            })
                        }
                    </div>
               </div>
           </React.Fragment>
        )
    }
}
