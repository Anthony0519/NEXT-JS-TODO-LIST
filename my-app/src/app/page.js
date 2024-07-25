'use client';
// import { useFormState } from 'react-dom';
// import { createUser } from '@/lib/action'
import styles from "./page.module.css";
import Link from "next/link";
import Spinner from "./Loadings/spinner"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Modal from "../component/modal";

export default function SignUp() {
  const [info, setInfo] = useState({ firstName: "", lastName: "", email: "", gender: "", phoneNumber: "", DOB: "", password: "", confirmPassword: "" });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [pending, setPending] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleInput = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setPending(true);
      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "content-Type": "application/json"
        },
        body: JSON.stringify(info)
      });
      if (res.ok) {
        setPending(false);
        const resData = await res.json();
        setSuccess(resData.message);
        setShowModal(true);
        const form = e.target;
        form.reset();
      } else {
        const errorData = await res.json();
        setError(errorData.error);
        setPending(false);
      }
    } catch (err) {
      setPending(false);
      setError(`Something went wrong on client side. ${err.message}`);
    }
  };

  const handleModal = () => {
    setShowModal(false);
    router.push("/login");
  };

  return (
    <main className={styles.main}>
      <div className={styles.formHolder}>
        <div className={styles.leftpart}>
          <div>SIGN UP</div>
        </div>
        <div className={styles.rightpart}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div>
              <h2>SIGN UP</h2>
            </div>
            <div className={styles.inputholders}>
              <input placeholder="First Name" type="text" name="firstName" onChange={handleInput} required />
              <input placeholder="Last Name" type="text" name="lastName" onChange={handleInput} required />
            </div>
            <div className={styles.inputholders}>
              <input placeholder="Email" type="email" name="email" onChange={handleInput} required />
              <input placeholder="Gender" list="gender-option" type="text" name="gender" onChange={handleInput} />
              <datalist id="gender-option">
                <option value="Male" />
                <option value="Female" />
              </datalist>
            </div>
            <div className={styles.inputholders}>
              <input placeholder="Phone Number" type="number" name="phoneNumber" onChange={handleInput} required />
              <input placeholder="DOB" type="date" name="DOB" onChange={handleInput} required />
            </div>
            <div className={styles.inputholders}>
              <input placeholder="Password" type="password" name="password" onChange={handleInput} required />
              <input placeholder="Confirm Password" type="password" name="confirmPassword" onChange={handleInput} required />
            </div>
            <div className={styles.btn}>
              {error && <span className={styles.error}>{error}</span>}
              {pending ? <Spinner /> : <button type="submit">Sign up</button>}
            </div>
            <div>
              <h3>Already have an account with us? <Link href="./login" style={{ color: "#935ABE", textDecoration: "none" }}>login</Link></h3>
            </div>
          </form>
          {showModal && <Modal message={success} onClose={handleModal} />}
        </div>
      </div>
    </main>
  );
}
