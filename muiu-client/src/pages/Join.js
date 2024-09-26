import React, { useState } from 'react';
import styles from '../css/join.module.css';

export const Join = () => {
    const [isGeneral, setIsGeneral] = useState(true);
    const [isCounselor, setIsCounselor] = useState(false);

    const generalClicked = () => {
        setIsGeneral(true);
        setIsCounselor(false);
    };

    const counselorClicked = () => {
        setIsGeneral(false);
        setIsCounselor(true);
    };

    return (
        <>
            <main className={styles.main}>
                {/* <div className={styles['back-btn-div']}>
                    <button
                        className={styles['back-btn']}
                        type="button"
                        onClick={() => (window.location.href = 'agree')}
                    >
                        <img src='../svg/back-btn.svg' alt="back button" />
                    </button>
                </div> */}

                <div className={styles['cover-select-div']}>
                    <div className={styles['select-div']}>
                        <p className={styles.bold}>회원 유형을 선택하세요</p>
                    </div>
                    <div className={styles['select-div']}>
                        <button 
                            className={`${styles['select-btn']} ${styles['btn-hover']} ${styles['counselor-btn']} ${isGeneral ? styles['active'] : ''}`}  
                            type="button"
                            onClick={generalClicked}
                            >
                            <p>일반회원</p>
                        </button>
                        <button 
                            className={`${styles['select-btn']} ${styles['btn-hover']} ${styles['counselor-btn']} ${isCounselor ? styles['active'] : ''}`} 
                            type="button"
                            onClick={counselorClicked}
                            >
                            <p>상담사</p>
                        </button>
                    </div>
                </div>

                <div className={styles['cover-text-guide']}>
                    <p className={styles['text-guide']}>아이디</p>
                </div>
                <div className={styles['default-div']}>
                    <input
                        className={styles['input-default']}
                        type="text"
                        placeholder="아이디를 입력하세요"
                    />
                </div>

                <div className={styles['cover-text-guide']}>
                    <p className={styles['text-guide']}>비밀번호</p>
                </div>
                <div className={styles['default-div']}>
                    <input
                        className={styles['input-default']}
                        type="password"
                        placeholder="비밀번호를 입력하세요"
                    />
                </div>

                <div className={styles['cover-text-guide']}>
                    <p className={styles['text-guide']}>비밀번호 확인</p>
                </div>
                <div className={styles['default-div']}>
                    <input
                        className={styles['input-default']}
                        type="password"
                        placeholder="비밀번호를 다시 입력하세요"
                    />
                </div>

                <div className={styles['cover-text-guide']}>
                    <p className={styles['text-guide']}>이메일</p>
                </div>
                <div className={styles['default-div']}>
                    <input
                        className={styles['input-default']}
                        type="email"
                        placeholder="이메일주소를 입력하세요"
                    />
                </div>

                <div className={`${styles['cover-text-guide']} ${isCounselor ? '' : styles['hidden']}`}>
                    <p className={styles['text-guide']}>상담사 인증번호</p>
                </div>
                <div className={`${styles['default-div']} ${isCounselor ? '' : styles['hidden']}`}>
                    <input
                        className={styles['input-default']}
                        type="password"
                        placeholder="인증번호를 입력하세요"
                    />
                </div>

                <div className={styles['auth-div']}>
                    <button
                        className={`${styles['auth-btn']} ${styles['btn-hover']}`}
                        type="button"
                        onClick={() => (window.location.href = 'join-success')}
                    >
                        <p className={styles.bold}>본인인증</p>
                    </button>
                </div>
            </main>
        </>
    );
};

export default Join;