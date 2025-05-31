import React, { useState } from "react";
import styles from "./Basket.module.css";

// Mock data for demonstration
const mockItems = [
  {
    id: 1,
    image:
      "https://mediacdn5.fristadskansas.com/Cache/140000/f32088defa0173ad6f827492f2c163ce.jpg",
    name: "Zircon friluftsbukser med stretch",
    code: "300361-940",
    delivery: "03-06-2025",
    size: "M",
    color: "Sort",
    unitPrice: 1248.75,
    quantity: 1,
    stock: 213,
  },
  {
    id: 2,
    image:
      "https://mediacdn5.fristadskansas.com/Cache/136000/792b5ac0f1ec3988dd700a9bc94d1d1c.jpg",
    name: "Zircon friluftsshorts med stretch",
    code: "300362-940",
    delivery: "03-06-2025",
    size: "S",
    color: "Sort",
    unitPrice: 936.25,
    quantity: 1,
    stock: 140,
  },
];

const ShoppingBasket = () => {
  const [items, setItems] = useState(mockItems);
  const [editingSize, setEditingSize] = useState(null);

  const updateQuantity = (id, delta) => {
    setItems(
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(
                1,
                Math.min(item.quantity + delta, item.stock)
              ),
            }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.basketGrid}>
        {/* Header Row */}
        <div className={styles.headerRow}>
          <div className={styles.emptyHeader}></div>
          <div className={styles.emptyHeader}></div>
          <div className={styles.emptyHeader}></div>
          <div className={styles.header}>Levering & lager</div>
          <div className={styles.header}>Størrelse & farve</div>
          <div className={styles.emptyHeader}></div>
          <div className={styles.header}>Enhedspris</div>
          <div className={`${styles.header} ${styles.centerAlign}`}>Antal</div>
          <div className={`${styles.header} ${styles.rightAlign}`}>Total</div>
        </div>

        {/* Item Rows */}
        {items.map((item) => (
          <React.Fragment key={item.id}>
            <div className={styles.itemRow}>
              <div className={styles.removeCell}>
                <button
                  className={styles.removeButton}
                  onClick={() => removeItem(item.id)}
                  aria-label="Remove item"
                >
                  ✕
                </button>
              </div>

              <div className={styles.imageCell}>
                <img
                  src={item.image}
                  alt={item.name}
                  className={styles.productImage}
                />
              </div>

              <div className={styles.nameCell}>
                <div className={styles.productName}>{item.name}</div>
                <div className={styles.productCode}>{item.code}</div>
              </div>

              <div className={styles.deliveryCell}>{item.delivery}</div>

              <div className={styles.sizeCell}>
                {editingSize === item.id ? (
                  <select
                    className={styles.sizeSelect}
                    defaultValue={item.size}
                    onBlur={() => setEditingSize(null)}
                    autoFocus
                  >
                    <option>XS</option>
                    <option>S</option>
                    <option>M</option>
                    <option>L</option>
                    <option>XL</option>
                  </select>
                ) : (
                  <>
                    <div>
                      {item.size}, {item.color}
                    </div>
                    <button
                      className={styles.editLink}
                      onClick={() => setEditingSize(item.id)}
                    >
                      Rediger
                    </button>
                  </>
                )}
              </div>

              <div className={styles.emptyCell}></div>

              <div className={styles.priceCell}>
                <span>{item.unitPrice.toFixed(2)} DKK</span>
              </div>

              <div className={`${styles.quantityCell} ${styles.centerAlign}`}>
                <div className={styles.quantityControl}>
                  <button
                    className={styles.quantityButton}
                    onClick={() => updateQuantity(item.id, -1)}
                    disabled={item.quantity <= 1}
                  >
                    −
                  </button>
                  <input
                    type="text"
                    className={styles.quantityInput}
                    value={item.quantity}
                    readOnly
                  />
                  <button
                    className={styles.quantityButton}
                    onClick={() => updateQuantity(item.id, 1)}
                    disabled={item.quantity >= item.stock}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className={`${styles.totalCell} ${styles.rightAlign}`}>
                <div className={styles.totalPrice}>
                  {(item.unitPrice * item.quantity).toFixed(2)} DKK
                </div>
                <button
                  className={styles.messageButton}
                  aria-label="Add message"
                >
                  💬
                </button>
              </div>
            </div>

            {/* Validation Row (hidden by default) */}
            {item.quantity > item.stock * 0.9 && (
              <div className={styles.validationRow}>
                <div></div>
                <div></div>
                <div
                  className={styles.validationMessage}
                  style={{ gridColumn: "3 / 8" }}
                >
                  <span className={styles.warningText}>
                    We only have {item.stock} pcs left in stock or production of
                    size {item.size} that you can order.
                  </span>
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ShoppingBasket;
