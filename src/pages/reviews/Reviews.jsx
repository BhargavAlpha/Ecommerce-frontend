import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/navbar/Navbar';
import styles from '../submissions/Submissions.module.css';

function Reviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/requests');
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []); // Empty dependency array to trigger fetch only once on component mount

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <table className={styles.submissionsTable}>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Product ID</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {reviews &&
              reviews.map((review) => (
                <tr key={review._id}>
                  <td>{review.productName}</td>
                  <td>{review.productId}</td>
                  {/* Add the date field from the review object */}
                  <td>{review.status}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Reviews;
