'use client';

import styles from "./page.module.css";
import Link from "next/link";
import Spinner from ".././Loadings/spinner"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Modal from "../../component/modal";

export default function SignUp() {
  const [info, setInfo] = useState({email: "",password: ""});
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
      const res = await fetch("api/login", {
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
    router.push("/todo");
  };

  return (
    <main className={styles.main}>
      <div className={styles.formHolder}>
        <div className={styles.leftpart}>
          <div>LOGIN</div>
        </div>
        <div className={styles.rightpart}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div>
              <h2>LOGIN TO CONTINUE</h2>
            </div>
            <div className={styles.inputholders}>
              <input placeholder="Email" type="email" name="email" onChange={handleInput} required />
            </div>
            <div className={styles.inputholders}>
              <input placeholder="Password" type="password" name="password" onChange={handleInput} required />
            </div>
            <div className={styles.btn}>
              {error && <span className={styles.error}>{error}</span>}
              {pending ? <Spinner /> : <button type="submit">LOGIN</button>}
            </div>
            <div>
              <h3>Already have an account with us? <Link href="/" style={{ color: "#935ABE", textDecoration: "none" }}>Sign up</Link></h3>
            </div>
          </form>
          {showModal && <Modal message={success} onClose={handleModal} />}
        </div>
      </div>
    </main>
  );
}
