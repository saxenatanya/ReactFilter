import React, { Component } from "react";
import Card from "./Card";


export default class First extends Component {


    constructor(props) {
        super(props);
        // console.log(this.props.name);


        this.state = {
            users: [],
            filteredUsers:[]
        }
    }


    searchByName =(name) =>{
        let tempUsers = this.state.users.filter((user)=>{
            return user.name.toLowerCase().includes(name.toLowerCase());
        })
        this.setState({filteredUsers:tempUsers});
    }
    
searchByCity =(city) =>{
    let temCity = this.state.users.filter((user) =>{
        return user.address.city.toLowerCase().includes(city.toLowerCase());
    })
    this.setState({filteredUsers:temCity});
    // console.log(temCity);
}


    componentDidMount = () => {
        console.log("component mounted")

        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then((user) => {
// console.log(user[0].address.city);
                this.setState({ users: user });
               this.setState({filteredUsers:user})
            })
            .catch((error) => { console.log(error) })
        
    }


    
    render() {
        return (
            <div className="conatiner">
               
                <h1>{this.props.name}</h1>
                <div>
                    <input type="search" className="form-control mr-sm-2 ml-sm-2 " id="searchBox" placeholder="Search by Name" onChange={(event)=>{this.searchByName(event.target.value)}}/>
                    <br/>
                    <input type="search" className="form-control mr-sm-2 ml-sm-2 " id="searchBox" placeholder="Search by City" onChange={(event) => {this.searchByCity(event.target.value)}} />
                </div>
                        {
                            this.state.filteredUsers.map((usr, index) => {
                                return (
                                 <Card user={usr} key={index}/>
                                )
                            })

                        }
                   
            </div>
        );

    }

}