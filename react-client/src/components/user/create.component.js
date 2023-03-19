import React, { useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';

export default function CreateUser() {
  const navigate = useNavigate();

  const [validationError,setValidationError] = useState({})

  const createUser = async (e) => {
    e.preventDefault();
	const formData = new FormData()
	
	const data=await axios.get(`https://randomuser.me/api/`).then(({data})=>{
		formData.append('title', data['results'][0]['name']['title'])
		formData.append('first', data['results'][0]['name']['first'])
		formData.append('last', data['results'][0]['name']['last'])
		formData.append('gender', data['results'][0]['gender'])
		formData.append('street_number', data['results'][0]['location']['street']['number'])
		formData.append('street_name', data['results'][0]['location']['street']['name'])
		formData.append('city', data['results'][0]['location']['city'])
		formData.append('state', data['results'][0]['location']['state'])
		formData.append('country', data['results'][0]['location']['country'])
		formData.append('postcode', data['results'][0]['location']['postcode'])
		formData.append('email', data['results'][0]['email'])
		formData.append('phone', data['results'][0]['phone'])
		formData.append('picture', data['results'][0]['picture']['large'])
    })

    await axios.post(`http://localhost:8000/api/users`, formData).then(({data})=>{
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
                <Form onSubmit={createUser}>
                  
				  <Link className='btn btn-primary mb-2 float-end' size="lg" block="block" to={'/'}>
					Back
				  </Link>
				  
                  <Button variant="primary" className="mt-2" block="block" type="submit">
                    Get User from Public API
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