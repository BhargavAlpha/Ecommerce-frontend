import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './ProductDetail.module.css';
import Navbar from '../../components/navbar/Navbar';

const ProductDetail = () => {
  const email = localStorage.getItem('email');
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    productId: id,
    productName: '',
    price: '',
    productDescription: '',
    image: null,
    email: email
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/product/${id}`);
        const fetchedProduct = response.data;

        // Set the fetched product details into both product state and formData state
        setProduct(fetchedProduct);
        setFormData({
          productId: fetchedProduct.productId,
          productName: fetchedProduct.productName,
          price: fetchedProduct.price,
          productDescription: fetchedProduct.productDescription,
          image: null, // You might want to set this based on fetchedProduct.image if needed
          email: email
        });
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id, email]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('email', formData.email);
      formDataToSend.append('productName', formData.productName);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('productDescription', formData.productDescription);
      formDataToSend.append('image', formData.image);
      formDataToSend.append('productId', formData.productId);

      const response = await axios.post(`http://localhost:3000/api/submit-request`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Product updated:', response.data);
      alert('Product updated successfully!');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product');
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.imgcontainer}>
          <img className={styles.image} src={product.image} alt={product.productName} />
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <p className={styles.labels}>Name:</p>
          <input
            className={styles.name}
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleInputChange}
          />
          <p className={styles.labels}>Price:</p>
          <input
            className={styles.price}
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />
          <p className={styles.labels}>Description:</p>
          <textarea
            name="productDescription"
            value={formData.productDescription}
            onChange={handleInputChange}
          />
          <input
            className={styles.file}
            type="file"
            name="image"
            onChange={handleImageChange}
          />
          <button className={styles.btn} type="submit">
            Submit for Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductDetail;
