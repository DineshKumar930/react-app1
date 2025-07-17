import React, { useState } from "react";

const StudentCURD = () => {
  const [empNo, setEmpNo] = useState("");
  const [empName, setEmpName] = useState("");
  const [empDep, setEmpDep] = useState("");
  const [empGmail, setEmpGmail] = useState("");
  const [empSalary, setEmpSalary] = useState("");
  const [empObj, setEmpObj] = useState([]);
  const [empObjUpdate, setEmpObjUpdate] = useState(null); // 👈 track index for update

  const handleEmp = () => {
    if (!(empNo && empName && empDep && empGmail && empSalary).trim()) return;

    const emp = {
      empNo,
      empName,
      empDep,
      empGmail,
      empSalary,
    };

    if (empObjUpdate !== null) {
      // 🔁 Update mode
      const empupdateList = [...empObj];
      empupdateList[empObjUpdate] = emp;
      setEmpObj(empupdateList); // ✅ save updated list
      setEmpObjUpdate(null); // ✅ reset update mode
    } else {
      // ➕ Add mode
      setEmpObj([...empObj, emp]);
    }

    // Clear input fields
    setEmpNo("");
    setEmpName("");
    setEmpDep("");
    setEmpGmail("");
    setEmpSalary("");
  };

  const deleteObj = (deleteIndex) => {
    const upd = empObj.filter((_, i) => i !== deleteIndex);
    setEmpObj(upd);

    // Reset fields if deleted while editing
    if (empObjUpdate === deleteIndex) {
      setEmpObjUpdate(null);
      setEmpNo("");
      setEmpName("");
      setEmpDep("");
      setEmpGmail("");
      setEmpSalary("");
    }
  };

  const updateObj = (updateIndex) => {
    const current = empObj[updateIndex];
    setEmpNo(current.empNo);
    setEmpName(current.empName);
    setEmpDep(current.empDep);
    setEmpGmail(current.empGmail);
    setEmpSalary(current.empSalary);
    setEmpObjUpdate(updateIndex); // ✅ mark which index to update
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Employee CRUD</h2>

      <input
        type="text"
        value={empNo}
        onChange={(e) => setEmpNo(e.target.value)}
        placeholder="Enter Emp no"
      />
      <br />
      <input
        type="text"
        value={empName}
        onChange={(e) => setEmpName(e.target.value)}
        placeholder="Enter Emp Full Name"
      />
      <br />
      <input
        type="text"
        value={empDep}
        onChange={(e) => setEmpDep(e.target.value)}
        placeholder="Enter Emp Department"
      />
      <br />
      <input
        type="text"
        value={empGmail}
        onChange={(e) => setEmpGmail(e.target.value)}
        placeholder="Enter Emp Gmail"
      />
      <br />
      <input
        type="text"
        value={empSalary}
        onChange={(e) => setEmpSalary(e.target.value)}
        placeholder="Enter Emp Salary"
      />
      <br />
      <br />
      <button onClick={handleEmp}>
        {empObjUpdate !== null ? "Update Employee Record" : "Add Employee Record"}
      </button>
      <br />
      <br />

      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>Sr No</th>
            <th>Emp No</th>
            <th>Full Name</th>
            <th>Department</th>
            <th>Gmail</th>
            <th>Salary</th>
            <th colSpan={2}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {empObj.length === 0 ? (
            <tr>
              <td colSpan={8}>No record created yet!</td>
            </tr>
          ) : (
            empObj.map((e, i) => (
              <tr>
                <td>{i + 1}</td>
                <td>{e.empNo}</td>
                <td>{e.empName}</td>
                <td>{e.empDep}</td>
                <td>{e.empGmail}</td>
                <td>{e.empSalary}</td>
                <td>
                  <button onClick={() => deleteObj(i)}>Delete</button>
                </td>
                <td>
                  <button onClick={() => updateObj(i)}>Update</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentCURD;
