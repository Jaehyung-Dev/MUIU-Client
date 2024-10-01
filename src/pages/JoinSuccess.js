import React from 'react';
import styles from '../css/join-success.module.css'
import Link from '@mui/icons-material/Link';

const JoinSuccess = () => {
  return (
    <>
      <main className={styles.main}>
        {/* <div className={styles['back-btn-div']}>
            <button
                className={styles['back-btn']}
                type="button"
            >
                <img src='../svg/back-btn.svg' alt="back button" />
            </button>
        </div> */}

        <div className={styles['join-complete']}>
          <img
            className={styles['join-complete-img']}
            src="../svg/join-complete.svg"
            alt="join-complete"
          />
          <p className={styles['join-complete-msg1']}>
            회원가입이 <b>완료</b> 되었습니다.
          </p>
          <p className={styles['join-complete-msg2']}>
            로그인하시면 더욱 다양한 서비스를 이용 가능합니다.
          </p>
        </div>

        <div className={`${styles['default-div']} ${styles['select-div']}`}>
          <button className={`${styles['select-btn']} ${styles['btn-hover']} ${styles['home-btn']}`} type="button">
            <p>홈으로</p>
          </button>
          <button
            className={`${styles['select-btn']} ${styles['btn-hover']} ${styles['login-btn']}`}
            type="button"
            onClick={() => (window.location.href = 'login')}
          >
            <p>로그인</p>
          </button>
        </div>
      </main>
    </>
  );
};


export default JoinSuccess;