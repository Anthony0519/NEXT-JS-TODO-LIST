'use client'
import styles from "./page.module.css";
import Link from "next/link"

export default function SignUp() {

  return (
    <main className={styles.main}>
      <div className={styles.formHolder}>
        <div className={styles.leftpart}>
          <div>LOGIN</div>
        </div>
        <div className={styles.rightpart}>
            <form className={styles.form}>
              <div>
                <h2>LOGIN TO CONTINUE</h2>
              </div>
            <div className={styles.inputholders}>
              <input placeholder="email" type="email" name="email" required/>
            </div>
            <div className={styles.inputholders}>
              <input placeholder="password" type="password" name="password" required/>
            </div>
            <div className={styles.btn}>
              <button type="submit">Login</button>
            </div>
            <div>
              <h3>Don't have an account with us? <Link href="/" style={{color:"#935ABE", textDecoration:"none"}}>sign up</Link></h3>
            </div>
            </form>
        </div>
      </div>
    </main>
  );
}
