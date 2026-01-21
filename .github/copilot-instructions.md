# Copilot Instructions for Jeju Air Portfolio Website

This is a **portfolio project replicating Jeju Air airline website** (non-official). It's a vanilla HTML/CSS/JavaScript implementation without build tools or frameworks.

## Architecture Overview

**Three-file structure:**
- **[index.html](../index.html)** - Semantic markup (508 lines) with sections: header, news banner, main banner, booking form, benefits slider, price slider
- **[script.js](../script.js)** - Class-based component system (395 lines) with instantiation in DOMContentLoaded
- **[styles.css](../styles.css)** - Mobile-first responsive design with max-width 1004px container

## Core Pattern: Component Classes

All interactive features use **ES6 classes with event delegation**. Each class:
1. Queries DOM elements in `constructor()`
2. Binds event listeners in `init()`
3. Updates DOM state in dedicated methods (e.g., `update()`, `toggle()`)

**Example:** `NewsBanner` rotates `.news-item` elements with `.active` class toggling.

### Key Components
- **NewsBanner** - Carousel with prev/next buttons, close action, updates `.news-indicator`
- **MainBanner** - Auto-plays 5s interval, pause control, shows `X / 4` format
- **BookingTabs, TripType** - Single-select tab systems using `.active` class
- **BenefitsSlider, PriceSlider** - Horizontal carousels with `transform: translateX()` and dot indicators
- **FloatingButtons** - Menu toggle with opacity/transform animations
- **SearchButton** - Validates route inputs, disables button with gray color
- **ScrollHeader** - Adds shadow at scroll > 100px

## Critical Patterns

### Modulo Arithmetic for Carousels
NewsBanner/MainBanner use `(index ± 1 + length) % length` for circular navigation. Don't break this—it handles wraparound from last to first item.

### Slider Architecture
Benefits/Price sliders use:
- Fixed `cardWidth` values (330px and 256px respectively)
- `transform: translateX()` for performance
- `.dot` or tab elements for visual state
- `currentIndex` to track position

### Responsive Behavior
CSS uses fixed widths for sliders (e.g., `.price-card` expects 240px). Resize listener reinitializes sliders—modify carefully to avoid duplicate instances.

### Header Positioning
Header is `position: fixed` with `z-index: 1000`. News banner sits inside, so changing header structure affects layout.

## Development Workflow

**No build process.** Open `index.html` directly in browser. Test all slider carousels, tab switches, and scroll behaviors manually.

**Common edits:**
- Add new `.news-item` → update `MaxIndex` logic in `NewsBanner.next()`
- Add slider cards → adjust `cardWidth` in `BenefitsSlider`/`PriceSlider`
- Modify banner text → edit `.banner-text` div in HTML, CSS handles positioning

## Key Files to Review

- **Slider logic:** Lines 48-73 (MainBanner), 161-200 (BenefitsSlider)
- **Style resets:** Lines 1-27 in [styles.css](../styles.css#L1-L27)
- **Container max-width:** `1004px` with `20px` padding (lines 34-37)
- **Color scheme:** `#ff5000` (primary orange), `#333` (text), `#fff7e2` (news bg)

## Integration Points

- **Placeholder images:** Using `placehold.co` CDN in HTML (e.g., main banner, news icons)
- **Font:** 'Pretendard Variable' system font stack
- **No external JS libraries** — everything vanilla
- **Popup disclaimer:** Simple inline popup, dismissed with button click

## Conventions

- **Korean content** throughout (header nav, banner text, alt attributes)
- **Class names:** Semantic and BEM-adjacent (`.news-container`, `.booking-tab`, `.benefits-track`)
- **Event listeners:** Always check element existence with `?.` optional chaining
- **Animations:** CSS transitions for smoothness; JS uses `setTimeout()` for async styling

