import React, { useState } from "react";

const Employee = () => {
  const [ename, setEname] = useState("");
  const [edname, setEDname] = useState("");
  const [salary, setSalary] = useState("");
  const [empObj, setEmpObj] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const handleCreate = () => {
    const emp = {
      ename,
      edname,
      salary,
    };
    if (!(ename && edname && salary).trim()) return;

    if (editIndex === null) {
      setEmpObj([...empObj, emp]);
    } else {
      //update logic
      const upd = [...empObj];
      upd[editIndex] = emp;
      setEmpObj(upd);
      setEditIndex(null);



      
    }
    clearForm();
  };
  const clearForm = () => {
    setEname("");
    setEDname("");
    setSalary("");
  };

  //update function
  const handleEdit = (index) => {
    const current = empObj[index];
    setEname(current.ename);
    setEDname(current.edname);
    setSalary(current.salary);
    setEditIndex(index);
  };
  //delete function

  const handleDelete = (index) => {
    const del=empObj.filter((e,i)=>i!==index);
    setEmpObj(del);
    clearForm();
  };
  
  return (
    <div>
      <h2>Employee Recard</h2>
      <hr />
      <br />
      <input
        type="text"
        value={ename}
        onChange={(e) => setEname(e.target.value)}
        placeholder="Name"
      />
      <br />
      <br />
      <input
        type="text"
        value={edname}
        onChange={(e) => setEDname(e.target.value)}
        placeholder="Department name"
      />
      <br />
      <br />
      <input
        type="text"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
        placeholder="Salary"
      />
      <br />
      <br />
      <button onClick={handleCreate}>
        {editIndex !== null ? "Update" : "Create"}
      </button>
      <br /> <br />
      <table border={1} cellSpacing={0} cellPadding={10}>
        <thead>
          <tr>
            <th>Sr Number</th>
            <th>Employee Name</th>
            <th>Employee Deparatment</th>
            <th>Employee Salary</th>
            <th colSpan={2}>Action</th>
          </tr>
        </thead>
        <tbody>
          {empObj.length === 0 ? (
            <tr>
              <td colSpan={5}>No recard are created yet...</td>
            </tr>
          ) : (
            empObj.map((e, i) => {
              return (
                <tr>
                  <td>{i + 1}</td>
                  <td>{e.ename}</td>
                  <td>{e.edname}</td>
                  <td>{e.salary}</td>
                  <td>
                    <button onClick={() => handleEdit(i)}>Edit</button>
                  </td>
                  <td>
                    <button onClick={()=>handleDelete(i)}>Delete</button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Employee;
