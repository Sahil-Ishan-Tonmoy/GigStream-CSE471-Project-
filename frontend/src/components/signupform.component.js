import { useState } from 'react';
import '../css/SignupForm.css';

const UserForm = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [mail, setMail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('Employee'); // Default role is 'Employee'
  const [gender, setGender] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const User = {
      userId,
      password,
      firstName,
      lastName,
      birthDate,
      mail,
      phone,
      gender,
      role, // Correct field name
    };
    
  
    // Add role-specific data
    // if (role === 'Employee') {
    //   Object.assign(User, {  });
    // } else if (role === 'Employer') {
    //   Object.assign(User, {  });
    // }
  
    try {
      const response = await fetch('/signup', {
        method: 'POST',
        body: JSON.stringify(User),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = await response.json();
  
      if (!response.ok) throw new Error(json.error);
  
      setError(null);
      setUserId('');
      setPassword('');
      setFirstName('');
      setLastName('');
      setBirthDate('');
      setMail('');
      setPhone('');
      setGender('');
      
      
      console.log('User signed up:', json);
    } catch (err) {
      setError(err.message);
    }
  };
  

  // const renderSpecialFields = () => {
  //   if (role === 'Employee') {
  //     return (
  //       <div className="special-fields">
          
  //         <label>Age:</label>
  //         <input
  //           type="number"
  //           onChange={(e) => setAge(e.target.value)}
  //           value={age}
  //           placeholder="e.g., 30"
  //         />

  //         <label>Height (in cm):</label>
  //         <input
  //           type="number"
  //           onChange={(e) => setHeight(e.target.value)}
  //           value={height}
  //           placeholder="e.g., 170"
  //         />

  //         <label>Weight (in kg):</label>
  //         <input
  //           type="number"
  //           onChange={(e) => setWeight(e.target.value)}
  //           value={weight}
  //           placeholder="e.g., 70"
  //         />

  //         <label>Address:</label>
  //         <input
  //           type="text"
  //           onChange={(e) => setAddress(e.target.value)}
  //           value={address}
  //           placeholder="e.g., 123 Street, City"
  //         />
  //       </div>
  //     );
  //   } else if (role === 'Employer') {
  //     return (
  //       <div className="special-fields">
  //         <label>Speciality:</label>
  //         <input
  //           type="text"
  //           onChange={(e) => setSpeciality(e.target.value)}
  //           value={speciality}
  //           placeholder="e.g., Cardiology"
  //         />

  //         <label>Affiliation:</label>
  //         <input
  //           type="text"
  //           onChange={(e) => setAffiliation(e.target.value)}
  //           value={affiliation}
  //           placeholder="e.g., ABC Hospital"
  //         />
  //       </div>
  //     );
  //   }
  //   return null; // No extra fields for staff
  // };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>

      <label>User ID:</label>
      <input
        type="text"
        onChange={(e) => setUserId(e.target.value)}
        value={userId}
      />

      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <label>First Name:</label>
      <input
        type="text"
        onChange={(e) => setFirstName(e.target.value)}
        value={firstName}
      />

      <label>Last Name:</label>
      <input
        type="text"
        onChange={(e) => setLastName(e.target.value)}
        value={lastName}
      />

      <label>Date of Birth:</label>
      <input
        type="date"
        onChange={(e) => setBirthDate(e.target.value)}
        value={birthDate}
      />

      <label>Email:</label>
      <input
        type="text"
        onChange={(e) => setMail(e.target.value)}
        value={mail}
      />

      <label>Phone Number:</label>
      <input
        type="tel"
        onChange={(e) => setPhone(e.target.value)}
        value={phone}
      />
      <label>Gender:</label>
          <input
            type="text"
            onChange={(e) => setGender(e.target.value)}
            value={gender}
            placeholder="e.g., Male/Female"
          />


      <div className="role-buttons">
        <button
          type="button"
          className={role === 'Employee' ? 'active' : ''}
          onClick={() => setRole('Employee')}
        >
          Employee
        </button>
        <button
          type="button"
          className={role === 'Employer' ? 'active' : ''}
          onClick={() => setRole('Employer')}
        >
          Employer
        </button>
        
      </div>

      {/* {renderSpecialFields()} */}

      <button type="submit" className="submit-button">
        Sign Up
      </button>

      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default UserForm;
