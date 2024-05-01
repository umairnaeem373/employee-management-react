import React , {useContext,useEffect} from 'react';
import { Routes, Route , useNavigate } from 'react-router-dom'
// import { employeesData } from '../../data'; 
import Header from './Header';
import Swal from 'sweetalert2';
import { AppContext } from '../../data/store/createContext';
import Edit from './Edit';
const Table = () => {

  const navigate=useNavigate()
  const {state , fetchData , del}=useContext(AppContext)

  useEffect(()=>{
    fetchData()
  },[])

  console.log(state.data);

  const handleDelete = (id) => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.value) {
        console.log(result, 'result');
        del(id)
        //delte api call
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: `'s data has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div className="contain-table">
      <Header />
      {/* <Edit/> */}
      {/* <Routes>
        <Route path='/Edit' element={<Edit/>}/>
      </Routes> */}
      <table className="striped-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Salary</th>
            <th>Date</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {state.data.length > 0 ? (
            state.data.map((employee, i) => (
              <tr key={employee.id}>
                <td>{i + 1}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.email}</td>
                <td>{employee.salary}</td>
                <td>{employee.date} </td>
                <td className="text-right">
                  <button onClick={() => {navigate(`/Edit/${employee.id}`)}} className="button muted-button">
                    Edit
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => {
                      handleDelete(employee.id);
                    }}
                    className="button muted-button">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>Loading data...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
