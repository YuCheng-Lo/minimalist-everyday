import styles from "./style.module.scss";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const heroImg =
    "https://images.unsplash.com/photo-1638454668466-e8dbd5462f20?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const navigate = useNavigate();

  const steps = [
    { title: "品味挑選", desc: "走訪世界各地，為您精選最有溫度的極簡物件。" },
    {
      title: "細心包裝",
      desc: "採用環境友善材質，確保每一份期待都能優雅抵達。",
    },
    { title: "光速送達", desc: "專屬宅配物流，讓質感生活無需長時等待。" },
  ];

  return (
    <div>
      <div className={styles.hero}>
        <img src={heroImg} alt="hero" />
        <div className={styles.hero__overlay}>
          <h1>拾光日常</h1>
          <p>簡約生活，從這一刻開始</p>
          <button
            className={styles.hero__cta}
            onClick={() => {
              navigate("/products");
            }}
          >
            立即選購
          </button>
        </div>
      </div>

      <section className={styles["process-stepper"]}>
        <div className={styles["process-stepper__container"]}>
          {/* Title */}
          <div className={styles["process-stepper__header"]}>
            <span className={styles["process-stepper__subtitle"]}>
              Quality Assurance
            </span>
            <h2 className={styles["process-stepper__title"]}>
              精心挑選，只為日常
            </h2>
          </div>

          {/* Stepper */}
          <div className={styles["process-stepper__stepper"]}>
            <div className={styles["process-stepper__line"]}></div>

            {steps.map((step, index) => (
              <div key={index} className={styles["process-stepper__step"]}>
                <div className={styles["process-stepper__circle"]}>
                  {index + 1}
                </div>

                <h4 className={styles["process-stepper__step-title"]}>
                  {step.title}
                </h4>

                <p className={styles["process-stepper__step-desc"]}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles["brand-intro"]}>
        <h3 className={styles["brand-intro__title"]}>拾取時光中的細碎美好</h3>
        <p className={styles["brand-intro__text"]}>
          我們相信，生活不只是生存，而是一場關於質感的實踐。
          <br />
          「拾光日常」精選世界各地極簡設計物，
          <br />
          讓每一件日常用品，都能成為你桌上的一抹流光。
        </p>
        <div className={styles["brand-intro__divider"]} />
      </section>
    </div>
  );
};

export default Home;
