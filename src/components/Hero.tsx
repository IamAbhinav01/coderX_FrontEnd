import styles from './Hero.module.css';
import heroImg from '../assets/hero.png';

function Hero() {
  return (
    <div className={styles.hero}>
      <div className={styles.heroTextBox}>
        <h1 className={styles.headingPrimary}>
          coder
          <span className={`text-red-500 ${styles.kineticX}`}>X</span>
        </h1>

        <p className={styles.headingSecondary}>
          Elevate your technical skills with AI-engineered coding interview
          questions tailored exactly to your seniority and target role.
        </p>
        <a href="#" className={styles.btn}>
          Generate Problem
        </a>
        <a href="#" className={styles.btn}>
          Learn More &darr;
        </a>
      </div>
      <div className={styles.heroImageBox}>
        <img src={heroImg} alt="Hero" className={styles.heroImg} />
      </div>
    </div>
  );
}

export default Hero;
