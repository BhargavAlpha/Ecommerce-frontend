import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './ProductDetail.module.css';
import Navbar from '../../components/navbar/Navbar';

const ProductAdminDetail = () => {
  const { id } = useParams();
  const [originalProduct, setOriginalProduct] = useState(null);
  const [submissionData, setSubmissionData] = useState(null);

  useEffect(() => {
    const fetchOriginalProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/product/${id}`);
        setOriginalProduct(response.data);
      } catch (error) {
        console.error('Error fetching original product:', error);
      }
    };

    const fetchSubmissionData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/submissions/`,{email:originalProduct.email,productId:id});
        setSubmissionData(response.data);
      } catch (error) {
        console.error('Error fetching submission data:', error);
      }
    };

    fetchOriginalProduct();
    fetchSubmissionData();
  }, [id]);

  const renderInputField = (label, fieldName) => {
    const originalValue = originalProduct ? originalProduct[fieldName] : '';
    const submittedValue = submissionData ? submissionData[fieldName] : '';

    const isChanged = originalValue !== submittedValue;
    const highlightColor = isChanged ? '#ffcccb' : 'transparent';

    return (
      <div style={{ marginBottom: '15px' }}>
        <p className={styles.labels}>{label}</p>
        <input
          className={styles.input}
          type="text"
          name={fieldName}
          value={submittedValue}
          style={{ borderColor: highlightColor }}
          readOnly
        />
      </div>
    );
  };

  if (!originalProduct || !submissionData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.imgcontainer}>
          <img className={styles.image} src={originalProduct.image} alt={originalProduct.productName} />
        </div>
        <form className={styles.form}>
          {renderInputField('Name:', 'productName')}
          {renderInputField('Price:', 'price')}
          {renderInputField('Description:', 'productDescription')}
          {/* Add more input fields as needed */}
        </form>
      </div>
    </div>
  );
};

export default ProductAdminDetail;
