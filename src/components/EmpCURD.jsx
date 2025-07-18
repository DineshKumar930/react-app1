import React, { useState } from "react";

const EmpCURD = () => {
  const [EmpFullName, setEmpFullName] = useState("");
  const [empGmail, setEmpGmail] = useState("");
  const [empMob, setEmpMob] = useState("");
  const [empSalary, setEmpSalary] = useState("");
  const [empPAN, setEmpPAN] = useState("");

  const [empObj, setEmpObj] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleEmloyee = () => {
    const name = EmpFullName.trim();
    const gmail = empGmail.trim();
    const mob = empMob.trim();
    const salary = empSalary.trim();
    const pan = empPAN.trim();

    if (!(name && gmail && mob && salary && pan)) {
      alert("All fields are required.");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailRegex.test(gmail)) {
      alert("Please enter a valid email address.");
      return;
    }

    const mobRegex = /^[6-9]\d{9}$/;
    if (!mobRegex.test(mob)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (isNaN(salary)) {
      alert("Salary must be a valid positive number.");
      return;
    }

    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i;
    if (!panRegex.test(pan)) {
      alert("Please enter a valid PAN number");
      return;
    }

    const sal = Number(empSalary);
    let designation =
      sal <= 30000
        ? "Analytics"
        : sal >= 30000 && sal < 50000
        ? "Tester"
        : "Full Stack Developer";

    const totalObject = {
      EmpFullName,
      empGmail,
      empMob,
      empSalary,
      empPAN,
      designation,
    };
    if (editIndex === null) {
      setEmpObj([...empObj, totalObject]);
    } else {
      const empUpdatedList = [...empObj];
      empUpdatedList[editIndex] = totalObject;
      setEmpObj(empUpdatedList);
      setEditIndex(null);
    }
    clearForm();
  };

  const updateEmployee = (editIndex) => {
    const current = empObj[editIndex];

    setEmpFullName(current.EmpFullName);
    setEmpGmail(current.empGmail);
    setEmpMob(current.empMob);
    setEmpSalary(current.empSalary);
    setEmpPAN(current.empPAN);
    setEditIndex(editIndex);
  };

  const deleteEmployee = (index) => {
    const deleteObj = empObj.filter((e, i) => i !== index);
    setEmpObj(deleteObj);
    if (index == editIndex) {
      setEditIndex(null);
    }
  };

  
  const clearForm = () => {
    setEmpFullName("");
    setEmpGmail("");
    setEmpMob("");
    setEmpSalary("");
    setEmpPAN("");
  };
  return (
    <div>
      <div className="employee-form-wrapper">
        <div className="employee-form">
          <h2>Employee Details CRUD Operation</h2>
          <hr />
          <br />

          <label>Enter Full Name:</label>
          <input
            type="text"
            value={EmpFullName}
            onChange={(e) => setEmpFullName(e.target.value)}
          />

          <label>Enter Employee Gmail:</label>
          <input
            type="text"
            value={empGmail}
            onChange={(e) => setEmpGmail(e.target.value)}
          />

          <label>Enter Employee Mobile:</label>
          <input
            type="text"
            value={empMob}
            onChange={(e) => setEmpMob(e.target.value)}
          />

          <label>Enter Employee Salary:</label>
          <input
            type="text"
            value={empSalary}
            onChange={(e) => setEmpSalary(e.target.value)}
          />

          <label>Enter Employee PAN:</label>
          <input
            type="text"
            value={empPAN}
            onChange={(e) => setEmpPAN(e.target.value)}
          />

          <br />

          <button onClick={handleEmloyee}>
            {editIndex !== null ? "Update" : "Create"}
          </button>
        </div>
      </div>
      <br />
      <br />
      <br />
      <h3>Low Salary </h3>
      {empObj.filter((emp) => Number(emp.empSalary) < 30000).length > 0 ? (
        <table border={1} cellSpacing={0} cellPadding={5}>
          <thead>
            <tr>
              <th>Sr NO.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Salary</th>
              <th>PAN</th>
              <th>Designation</th>
              <th colSpan={2}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {empObj
              .filter((emp) => Number(emp.empSalary) < 30000)
              .map((e, i) => (
                <tr>
                  <td>{i + 1}</td>
                  <td>{e.EmpFullName}</td>
                  <td>{e.empGmail}</td>
                  <td>{e.empMob}</td>
                  <td>{e.empSalary}</td>
                  <td>{e.empPAN}</td>
                  <td>{e.designation}</td>
                  <td>
                    <button onClick={() => updateEmployee(i)} style={{backgroundColor:"green"}}>Edit</button>
                  </td>
                  <td>
                    <button onClick={() => deleteEmployee(i)}>Delete</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <p>No low salary data.</p>
      )}

      <br />
      <br />
      <h3>Medium Salary </h3>
      {empObj.filter(
        (emp) => Number(emp.empSalary) >= 30000 && Number(emp.empSalary) < 50000
      ).length > 0 ? (
        <table border={1} cellSpacing={0} cellPadding={5}>
          <thead>
            <tr>
              <th>Sr NO.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Salary</th>
              <th>PAN</th>
              <th>designation</th>
              <th colSpan={2}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {empObj
              .filter(
                (emp) =>
                  Number(emp.empSalary) >= 30000 &&
                  Number(emp.empSalary) < 50000
              )
              .map((e, i) => (
                <tr>
                  <td>{i + 1}</td>
                  <td>{e.EmpFullName}</td>
                  <td>{e.empGmail}</td>
                  <td>{e.empMob}</td>
                  <td>{e.empSalary}</td>
                  <td>{e.empPAN}</td>
                  <td>{e.designation}</td>
                  <td>
                    <button onClick={() => updateEmployee(i)} style={{backgroundColor:"green"}}>Edit</button>
                  </td>
                  <td>
                    <button onClick={() => deleteEmployee(i)}>Delete</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <p>No medium salary data.</p>
      )}
      <br />
      <br />
      <h3>High Salary</h3>
      {empObj.filter((emp) => Number(emp.empSalary) >= 50000).length > 0 ? (
        <table border={1} cellSpacing={0} cellPadding={5}>
          <thead>
            <tr>
              <th>Sr NO.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Salary</th>
              <th>PAN</th>
              <th>designation</th>
              <th colSpan={2}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {empObj
              .filter((emp) => Number(emp.empSalary) >= 50000)
              .map((e, i) => (
                <tr>
                  <td>{i + 1}</td>
                  <td>{e.EmpFullName}</td>
                  <td>{e.empGmail}</td>
                  <td>{e.empMob}</td>
                  <td>{e.empSalary}</td>
                  <td>{e.empPAN}</td>
                  <td>{e.designation}</td>
                  <td>
                    <button onClick={() => updateEmployee(i)} style={{backgroundColor:"green"}}>Edit</button>
                  </td>
                  <td>
                    <button onClick={() => deleteEmployee(i)}>Delete</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <p>No high salary data.</p>
      )}
    </div>
  );
};

export default EmpCURD;
