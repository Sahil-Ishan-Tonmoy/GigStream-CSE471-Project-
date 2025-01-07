import { useParams, useNavigate } from "react-router-dom"
import React, { useEffect, useState } from 'react';;


const ApplicationDetails = () => {
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { role, id, title, applicationID} = useParams();

  useEffect(() => {
    
    const fetchApplicationDetails = async () => {
      try {
        const response = await fetch(`/application/${applicationID}`);
        if (response.ok) {
          const data = await response.json();
          setApplication(data);
        } else {
          console.error('Failed to fetch application');
        }
      } catch (error) {
        console.error('Error fetching application:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicationDetails();
  }, [applicationID]);

  // const fetch_position=async (applicationID) => {
  //   try {
  //     const response = await fetch(`http://localhost:4000/application/position/${id}/${title}/${applicationID}`, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });


  //     if (response.ok) {
  //       const json = await response.json(); 
  //       const position=json.position
  //       return position
        
  //     } else {
  //       console.error('Failed to update status');
  //     }
  //   } catch (error) {
  //     console.error('Error updating status:', error);
  //   }
  // };

  const updateStatus = async (newStatus, userId, applicationID) => {
    // const position=fetch_position(applicationID)
    try {
      const response = await fetch(`http://localhost:4000/application/status/${role}/${id}/${applicationID}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus, title, userId }),
      });

      if (response.ok) {
        setApplication((prev) => ({ ...prev, status: newStatus }));
        window.location.href=`/gig-posted/${role}/${id}/details/gig/${title}`
      } else {
        console.error('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!application) {
    return <p>No application details found</p>;
  }

  const downloadFile = () => {
    const link = document.createElement('a');
    link.href = `http://localhost:4000/${application.cvAttachment}`;
    link.download = application.cvAttachment.split('\\').pop(); // Extract the filename for download
    link.click();
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.heading}>Application Details</h2>

      <div style={styles.detailRow}>
        <p><strong>Employee User ID:</strong> {application.employee_userId}</p>
        <p><strong>Employee Name:</strong> {application.employee_name}</p>
        <p><strong>Employee Email:</strong> {application.employee_email}</p>
      </div>

      <div style={styles.detailRow}>
        <p><strong>Gig Title:</strong> {application.gig_title}</p>
      </div>

      <div style={styles.detailRow}>
        <p><strong>Role Applied:</strong> {application.roleApplied}</p>
      </div>

      <div style={styles.detailRow}>
        <p><strong>CV Attachment:</strong> 
          <button onClick={downloadFile}>Download CV</button>
        </p>
      </div>

      <div style={styles.detailRow}>
        <p><strong>Why Join:</strong> {application.whyJoin}</p>
      </div>

      <div style={styles.detailRow}>
        <p><strong>What Can Offer:</strong> {application.whatCanOffer}</p>
      </div>

      <div style={styles.detailRow}>
        <p><strong>Applied At:</strong> {new Date(application.appliedAt).toLocaleDateString()}</p>
      </div>

      <div style={styles.detailRow}>
        <p><strong>Status:</strong> {application.status}</p>
      </div>

      <div style={styles.buttonGroup}>
        <button style={styles.acceptButton} onClick={() => updateStatus('Accepted', application.employee_userId, applicationID)}>Accept</button>
        <button style={styles.rejectButton} onClick={() => updateStatus('Rejected',application.employee_userId, applicationID)}>Reject</button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    position: 'relative',
    border: '1px solid #ccc',
    padding: '20px',
    borderRadius: '10px',
    width: '50%',
    margin: 'auto',
    backgroundColor: '#f9f9f9',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  detailRow: {
    margin: '15px 0',
    fontSize: '1rem',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginTop: '20px',
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  rejectButton: {
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default ApplicationDetails;
