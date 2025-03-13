import React, { useState } from "react";
import styles from "../styles/LoginModal.module.css";

export default function LoginModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempt:", formData);
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <h2>Login</h2>
        <p className={styles.subtitle}>Get the full experience</p>
        
        <div className={styles.socialButtons}>
          <button 
            onClick={() => handleSocialLogin('Google')}
            className={`${styles.socialButton} ${styles.google}`}
          >
            <span>🌐</span> Continue with Google
          </button>
          <button 
            onClick={() => handleSocialLogin('Facebook')}
            className={`${styles.socialButton} ${styles.facebook}`}
          >
            <span>📘</span> Continue with Facebook
          </button>
          <button 
            onClick={() => handleSocialLogin('Apple')}
            className={`${styles.socialButton} ${styles.apple}`}
          >
            <span>🍎</span> Continue with Apple
          </button>
          <button 
            onClick={() => handleSocialLogin('LinkedIn')}
            className={`${styles.socialButton} ${styles.linkedin}`}
          >
            <span>💼</span> Continue with LinkedIn
          </button>
        </div>

        <div className={styles.divider}>
          <span>or</span>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">📧 Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">🔒 Password</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              placeholder="Enter your password"
              required
            />
          </div>
          
          <div className={styles.checkboxGroup}>
            <input
              type="checkbox"
              id="rememberMe"
              checked={formData.rememberMe}
              onChange={(e) => setFormData({...formData, rememberMe: e.target.checked})}
            />
            <label htmlFor="rememberMe">🔄 Remember me</label>
          </div>

          <div className={styles.forgotPassword}>
            <a href="#">🔑 Forgot Password?</a>
          </div>

          <button type="submit" className={styles.loginButton}>
            ✉️ Continue with Email
          </button>

          <div className={styles.termsText}>
            By continuing you agree to flight booking{' '}
            <a href="#">Terms of Service</a> and{' '}
            <a href="#">Privacy Policy</a>
          </div>

          <div className={styles.benefits}>
            <p>💰 Track prices</p>
            <p>✈️ Make trip planning easier</p>
            <p>⚡ Enjoy faster booking</p>
          </div>
        </form>
      </div>
    </div>
  );
}