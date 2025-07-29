# Game Score Tracker App – Learning Roadmap

A personal guide to help you build a simple web-based game score tracker using HTML, CSS, Bootstrap, and JavaScript.

---

## ✅ App Features

- Scoreboard showing all participants and their points.
- Game history list displaying all game sessions with data.
- Edit functionality for each game via a popup/modal window.
- Responsive layout using Bootstrap.
- Persistent data storage using browser localStorage.

---

## 🔧 Skills & Topics to Learn

### 1. 🖼️ Front-End (HTML + CSS + Bootstrap)
- Bootstrap layout components:
  - Grid system (`row`, `col`)
  - Cards or tables
  - Buttons and modals
- Bootstrap Modals: [Bootstrap Modal Docs](https://getbootstrap.com/docs/5.3/components/modal/)
- Custom CSS for spacing, colors, and hover effects

### 2. ⚙️ JavaScript (Main Functionality)
- DOM Manipulation:
  - `document.querySelector`, `.addEventListener`, `.innerHTML`, etc.
- Event Handling:
  - Add click listeners to buttons
- Arrays and Objects:
  - Example:
    ```js
    const players = [{ name: "Alice", points: 10 }];
    const games = [{ id: 1, player: "Alice", score: 5, date: "..." }];
    ```
- Updating Data:
  - Edit and update player scores and game data
- Bootstrap Modal Integration with JavaScript
- Local Storage:
  ```js
  localStorage.setItem("games", JSON.stringify(games));
  const storedGames = JSON.parse(localStorage.getItem("games"));
  ```

### 3. 📁 Data Management

#### Option A: localStorage (Recommended for Now)
- Store data in browser.
- No backend needed.
- Good for testing and simple apps.

#### Option B: SQL (For Later)
- Only needed if the app needs a backend or database for sharing.
- Learn SQL and Node.js after finishing the core app.

#### Option C: CSV Export/Import (Optional)
- Export games data as CSV using JavaScript.
- Not used as the main data store.

---

## 🗓 Learning Timeline

### Week 1: Layout + JavaScript Basics
- Learn Bootstrap grid + modals
- JavaScript: selectors, events, arrays/objects

### Week 2: Core Functionality
- Add players and games to UI
- Show game history and scoreboard
- Save data using localStorage

### Week 3: Editing Features
- Open modals with existing game data
- Save edited data and update UI

### Week 4: Polish and Explore Further
- Input validation
- CSV export (optional)
- Explore backend with Node.js and SQL (optional)

---

## 🎯 Summary

- Don’t worry about SQL yet.
- Focus on: Bootstrap layout, JavaScript logic, DOM/events, localStorage.
- Build in small steps. Learn while doing.
