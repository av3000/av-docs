import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from "./FiltersList.module.css";

const FiltersList = () => {
  // State to track if all filters are visible
  const [showAll, setShowAll] = useState(false);

  // Refs for DOM manipulation (avoiding React re-renders)
  const containerRef = useRef(null);
  const filterListRef = useRef(null);
  const showBtnRef = useRef(null);
  const filterRefs = useRef([]);

  // Static filter data
  const filters = [
    "Electronics",
    "Clothing & Accessories",
    "Home & Garden",
    "Sports & Outdoors",
    "Books & Media",
    "Toys & Games",
    "Health & Beauty",
    "Automotive",
    "Food & Beverages",
    "Office Supplies",
    "Pet Supplies",
    "Tools & Hardware",
  ];

  /**
   * Resets all filters by removing overflow classes
   */
  const resetOverflowClasses = useCallback(() => {
    filterRefs.current.forEach((filterRef) => {
      if (filterRef) {
        filterRef.classList.remove(styles.overflow);
      }
    });
  }, []);

  /**
   * Calculates which filters should be hidden due to overflow
   * @param {number} maxWidth - Maximum available width for filters
   * @returns {number} Number of overflowing filters
   */
  const calculateOverflowItemsToHide = useCallback((maxWidth) => {
    let currentWidth = 0;
    let overflowCount = 0;
    const gapBetweenFilters = 8;

    filterRefs.current.forEach((filterRef) => {
      if (!filterRef) return;

      // Filter width + gap
      currentWidth += filterRef.offsetWidth + gapBetweenFilters;

      // Hide current filter
      if (currentWidth > maxWidth) {
        filterRef.classList.add(styles.overflow);
        overflowCount++;
      }
    });

    return overflowCount;
  }, []);

  /**
   * Updates the show/hide button display and text
   * @param {number} overflowCount - Number of hidden filters
   */
  const updateButtonDisplay = useCallback((overflowCount) => {
    if (!showBtnRef.current) return;

    if (overflowCount > 0) {
      // Show button with count
      showBtnRef.current.textContent = `Show all (${overflowCount})`;
      showBtnRef.current.style.display = "block";
    } else {
      // Hide button and reset show-all state
      showBtnRef.current.style.display = "none";
      if (filterListRef.current) {
        filterListRef.current.classList.remove(styles.showAll);
      }
      setShowAll(false);
    }
  }, []);

  /**
   * Main overflow detection and UI update function
   * Calculates available space and determines which filters to hide
   */
  const checkOverflow = useCallback(() => {
    // Ensure all required refs are available
    if (
      !containerRef.current ||
      !showBtnRef.current ||
      !filterRefs.current.length
    ) {
      return;
    }

    resetOverflowClasses();

    // Calculate available space
    const containerWidth = containerRef.current.offsetWidth;
    const buttonWidth = showBtnRef.current.offsetWidth;
    const gapSpace = 24; // Gaps between elements
    const maxWidth = containerWidth - buttonWidth - gapSpace;

    // Update button visibility and text with hidden filters count
    const overflowCount = calculateOverflowItemsToHide(maxWidth);

    updateButtonDisplay(overflowCount);
  }, [resetOverflowClasses, calculateOverflowItemsToHide, updateButtonDisplay]);

  /**
   * Updates the filter list display state (single row vs wrapped)
   * @param {boolean} shouldShowAll - Whether to show all filters
   */
  const updateFilterListDisplay = useCallback((shouldShowAll) => {
    if (!filterListRef.current) return;

    if (shouldShowAll) {
      filterListRef.current.classList.add(styles.showAll);
    } else {
      filterListRef.current.classList.remove(styles.showAll);
    }
  }, []);

  /**
   * Updates the button appearance and text based on state
   * @param {boolean} isShowingAll - Current show all state
   */
  const updateButtonState = useCallback(
    (isShowingAll) => {
      if (!showBtnRef.current) return;

      if (isShowingAll) {
        // Button in "hide" mode
        showBtnRef.current.textContent = "Hide";
        showBtnRef.current.classList.add(styles.active);
      } else {
        // Button in "show all" mode - recalculate overflow
        showBtnRef.current.classList.remove(styles.active);
        checkOverflow(); // Recalculate overflow counts
      }
    },
    [checkOverflow]
  );

  /**
   * Handles the show all / hide button click
   * Toggles between showing all filters and hiding overflow filters
   */
  const handleShowAllClick = useCallback(() => {
    const newShowAll = !showAll;
    setShowAll(newShowAll);

    // Update UI based on new state
    updateFilterListDisplay(newShowAll);
    updateButtonState(newShowAll);
  }, [showAll, updateFilterListDisplay, updateButtonState]);

  /**
   * Set up resize listener and initial overflow calculation
   */
  useEffect(() => {
    /**
     * Handle window resize events
     * Only recalculate overflow when not in "show all" mode
     */
    const handleResize = () => {
      if (!showAll) {
        checkOverflow();
      }
    };

    // Initial overflow calculation after component mounts
    // Delay ensures DOM is fully rendered
    const initialTimer = setTimeout(checkOverflow, 100);

    // Add resize listener
    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(initialTimer);
    };
  }, [checkOverflow, showAll]);

  return (
    <div className={styles.filters} ref={containerRef}>
      {/* Filter list container */}
      <div className={styles.filterList} ref={filterListRef}>
        {filters.map((filter, index) => (
          <button
            key={filter}
            className={styles.filter}
            ref={(el) => (filterRefs.current[index] = el)}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Show all / Hide toggle button */}
      <button
        className={styles.showAllBtn}
        ref={showBtnRef}
        onClick={handleShowAllClick}
        style={{ display: "none" }} // Initially hidden
      >
        Show all (0)
      </button>
    </div>
  );
};

export default FiltersList;
