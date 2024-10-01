import React from 'react';
import styles from '../css/agree.module.css';
import { useState } from 'react';

const Agree = () => {
    const [allCheck, setAllCheck] = useState(false);
    const [termsOfUseCheck, setTermsOfUseCheck] = useState(false);
    const [personalCheck, setPersonalCheck] = useState(false);
    const [gradingCheck, setGradingCheck] = useState(false);
    const [examineeCheck, setExamineeCheck] = useState(false);
    const [locationCheck, setLocationCheck] = useState(false);

    const allCheckClicked = () => {
        setAllCheck(!allCheck);
        setTermsOfUseCheck(!allCheck);
        setPersonalCheck(!allCheck);
        setGradingCheck(!allCheck);
        setExamineeCheck(!allCheck);
        setLocationCheck(!allCheck);
    };

    const termsOfUseCheckClicked = () => {
        setTermsOfUseCheck(!termsOfUseCheck);
    };

    const personalCheckClicked = () => {
        setPersonalCheck(!personalCheck);
    };

    const gradingCheckClicked = () => {
        setGradingCheck(!gradingCheck);
    };

    const examineeCheckClicked = () => {
        setExamineeCheck(!examineeCheck);
    };

    const locationCheckClicked = () => {
        setLocationCheck(!locationCheck);
    };

    return (
        <>
            <main className={styles.main}>
                <div className={styles['welcome-div']}>
                    <img src="../svg/logo.svg" alt="Logo" />
                    <p>환영합니다!</p>
                </div>
            
                <div className={styles['start-div']}>
                    <p>약관동의</p>
                </div>
            
                <div className={styles['cover-agree-div']}>
                    <div className={`${styles['agree-div']} ${styles['border-line']}`}>
                    <div className={styles['agree-left']}>
                        <img 
                            id="check-all" 
                            src={allCheck ? '../svg/check-btn-on.svg' : '../svg/check-btn.svg'} 
                            onClick={allCheckClicked}
                            alt="check-btn" />
                        <span>아래의 약관 및 동의사항에 모두 동의</span>
                    </div>
                    </div>
            
                    <div className={styles['agree-div']}>
                    <div className={styles['inner-agree-div']}>
                        <div className={styles['agree-space']}>
                        <img 
                            className={styles['check-img']} 
                            src={termsOfUseCheck ? '../svg/check-btn-on.svg' : '../svg/check-btn.svg'} 
                            onClick={termsOfUseCheckClicked}
                            alt="check-btn" />
                        <span>이용약관 동의(필수)</span>
                        </div>
                        <img src="../svg/detail-btn.svg" alt="detail-btn" />
                    </div>
                    </div>
            
                    <div className={styles['agree-div']}>
                    <div className={styles['inner-agree-div']}>
                        <div className={styles['agree-space']}>
                        <img 
                            className={styles['check-img']}  
                            src={personalCheck ? '../svg/check-btn-on.svg' : '../svg/check-btn.svg'} 
                            onClick={personalCheckClicked}
                            alt="check-btn" />
                        <span>개인정보 수집 및 이용동의(필수)</span>
                        </div>
                        <img src="../svg/detail-btn.svg" alt="detail-btn" />
                    </div>
                    </div>
            
                    <div className={styles['agree-div']}>
                    <div className={styles['inner-agree-div']}>
                        <div className={styles['agree-space']}>
                        <img 
                            className={styles['check-img']} 
                            src={gradingCheck ? '../svg/check-btn-on.svg' : '../svg/check-btn.svg'} 
                            onClick={gradingCheckClicked} 
                            alt="check-btn" />
                        <span>채점프로그램 Mscore 이용약관 동의(필수)</span>
                        </div>
                        <img src="../svg/detail-btn.svg" alt="detail-btn" />
                    </div>
                    </div>
            
                    <div className={styles['agree-div']}>
                    <div className={styles['inner-agree-div']}>
                        <div className={styles['agree-space']}>
                        <img 
                            className={styles['check-img']} 
                            src={examineeCheck ? '../svg/check-btn-on.svg' : '../svg/check-btn.svg'} 
                            onClick={examineeCheckClicked}
                            alt="check-btn" />
                        <span>수검자의 개인정보 수집 및 처리에 관한 정책 동의(필수)</span>
                        </div>
                        <img src="../svg/detail-btn.svg" alt="detail-btn" />
                    </div>
                    </div>
            
                    <div className={styles['agree-div']}>
                    <div className={styles['inner-agree-div']}>
                        <div className={styles['agree-space']}>
                        <img 
                            className={styles['check-img']} 
                            src={locationCheck ? '../svg/check-btn-on.svg' : '../svg/check-btn.svg'} 
                            onClick={locationCheckClicked} 
                            alt="check-btn" />
                        <span>위치기반 서비스 이용약관(선택)</span>
                        </div>
                        <img src="../svg/detail-btn.svg" alt="detail-btn" />
                    </div>
                    </div>
                </div>
            
                <div className={styles['center-div']}>
                    <button
                    className={styles['next-btn']}
                    onClick={() => {
                        if (termsOfUseCheck && personalCheck && gradingCheck && examineeCheck) {
                            window.location.href = 'join'; 
                          } else {
                            alert('필수 항목을 모두 선택해주세요.'); 
                          }
                    }}
                    >
                    다음
                    </button>
                </div>
            </main>
        </>
      );
    };

export default Agree;