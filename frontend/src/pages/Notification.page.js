import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap

const NotificationPage = () => {
  const { role, id } = useParams();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Custom styles
  const styles = {
    container: {
      padding: "20px",
      maxWidth: "800px",
      margin: "0 auto",
    },
    card: {
      marginBottom: "15px",
    },
    deleteButton: {
      backgroundColor: "#dc3545",
      border: "none",
      color: "#fff",
    },
    cardText: {
      flex: 1,
    },
  };

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/notifications/${role}/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch notifications");
      }
      const data = await response.json();
      setNotifications(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete a notification
  const deleteNotification = async (notificationId) => {
    try {
      const response = await fetch(`/notifications/${id}/${notificationId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete notification");
      }
      setNotifications((prev) =>
        prev.filter((notification) => notification._id !== notificationId)
      );
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [role, id]);

  if (loading) return <div className="text-center mt-5">Loading notifications...</div>;
  if (error) return <div className="alert alert-danger mt-5">{error}</div>;

  return (
    <div style={styles.container}>
      <h1 className="text-center mb-4">Notifications</h1>
      {notifications.length === 0 ? (
        <div className="alert alert-info text-center">No notifications available.</div>
      ) : (
        <div>
          {notifications.map((notification) => (
            <div className="card" style={styles.card} key={notification._id}>
              <div className="card-body d-flex align-items-center">
                <p className="card-text" style={styles.cardText}>
                  {notification.notification}
                </p>
                <button
                  className="btn btn-sm"
                  style={styles.deleteButton}
                  onClick={() => deleteNotification(notification._id)}
                >
                  ✖
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationPage;
