# 🔍 Web Dev Search Engine

A powerful and intuitive search engine built specifically for web development problems and solutions. This project was created for the AZ Hackathon and provides a seamless way to discover, search, and browse web development resources.

---

## ✨ Features

- **Fast Search & Autocomplete** - Intelligent autocomplete suggestions as you type
- **Web Scraping** - Automated data collection and indexing of web development problems
- **Responsive UI** - Beautiful, user-friendly interface optimized for all devices
- **Problem Database** - Comprehensive collection of web development problems and solutions
- **Real-time Results** - Instant search results with relevant information
- **Clean Architecture** - Well-organized code structure with separation of concerns

---

## 📁 Project Structure

```
webDevSearchEngine/
├── homePage.html          # Main landing page
├── resultsPage.html       # Search results display page
├── autocomplete.js        # Autocomplete functionality
├── scrapeLogic.js         # Web scraping logic
├── script.js              # Main application logic
├── index.js               # Entry point / Server setup
├── styles.css             # Global styling
├── package.json           # Project dependencies
├── package-lock.json      # Dependency lock file
├── allProblemsData/       # Complete dataset of problems
├── problems/              # Individual problem files
├── utils/                 # Utility functions
└── .gitIgnore             # Git ignore rules
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v12.0.0 or higher)
- **npm** (comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/dipender-singh/webDevSearchEngine.git
   cd webDevSearchEngine
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```
   or
   ```bash
   node index.js
   ```

4. **Open in browser**
   - Navigate to `http://localhost:3000` (or the port specified in your index.js)
   - Start searching for web development problems!

---

## 📖 Usage

### Home Page
- Visit the home page to access the main search interface
- Use the search bar with autocomplete suggestions
- Browse popular or recent problems

### Search
- Type any web development problem or keyword
- Get real-time suggestions via autocomplete
- Press Enter or click Search to view results

### Results
- View comprehensive results with problem details
- Click on any result for more information
- Related problems are suggested

---

## 🛠️ Technologies Used

- **Frontend**
  - HTML5
  - CSS3
  - JavaScript (Vanilla)
  
- **Backend**
  - Node.js
  - Express.js 
  
- **Data**
  - Web Scraping
  - JSON-based problem database

---

## 📊 Key Components

### `autocomplete.js`
Provides intelligent autocomplete functionality for the search interface. Matches user input against the problem database in real-time.

### `scrapeLogic.js`
Handles web scraping to collect and index web development problems from various sources. Keeps the database updated with new content.

### `script.js`
Core application logic managing:
- Search functionality
- Results filtering
- User interactions
- DOM manipulation

### `index.js`
Server setup and routing:
- Express server initialization
- API endpoints
- Static file serving

---

## 📝 Example Usage

```javascript
// Example: Search for JavaScript closures
const query = "javascript closures";
// The engine will return relevant problems, articles, and resources
```

---

## 🎯 Features in Detail

### Search Functionality
- Full-text search across problem database
- Filter by difficulty level
- Sort by relevance, date, or popularity
- Category-based navigation

### Autocomplete
- Real-time suggestions as user types
- Powered by problem titles and keywords
- Optimized for performance with debouncing

### Web Scraping
- Automated collection of web dev problems
- Data validation and cleaning
- Regular updates to problem database

---

## 🔧 Configuration

To modify the server port, edit `index.js`:

```javascript
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

## 📚 Data Structure

Problems are stored with the following structure:
```json
{
  "id": "unique-identifier",
  "title": "Problem Title",
  "description": "Detailed problem description",
  "category": "JavaScript | CSS | HTML | etc.",
  "difficulty": "Beginner | Intermediate | Advanced",
  "solutions": [],
  "tags": ["tag1", "tag2"],
  "source": "source-url"
}
```

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a new branch (`git checkout -b feature/amazing-feature`)
3. **Make** your changes
4. **Commit** your work (`git commit -m 'Add amazing feature'`)
5. **Push** to the branch (`git push origin feature/amazing-feature`)
6. **Open** a Pull Request

### Areas for Contribution
- Adding new problem categories
- Improving search algorithms
- Enhancing UI/UX
- Optimizing web scraper
- Adding more data sources
- Writing tests
- Documentation improvements

---

## 🐛 Known Issues

- List any known issues here
- Feature requests are welcome

---

## 📝 License

This project is open source and available under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- **AZ Hackathon** - The event that inspired this project
- **Web Development Community** - For the problems and solutions

---

## 📧 Contact

**Dipender Singh**
- GitHub: [@dipender-singh](https://github.com/dipender-singh)
- Email: deepandera1@gmail.com

For questions or suggestions, feel free to open an issue on the GitHub repository.

---

## 🎓 Learning Resources

If you're interested in building similar projects, check out:
- [Node.js Documentation](https://nodejs.org/docs/)
- [Express.js Guide](https://expressjs.com/)
- [Web Scraping Best Practices](https://docs.python-requests.org/)
- [Search Engine Algorithms](https://en.wikipedia.org/wiki/Search_engine)

---

**Last Updated:** May 2026  
**Status:** Active Development
