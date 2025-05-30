import React from "react";
import styles from "./ProductList.module.css";

const ProductList = () => {
  const products = [
    {
      id: 1,
      image: "https://images.matas.dk/trs/w1780//encode/786759.jpg",
      alt: "sunscreen-protection",
      badge: "Save 25%",
      badgeType: "sale",
      categories: ["Summer", "Kids"],
      brand: "Audio Pro",
      name: "Wireless Noise-Cancelling Headphones",
      currentPrice: "97.49 kr.",
      originalPrice: "129.99 kr.",
      rating: 2,
      reviewCount: 18,
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1535463731090-e34f4b5098c5?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njh8fG5ldyUyMHplYWxhbmR8ZW58MHx8MHx8fDA%3D",
      alt: "that-tree-new-zealand",
      badge: "Save 5%",
      badgeType: "sale",
      categories: ["Aluminum"],
      brand: "ErgoDesk",
      name: "Adjustable Laptop Stand with Heat Dissipation and self balancing toggle button",
      currentPrice: "49.99 kr.",
      rating: 5,
      reviewCount: 31,
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1557214997-7eae7e0e7aaa?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "uluru-au",
      badge: "Save 5%",
      badgeType: "sale",
      categories: ["Waterproof"],
      brand: "SoundWave",
      name: "Portable Bluetooth Speaker with 360° Sound",
      currentPrice: "76.49 kr.",
      originalPrice: "89.99 kr.",
      rating: 3,
      reviewCount: 42,
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1522547902298-51566e4fb383?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "kyoto-temple",
      badge: "New",
      badgeType: "new",
      categories: ["Clear"],
      brand: "GuardTech",
      name: "Military-Grade Drop Protection Phone Case",
      currentPrice: "24.99 kr.",
      rating: 5,
      reviewCount: 156,
    },
    {
      id: 5,
      image: "https://m.media-amazon.com/images/I/51SFVnJ-JWL._AC_SL1500_.jpg",
      alt: "stanley-stainless-cup",
      badge: "Save 30%",
      badgeType: "sale",
      categories: ["7-in-1"],
      brand: "ConnectPro",
      name: "USB-C Hub with HDMI & Fast Charging",
      currentPrice: "55.99 kr.",
      originalPrice: "79.99 kr.",
      rating: 4,
      reviewCount: 87,
    },
    {
      id: 6,
      image:
        "https://lt2.pigugroup.eu/colours/153/656/20/15365620/9bcfa09f8780ca785ab5534a765cba92_large.jpg",
      alt: "basketball-molten",
      badge: "New",
      badgeType: "new",
      categories: ["7-in-1"],
      brand: "TechWear",
      name: "Smart Fitness Watch with Heart Rate Monitor",
      currentPrice: "55.99 kr.",
      originalPrice: "79.99 kr.",
      rating: 4,
      reviewCount: 124,
    },
    {
      id: 7,
      image:
        "https://mediacdn5.fristadskansas.com/Cache/138000/617dfd1898f8f7c4d79b0d21c3037348.jpg",
      alt: "green-light-tshirt",
      badge: "New",
      badgeType: "new",
      categories: ["7-in-1"],
      brand: "TechWear",
      name: "Smart Fitness Watch with Heart Rate Monitor",
      currentPrice: "55.99 kr.",
      originalPrice: "79.99 kr.",
      rating: 4,
      reviewCount: 124,
    },
    {
      id: 8,
      image:
        "https://mediacdn5.fristadskansas.com/Cache/146000/5b0451016a7cdcda763b8d8973863a9b.jpg",
      alt: "Smart Watch",
      badge: "New",
      badgeType: "new",
      categories: ["Aluminum"],
      brand: "TechWear",
      name: "Smart Fitness Watch with Heart Rate Monitor",
      currentPrice: "55.99 kr.",
      rating: 4,
      reviewCount: 124,
    },
  ];

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`${styles.star} ${i > rating ? styles.empty : ""}`}
          viewBox="0 0 16 16"
        >
          <path d="M7.9999 1.56909C8.15966 1.56908 8.30411 1.66414 8.36731 1.81088L10.074 5.77414L14.3706 6.17305C14.5296 6.18782 14.6647 6.29583 14.714 6.44777C14.7634 6.59971 14.7176 6.76645 14.5976 6.87188L11.3558 9.71913L12.3045 13.9278C12.3396 14.0837 12.2786 14.2455 12.1494 14.3394C12.0201 14.4333 11.8474 14.4413 11.7101 14.3597L7.99992 12.1569L4.2898 14.3597C4.15243 14.4413 3.9797 14.4333 3.85046 14.3394C3.72122 14.2455 3.66024 14.0837 3.69537 13.9278L4.64404 9.71911L1.40293 6.87185C1.28291 6.76642 1.23714 6.59969 1.28649 6.44775C1.33585 6.29582 1.47088 6.18782 1.62994 6.17305L5.92643 5.77414L7.63252 1.81093C7.69569 1.66418 7.84013 1.5691 7.9999 1.56909Z" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <div className={styles.container}>
      <a href="/av-docs/docs/frontend/styling/responsive-design#examples">
        back to main
      </a>
      <h1>Responsive Product List - ratio box for proportional images</h1>

      <div className={styles.productGrid}>
        {products.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <a
              href="#"
              aria-label={product.name}
              className={styles.anchorOverlay}
            />
            <div className={styles.productCardContent}>
              <div className={styles.productTop}>
                <div className={styles.productImageContainer}>
                  <img
                    src={product.image}
                    alt={product.alt}
                    className={styles.productImage}
                  />
                </div>
                <div className={styles.splashOverlayContainer}>
                  <div className={styles.splashOverlayBadgeContainer}>
                    <div
                      className={`${styles.splashOverlayBadge} ${
                        product.badgeType === "new" ? styles.new : ""
                      }`}
                    >
                      {product.badge}
                    </div>
                  </div>
                  <div className={styles.splashOverlayBadgeExtrasContainer}>
                    <div className={styles.extrasImageOverlay}></div>
                    <img
                      src="https://mediacdn5.fristadskansas.com/Cache/141000/1449f29f3519335a4a1ec1a16a1ae6d8.png"
                      alt="guarantee-icon"
                      className={styles.imageSplash}
                    />
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        opacity="0.5"
                        d="M3.37752 5.08241C3 5.62028 3 7.21907 3 10.4167V11.9914C3 17.6294 7.23896 20.3655 9.89856 21.5273C10.62 21.8424 10.9807 22 12 22C13.0193 22 13.38 21.8424 14.1014 21.5273C16.761 20.3655 21 17.6294 21 11.9914V10.4167C21 7.21907 21 5.62028 20.6225 5.08241C20.245 4.54454 18.7417 4.02996 15.7351 3.00079L15.1623 2.80472C13.595 2.26824 12.8114 2 12 2C11.1886 2 10.405 2.26824 8.83772 2.80472L8.26491 3.00079C5.25832 4.02996 3.75503 4.54454 3.37752 5.08241Z"
                        fill="#1C274C"
                      />
                      <path
                        d="M15.0595 10.4995C15.3353 10.1905 15.3085 9.71643 14.9995 9.44055C14.6905 9.16468 14.2164 9.19152 13.9406 9.5005L10.9286 12.8739L10.0595 11.9005C9.78359 11.5915 9.30947 11.5647 9.0005 11.8406C8.69152 12.1164 8.66468 12.5905 8.94055 12.8995L10.3691 14.4995C10.5114 14.6589 10.7149 14.75 10.9286 14.75C11.1422 14.75 11.3457 14.6589 11.488 14.4995L15.0595 10.4995Z"
                        fill="#1C274C"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className={styles.productMid}>
                <div className={styles.productActions}>
                  <div className={styles.categoryWrapper}>
                    {product.categories.map((category, index) => (
                      <div key={index} className={styles.categoryName}>
                        {category}
                      </div>
                    ))}
                  </div>
                  <button
                    className={styles.favoriteBtn}
                    aria-label="Add to favorites"
                  >
                    <svg className={styles.heartIcon} viewBox="0 0 24 24">
                      <path d="M6.24463 2.46663C7.07797 2.31962 7.93325 2.35467 8.75177 2.56939C9.57028 2.78411 10.3326 3.17341 10.9865 3.71056C11.3693 4.02499 12 4.78351 12 4.78351C12 4.78351 12.6308 4.02499 13.0135 3.71056C13.6674 3.17341 14.4297 2.78411 15.2483 2.56939C16.0668 2.35467 16.9221 2.31962 17.7554 2.46663C18.5887 2.61364 19.3804 2.93924 20.076 3.42108C20.7717 3.90291 21.3548 4.52957 21.7854 5.25803C22.216 5.98649 22.4838 6.7995 22.5706 7.64125C22.6573 8.48301 22.5609 9.33356 22.2879 10.1345C22.0149 10.9355 21.5718 11.6679 20.9891 12.2815L20.9863 12.2843L12.7206 20.8738C12.3272 21.2826 11.6729 21.2826 11.2795 20.8738L3.01096 12.2815C2.4282 11.6679 1.98513 10.9355 1.71214 10.1345C1.43915 9.33356 1.34271 8.48301 1.42945 7.64125C1.51619 6.7995 1.78405 5.98649 2.21465 5.25803C2.64524 4.52957 3.22837 3.90291 3.924 3.42108C4.61963 2.93924 5.41129 2.61364 6.24463 2.46663Z" />
                    </svg>
                  </button>
                </div>
                <div className={styles.productDetails}>
                  <div className={styles.productBrand}>{product.brand}</div>
                  <div className={styles.productName}>{product.name}</div>
                </div>
              </div>
              <div className={styles.productBottom}>
                <div className={styles.priceRatingContainer}>
                  <div className={styles.priceContainer}>
                    <span className={styles.currentPrice}>
                      {product.currentPrice}
                    </span>
                    {product.originalPrice && (
                      <span className={styles.originalPrice}>
                        {product.originalPrice}
                      </span>
                    )}
                  </div>
                  <div className={styles.ratingContainer}>
                    <div className={styles.ratingStars}>
                      {renderStars(product.rating)}
                    </div>
                    <span className={styles.ratingCount}>
                      ({product.reviewCount})
                    </span>
                  </div>
                </div>
                <button className={styles.addToCart} aria-label="Add to cart">
                  <svg className={styles.cartIcon} viewBox="0 0 16 16">
                    <path d="M14.0117 5.00006C14.0117 5.00006 13.8711 4.80005 13.6166 4.80005C13.3622 4.80005 10.6166 4.80005 10.6166 4.80005C10.5166 3.90005 10.2166 3.00005 9.71665 2.40005C9.21665 1.70005 8.41665 1.30005 7.71665 1.30005C6.91665 1.30005 6.21665 1.70005 5.71665 2.40005C5.21665 3.00005 4.91665 3.90005 4.81665 4.80005H1.91665C1.71665 4.80005 1.51665 4.90005 1.41665 5.00005C1.21665 5.30005 1.41665 5.70005 1.41665 5.80005L4.31665 14.2C4.41665 14.4 4.61665 14.6 4.81665 14.6H10.4166C10.6166 14.6 10.7166 14.5571 10.8166 14.4571C10.9166 14.3571 10.9805 14.1391 10.9805 14.0391C10.9805 13.9391 10.9491 13.6953 10.7773 13.5235C10.6773 13.4235 10.5166 13.4 10.4166 13.4H5.21665L2.71665 6.00005H13.6166C13.9166 6.00005 14.1166 5.70005 14.1166 5.40005C14.1166 5.086 14.0117 5.00006 14.0117 5.00006ZM5.91665 4.70005C6.01665 4.00005 6.21665 3.50005 6.51665 3.00005C6.81665 2.50005 7.31665 2.30005 7.71665 2.30005C8.11665 2.30005 8.61665 2.60005 8.91665 3.00005C9.21665 3.40005 9.41665 4.00005 9.51665 4.70005H5.91665Z" />
                  </svg>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
