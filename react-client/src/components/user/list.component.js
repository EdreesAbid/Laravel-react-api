import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import Swal from 'sweetalert2';
import { CSVLink } from "react-csv";

export default function List() {

	const [users, setUsers] = useState([]);
	const [hasMore, setHasMore] = useState(true);
	const [page, setPage] = useState(1);
	var currentPage=0;
	var lastPage=0;
	
	useEffect(() => {
	  fetchUsers(page);
	}, [page]);
	
	const fetchUsers = async (page) => {
	  const newUsers = [];
	  await axios.get(`http://localhost:8000/api/users?page=`+page).then(({data})=>{
		currentPage=data.current_page;
		lastPage=data.last_page;
		setUsers([...users, ...data.data]);
	  })
	  
	};
	
	const onScroll = () => {
	  const scrollTop = document.documentElement.scrollTop;
	  const scrollHeight = document.documentElement.scrollHeight;
	  const clientHeight = document.documentElement.clientHeight;
	  if (scrollTop + clientHeight >= scrollHeight) {
		setPage(page + 1);
	  }
	};

	useEffect(() => {
	  window.addEventListener("scroll", onScroll);
	  return () => window.removeEventListener("scroll", onScroll);
	}, [users]);
		

    const deleteUser = async (id) => {
        const isConfirm = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            return result.isConfirmed
          });

          if(!isConfirm){
            return;
          }

          await axios.delete(`http://localhost:8000/api/users/${id}`).then(({data})=>{
            Swal.fire({
                icon:"success",
                text:data.message
            })
            fetchUsers()
          }).catch(({response:{data}})=>{
            Swal.fire({
                text:data.message,
                icon:"error"
            })
          })
    }
	
	
	const exportUsers =(users) => {
		
        const headers = [
			{label: "ID", key: "id" },
			{label: "Title", key: "title" },
			{label: "First Name", key: "first" },
			{label: "Last Name", key: "last" },
			{label: "Gender", key: "gender" },
			{label: "Street Number", key: "street_number" },
			{label: "City", key: "street_name" },
			{label: "State", key: "state" },
			{label: "Country", key: "country" },
			{label: "Post Code", key: "postcode" },
			{label: "Email", key: "email" },
			{label: "Phone", key: "phone" },
			{label: "Picture", key: "picture" }
		];
		const data = users.map(row => (row));
		
		const csvReport = {
		  data: data,
		  headers: headers,
		  filename: 'users.csv'
		};
		
		return csvReport;
    }
	
	const callback=()=> {alert('comming')}
    return (
      <div className="container">
          <div className="row">
            <div className='col-12'>
                <Link className='btn btn-primary mb-2 float-end' to={"/user/create"}>
                    Import User
                </Link>
				<CSVLink {...exportUsers(users)}>Export to CSV</CSVLink>
            </div>
            <div className="col-12">
                <div className="card card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered mb-0 text-center">
                            <thead>
                                <tr>
									<th>ID</th>
									<th>Name</th>
									<th>Gender</th>
									<th>Address</th>
									<th>Email</th>
									<th>Phone</th>
									<th>Picture</th>
									<th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.length > 0 && (
                                        users.map((row, key)=>(
                                            <tr key={key}>
												<td>{row.id}</td>
                                                <td>{row.title+' '+row.first+' '+row.last}</td>
                                                <td>{row.gender}</td>
												<td>{row.street_number} {row.street_name} {row.city}, {row.state} {row.postcode}, {row.country}</td>
												<td>{row.email}</td>
												<td>{row.phone}</td>
                                                <td>
                                                    <img width="50px" src={row.picture} />
                                                </td>
                                                <td>
                                                    <Link to={`/user/edit/${row.id}`} className='btn btn-success me-2'>
                                                        Edit
                                                    </Link>
                                                    <Button variant="danger" onClick={()=>deleteUser(row.id)}>
                                                        Delete
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
          </div>
      </div>
    )
}