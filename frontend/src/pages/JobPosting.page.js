import { useState } from 'react';
import '../css/JobPosting.css';
import { useParams } from "react-router-dom";

const JobPosting = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [fields, setFields] = useState([{ position: '', payment: '' }]); // Combined fields
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('');
    const [charCount, setCharCount] = useState(0);
    // const [error, setError] = useState('');

    // Add new Position and Payment Row
    const addField = () => {
        if (fields.length < 5) {
            setFields([...fields, { position: '', payment: '' }]);
        }
    };

    // Remove specific Row
    const removeField = (indexToRemove) => {
        if (fields.length > 1) {
            const updatedFields = fields.filter((_, index) => index !== indexToRemove);
            setFields(updatedFields);
        }
    };

    // Update the Position or Payment of a specific Row
    const handleFieldChange = (index, key, value) => {
        const updatedFields = [...fields];
        updatedFields[index][key] = value;
        setFields(updatedFields);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        alert('Gig Posted Successfully!');
        const employeeRoles=[...fields,]
        const employerId= id
        const gig= { title, employerId, employeeRoles , description, duration }
        try {
            const response = await fetch('/gig/post', {
              method: 'POST',
              body: JSON.stringify(gig),
              headers: {
                'Content-Type': 'application/json',
              },
            });
            const json = await response.json();
        
            if (!response.ok) throw new Error(json.error);
        
           
            console.log('User signed up:', json);
          } catch (err) {
            // setError(err.message);
          }
        //   setError(null);
          setTitle('');
          setFields([{ position: '', payment: '' }])
          setDescription('');
          setDuration('');
          setCharCount(0);
        };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
        setCharCount(e.target.value.length);
    };

    return (
        <div>
            <div className="job-posting-container">
                <h1>Post a Gig</h1>
                <form onSubmit={handleSubmit} className="job-posting-form">
                    {/* Gig Title */}
                    <label htmlFor="gig-title">Gig Title</label>
                    <input
                        type="text"
                        id="gig-title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter Gig Title"
                        maxLength={80}
                        required
                    />

                    {/* Positions and Payments */}
                    <label>Gig Positions & Payments</label>
                    {fields.map((field, index) => (
                        <div key={index} className="field-row">
                            <input
                                type="text"
                                value={field.position}
                                onChange={(e) => handleFieldChange(index, 'position', e.target.value)}
                                placeholder={`Position ${index + 1}`}
                                required
                                className="position-input"
                            />
                            <input
                                type="text"
                                value={field.payment}
                                onChange={(e) => handleFieldChange(index, 'payment', e.target.value)}
                                placeholder={`Payment ${index + 1}`}
                                required
                                className="payment-input"
                            />
                            {/* Remove Row Button */}
                            {fields.length > 1 && (
                                <button
                                    type="button"
                                    className="remove-btn"
                                    onClick={() => removeField(index)}
                                >
                                    ✖
                                </button>
                            )}
                        </div>
                    ))}

                    {/* Add Row Button */}
                    {fields.length < 5 && (
                        <button type="button" className="add-btn" onClick={addField}>
                            + Add Position & Payment
                        </button>
                    )}

                    {/* Gig Description */}
                    <label htmlFor="gig-description">Gig Description</label>
                    <textarea
                        id="gig-description"
                        value={description}
                        onChange={handleDescriptionChange}
                        placeholder="Describe the gig in detail"
                        maxLength={400}
                        rows="5"
                        required
                    ></textarea>
                    <span className="char-count">{charCount}/400</span>

                    {/* Duration Input */}
                    <label htmlFor="gig-duration">Duration</label>
                    <input
                        type="text"
                        id="gig-duration"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        placeholder="Enter duration (e.g., 6 months, 1 year)"
                        maxLength={50}
                        required
                    />

                    {/* Submit Button */}
                    <button type="submit" className="submit-btn">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default JobPosting;
