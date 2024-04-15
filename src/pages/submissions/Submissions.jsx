import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import styles from "./Submissions.module.css";

const Submissions = () => {
    const [submissions, setSubmissions] = useState([]);
    const dummysub=[{
        productName:"dummy",
        productId:"dummy",
        date:"dummy",
        status:"dummy"
    },
    {
        productName:"dummy",
        productId:"dummy",
        date:"dummy",
        status:"dummy"
    }]

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const response = await fetch("/api/submissions");
                const data = await response.json();
                setSubmissions(data);
            } catch (error) {
                console.error("Error fetching submissions:", error);
            }
        };

        fetchSubmissions();
    }, []);

    return (
        <>
            <Navbar />
            <div className={styles.container}>
                <table className={styles.submissionsTable}>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Product id</th>
                            <th>Date of Submission</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dummysub.map((submission) => (
                            
                            <tr key={submission._id}>
                                <td>{submission.productName}</td>
                                <td>{submission.productId}</td>
                                <td>{submission.date}</td>
                                <td>{submission.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Submissions;
