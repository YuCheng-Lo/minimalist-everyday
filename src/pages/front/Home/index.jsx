import styles from "./style.module.scss";
import { useNavigate, Link } from "react-router-dom";

const Home = () => {
  const heroImg =
    "https://images.unsplash.com/photo-1638454668466-e8dbd5462f20?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const navigate = useNavigate();

  const products = [
    {
      title: "香氛蠟燭",
      price: 290,
      origin_price: 350,
      imageUrl:
        "https://images.unsplash.com/photo-1619695662967-3e739a597f47?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHNjZW50ZWQlMjBjYW5kbGV8ZW58MHx8MHx8fDI%3D",
    },
    {
      title: "頭戴式無線耳機",
      price: 4990,
      origin_price: 5490,
      imageUrl:
        "https://images.unsplash.com/photo-1690203262675-920838685913?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDIyfHx8ZW58MHx8fHx8",
    },
    {
      title: "白色陶瓷馬克杯",
      price: 99,
      origin_price: 150,
      imageUrl:
        "https://images.unsplash.com/photo-1661399086686-20ce9ecd398b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "小質感筆記本",
      price: 25,
      origin_price: 39,
      imageUrl:
        "https://images.unsplash.com/photo-1566355923884-14f672712e47?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

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

      <section className={styles["popular-products"]}>
        <div className={styles["popular-products__container"]}>
          {/* 標題 */}
          <div className={styles["popular-products__header"]}>
            <span className={styles["popular-products__subtitle"]}>
              Recommended
            </span>
            <h2 className={styles["popular-products__title"]}>熱門商品</h2>
          </div>

          {/* 商品格子 */}
          <div className={styles["popular-products__grid"]}>
            {products.map((product, index) => (
              <div key={index} className={styles["popular-products__item"]}>
                <div className={styles["popular-products__item-img"]}>
                  {product.price < product.origin_price && (
                    <span className={styles["popular-products__badge"]}>
                      SALE
                    </span>
                  )}
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    loading="lazy"
                  />
                </div>

                <h4 className={styles["popular-products__item-name"]}>
                  {product.title}
                </h4>

                <div className={styles["popular-products__item-price-wrapper"]}>
                  <p className={styles["popular-products__item-origin-price"]}>
                    NT${product.origin_price}
                  </p>
                  <p className={styles["popular-products__item-price"]}>
                    NT${product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className={styles["popular-products__footer"]}>
            <Link to="/products" className={styles["popular-products__more"]}>
              查看更多商品
              <span className={styles["popular-products__arrow"]}>→</span>
            </Link>
          </div>
        </div>
      </section>

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
