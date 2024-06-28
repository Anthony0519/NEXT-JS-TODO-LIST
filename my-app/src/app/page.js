'use client'
import { useFormState, useFormStatus } from 'react-dom';
import { createUser } from '@/lib/action'
import styles from "./page.module.css";
import Link from "next/link"
import { useEffect, useRef, useState } from 'react';
import {useRouter} from 'next/navigation'

export default function SignUp() {

  const [state, formAction] = useFormState(createUser, {message:'',error: ''})
  const {pending} = useFormStatus();
  const router = useRouter()

  const ref = useRef(null)
  useEffect(() => {
    // console.log('State message:', state.message);

    if (typeof state.message === 'string' && state.message.indexOf('user created') === 0) {
      ref.current?.reset();
      console.log('User created successfully:', state.message);
      router.push('/todo')
    } else if (state.error) {
      console.log('Error or other message:', state.error);
    }
}, [state.message, state.error]);

  return (
    <main className={styles.main}>
      <div className={styles.formHolder}>
        <div className={styles.leftpart}>
          <div>SIGN UP</div>
        </div>
        <div className={styles.rightpart}>
            <form className={styles.form} action={formAction}>
              <div>
                <h2>SIGN UP</h2>
              </div>
              <div className={styles.inputholders}>
              <input placeholder="First Name" type="text" name="firstName" required/>
              <input placeholder="Last Name" type="text" name="lastName" required/>
            </div>
            <div className={styles.inputholders}>
              <input placeholder="email" type="email" name="email" required/>
              <input placeholder="gender" list="gender-option" type="text" name="gender"/>
              <datalist id="gender-option">
              <option value="Male"/>
              <option value="Female"/>
              </datalist>
            </div>
            <div className={styles.inputholders}>
              <input placeholder="phone number" type="number" name="phoneNumber" required/>
              <input placeholder="DOB" type="date" name="DOB" required/>
            </div>
            <div className={styles.inputholders}>
              <input placeholder="password" type="password" name="password" required/>
              <input placeholder="comfirmPassword" type="password" name="comfirmPassword" required/>
            </div>
            <div className={styles.btn}>
              <button type="submit" disabled={pending}> {pending?"signing up..." : "sign up"} </button>
            </div>
            <div>
              <h3>Already have an account with us? <Link href="./login" style={{color:"#935ABE", textDecoration:"none"}}>login</Link></h3>
            </div>
            </form>
        </div>
      </div>
    </main>
  );
}
