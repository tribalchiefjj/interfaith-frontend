import React from 'react';
import styles from './Footer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faEnvelope, faShieldAlt, faFileContract } from '@fortawesome/free-solid-svg-icons'; // Import specific icons

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.copyright}>&copy; {new Date().getFullYear()} Echoes of Insight all rights reserved</p>
        <nav className={styles.nav}>
          <a href="/about">
            <FontAwesomeIcon icon={faInfoCircle} className={styles.icon} /> About Us
          </a>
          <a href="/contact">
            <FontAwesomeIcon icon={faEnvelope} className={styles.icon} /> Contact Us
          </a>
          <a href="/privacy">
            <FontAwesomeIcon icon={faShieldAlt} className={styles.icon} /> Privacy Policy
          </a>
          <a href="/terms">
            <FontAwesomeIcon icon={faFileContract} className={styles.icon} /> Terms of Service
          </a>
        </nav>

      </div>
    </footer>
  );
};

export default Footer;