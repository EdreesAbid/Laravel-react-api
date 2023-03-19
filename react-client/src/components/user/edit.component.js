import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';

export default function EditUser() {
  const navigate = useNavigate();

  const { id } = useParams()

  const [title, setTitle] = useState("")
  const [first, setFirst] = useState("")
  const [last, setLast] = useState("")
  const [gender, setGender] = useState("")
  const [street_number, setStreet_number] = useState("")
  const [street_name, setStreet_name] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [country, setCountry] = useState("")
  const [postcode, setPostcode] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [validationError,setValidationError] = useState({})

  useEffect(()=>{
    fetchUser()
  },[])

  const fetchUser = async () => {
    await axios.get(`http://localhost:8000/api/users/${id}`).then(({data})=>{
      const { title, first, last, gender, street_number, street_name, city, state, country, postcode, email, phone, picture } = data.user
      setTitle(title)
	  setFirst(first)
	  setLast(last)
	  setGender(gender)
	  setStreet_number(street_number)
	  setStreet_name(street_name)
	  setCity(city)
	  setState(state) 
	  setCountry(country) 
	  setPostcode(postcode) 
	  setEmail(email)
	  setPhone(phone)
    }).catch(({response:{data}})=>{
      Swal.fire({
        text:data.message,
        icon:"error"
      })
    })
  }

  const updateUser = async (e) => {
    e.preventDefault();

    const formData = new FormData()
    formData.append('_method', 'PATCH');
    formData.append('title', title);
	formData.append('first', first); 
	formData.append('last', last);
	formData.append('gender', gender);
	formData.append('street_number', street_number);
	formData.append('street_name', street_name);
	formData.append('city', city);
	formData.append('state', state);
	formData.append('country', country);
	formData.append('postcode', postcode);
	formData.append('email', email);
	formData.append('phone', phone);

    await axios.post(`http://localhost:8000/api/users/${id}`, formData).then(({data})=>{
      Swal.fire({
        icon:"success",
        text:data.message
      })
      navigate("/")
    }).catch(({response})=>{
      if(response.status===422){
        setValidationError(response.data.errors)
      }else{
        Swal.fire({
          text:response.data.message,
          icon:"error"
        })
      }
    })
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Update User</h4>
              <hr />
              <div className="form-wrapper">
                {
                  Object.keys(validationError).length > 0 && (
                    <div className="row">
                      <div className="col-12">
                        <div className="alert alert-danger">
                          <ul className="mb-0">
                            {
                              Object.entries(validationError).map(([key, value])=>(
                                <li key={key}>{value}</li>   
                              ))
                            }
                          </ul>
                        </div>
                      </div>
                    </div>
                  )
                }
                <Form onSubmit={updateUser}>
                  <Row> 
                      <Col>
                        <Form.Group controlId="Title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" value={title} onChange={(event)=>{
                              setTitle(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>  
                  </Row>
                  <Row className="my-3">
                      <Col>
                        <Form.Group controlId="First Name">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" value={first} onChange={(event)=>{
                              setFirst(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>
                  </Row>
                  <Row className="my-3">
                      <Col>
                        <Form.Group controlId="Last Name">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" value={last} onChange={(event)=>{
                              setLast(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>
                  </Row>
				  <Row className="my-3">
                      <Col>
						<Form.Group controlId="Gender">
							<Form.Label>Gender</Form.Label>
							<Form.Check value="male" type="radio" label="Male" onChange={(event)=>{
                              setGender(event.target.value)}}
							  checked={gender === "male"} />
							<Form.Check value="female" type="radio" label="Female" onChange={(event)=>{
                              setGender(event.target.value)}}
							  checked={gender === "female"} />
						</Form.Group>
                      </Col>
                  </Row>
				  <Row className="my-3">
                      <Col>
                        <Form.Group controlId="Street Number">
                            <Form.Label>Street Number</Form.Label>
                            <Form.Control type="number" value={street_number} onChange={(event)=>{
                              setStreet_number(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>
                  </Row>
				  <Row className="my-3">
                      <Col>
                        <Form.Group controlId="Street Name">
                            <Form.Label>Street Name</Form.Label>
                            <Form.Control type="text" value={street_name} onChange={(event)=>{
                              setStreet_name(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>
                  </Row>
				  <Row className="my-3">
                      <Col>
                        <Form.Group controlId="City">
                            <Form.Label>City</Form.Label>
                            <Form.Control type="text" value={city} onChange={(event)=>{
                              setCity(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>
                  </Row>
				  <Row className="my-3">
                      <Col>
                        <Form.Group controlId="State">
                            <Form.Label>State</Form.Label>
                            <Form.Control type="text" value={state} onChange={(event)=>{
                              setState(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>
                  </Row>
				  <Row className="my-3">
                      <Col>
                        <Form.Group controlId="Country">
                            <Form.Label>Country</Form.Label>
                            <Form.Control type="text" value={country} onChange={(event)=>{
                              setCountry(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>
                  </Row>
				  <Row className="my-3">
                      <Col>
                        <Form.Group controlId="Post Code">
                            <Form.Label>Post Code</Form.Label>
                            <Form.Control type="text" value={postcode} onChange={(event)=>{
                              setPostcode(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>
                  </Row>
				  <Row className="my-3">
                      <Col>
                        <Form.Group controlId="Email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={email} onChange={(event)=>{
                              setEmail(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>
                  </Row>
				  <Row className="my-3">
                      <Col>
                        <Form.Group controlId="Phone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="test" value={phone} onChange={(event)=>{
                              setPhone(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>
                  </Row>
                  <Button variant="primary" className="mt-2" size="lg" block="block" type="submit">
                    Update
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}