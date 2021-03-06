import React, { Component } from 'react';
import { Consumer } from '../../context'
import axios from 'axios';

class EditContact extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            email: '',
            phone: ''
        }

        this.form = React.createRef();
    }

    async componentDidMount() {
        const id = this.props.match.params.id
        const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
        const oneUser = res.data
        console.log(oneUser)
        this.setState({
            name: oneUser.name,
            email: oneUser.email,
            phone: oneUser.phone
        })
    }

    onChangeHandler = (e) => this.setState({
        [e.target.name]: e.target.value
    })

    onSubmitHandler = async (dispatch, e) => {
        e.preventDefault();
        const { name, email, phone } = this.state

        if (name && email && phone) {
            axios({
                method: 'post',
                url: 'https://jsonplaceholder.typicode.com/users',
                data: {
                    name,
                    email,
                    phone
                }
            }).then(res => {
                dispatch({
                    type: 'ADD_CONTACT',
                    payload: res.data
                })
            })
        }

        const updateContact = {
            name,
            email,
            phone
        }

        const { id } = this.props.match.params;
        const res = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, updateContact)

        dispatch({
            type: 'UPDATE_CONTACT',
            payload: res.data
        })

        this.setState({
            name: '',
            email: '',
            phone: ''
        })

        this.props.history.push('/')
    }

    render() {
        const { name, email, phone } = this.state;
        return (
            <Consumer>
                {value => {
                    const { dispatch } = value;
                    return (
                        <div className="card">
                            <div className="card-header">
                                Add Contact
                        </div>
                            <div className="card-body">
                                <form onSubmit={this.onSubmitHandler.bind(this, dispatch)} ref={this.form}>
                                    <div className="form-group">
                                        <label htmlFor="name">Name:</label>
                                        <input type="text" name="name" placeholder="Enter Name..." className="form-control" value={name} onChange={this.onChangeHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="name">Email:</label>
                                        <input type="email" name="email" placeholder="Enter Email..." className="form-control" value={email} onChange={this.onChangeHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="name">Phone:</label>
                                        <input type="text" name="phone" placeholder="Enter Phone..." className="form-control" value={phone} onChange={this.onChangeHandler} />
                                    </div>
                                    <input type="submit" className="btn btn-primary btn-block" value="Update Contact" />
                                </form>
                            </div>
                        </div>
                    )


                }}

            </Consumer>
        );
    }
}

export default EditContact;
