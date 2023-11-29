import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PatientTable(){
const [patients, setPatients] = useState([]);
const [newPatient, setNewPatient] = useState({ id: '', displayId: '', name: '', age: '', sex: '', email: '', phone: '' });
const [editingPatient, setEditingPatient] = useState(null);
const [error, setError] = useState('');

useEffect(() => {
fetchData();
}, []);

const fetchData = async () => {
try {
    const response = await axios.get('http://localhost:3001/api/patients');
    setPatients(response.data);
} catch (error) {
    console.error('Error fetching data:', error);
}
};

const addPatient = async () => {

if (!newPatient.name || !newPatient.age) {
    setError('Name and age are required to add a patient.');
    return;
}

try {
    const response = await axios.post('http://localhost:3001/api/patients', newPatient);
    setPatients([...patients, response.data]);
    setNewPatient({ name: '', age: '', sex: '', email: '', phone: ''});
    setError('');
} catch (error) {
    console.error('Error adding patient:', error);
}
};

const removePatient = async (id) => {
try {
    await axios.delete(`http://localhost:3001/api/patients/${id}`);
    setPatients(patients.filter(patient => patient.id !== id));
} catch (error) {
    console.error('Error removing patient:', error);
}
};

const editPatient = async () => {
try {
    await axios.put(`http://localhost:3001/api/patients/${editingPatient.id}`, newPatient);
    setPatients(patients.map(patient => (patient.id === editingPatient.id ? { ...patient, ...newPatient } : patient)));
    setNewPatient({ name: '', age: '', sex: '', email: '', phone: ''});
    setEditingPatient(null);
} catch (error) {
    console.error('Error editing patient:', error);
}
};

const startEditing = (patient) => {
    setEditingPatient(patient);
    setNewPatient(patient);
};

const cancelEditing = () => {
    setNewPatient({ name: '', age: '', sex: '', email: '', phone: ''});
    setEditingPatient(null);
};

return (
<div>
<center><h1>Patient Data</h1></center>
<table className="styled-table"> 
<thead>
<tr>
    <th>ID</th>
    <th>Name</th>
    <th>Age</th>
    <th>Sex</th>
    <th>Email</th>
    <th>Phone Number</th>
    <th>Action</th>
</tr>
</thead>
<tbody>
{patients.map(patient => (
    <tr key={patient.id}>
    <td>{patient.displayId}</td>
    <td>
        {editingPatient === patient ? (
            <input
            type="text"
            value={newPatient.name}
            onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
            />
        ) : patient.name}
    </td>
    <td>
        {editingPatient === patient ? (
            <input
            type="text"
            value={newPatient.age}
            onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
            />
        ) : patient.age}
    </td>
    <td>
        {editingPatient === patient ? (
            <select value={newPatient.sex} onChange={(e) => setNewPatient({ ...newPatient, sex: e.target.value })} >
                <option value="">Select Sex</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Unspecified">Prefer not to disclose</option>
            </select>
        ) : patient.sex}
    </td>
    <td>
        {editingPatient === patient ? (
            <input
            type="text"
            value={newPatient.email}
            onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })}
            />
        ) : patient.email}
    </td>
    <td>
        {editingPatient === patient ? (
            <input
            type="text"
            value={newPatient.phone}
            onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })}
            />
        ) : patient.phone}
    </td>
    <td>
        {editingPatient === patient ? (
        <div className="container">
            <button onClick={editPatient}>Save</button>&nbsp;
            <button onClick={cancelEditing}>Cancel</button>
        </div>
        ) : (
        <div className="container">
            <button onClick={() => startEditing(patient)}>Edit</button>&nbsp;
            <button onClick={() => removePatient(patient.id)}>Remove</button>
        </div>
        )}
    </td>
    </tr>
))}
</tbody>
</table>

<center>
{error && <div style={{ color: 'red' }}>{error}</div>}
</center>

{!editingPatient && (
<div>
<table className="styled-table">
    <tbody>
        <tr>
            <td>
                <input
                    type="text"
                    placeholder="Name"
                    value={newPatient.name}
                    onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })} required
                />
            </td>
            <td>
                <input
                    type="text"
                    placeholder="Age"
                    value={newPatient.age}
                    onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
                />
            </td>
            <td>
                <select value={newPatient.sex} onChange={(e) => setNewPatient({ ...newPatient, sex: e.target.value })} >
                    <option value="">Select Sex</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Unspecified">Prefer not to disclose</option>
                </select>
            </td>
            <td>
                <input
                    type="text"
                    placeholder="Email Address"
                    value={newPatient.email}
                    onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })}
                />
            </td>
            <td>
                <input
                    type="text"
                    placeholder="Phone Number"
                    value={newPatient.phone}
                    onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })}
                />
            </td>
            <td>
                <button onClick={addPatient}>Add Patient</button>
            </td>
        </tr>
    </tbody>
</table>
</div> 
)}
</div>
);
}
export default PatientTable;