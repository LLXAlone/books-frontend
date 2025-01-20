import React, { useState } from "react";
import "./App.css"; // Import the CSS file

const App: React.FC = () => {
  const [books, setBooks] = useState<any[]>([]);

  const loadBooks = async () => {
    try {
      const response = await fetch("http://localhost:5202/api/books");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const text = await response.text();
      const parser = new DOMParser();
      const xml = parser.parseFromString(text, "application/xml");

      // Parse XML into an array of book objects
      const booksArray: any[] = Array.from(xml.getElementsByTagName("book")).map(
        (book) => ({
          id: book.getElementsByTagName("id")[0]?.textContent,
          title: book.getElementsByTagName("title")[0]?.textContent,
          author: book.getElementsByTagName("author")[0]?.textContent,
          price: book.getElementsByTagName("price")[0]?.textContent,
        })
      );
      setBooks(booksArray);
    } catch (error) {
      console.error("Failed to load books:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="header">Book List</h1>
      <button className="button" onClick={loadBooks}>
        Load Books
      </button>
      <table className="table">
        <thead>
          <tr>
            <th className="th">ID</th>
            <th className="th">Title</th>
            <th className="th">Author</th>
            <th className="th">Price</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id} className="tr">
              <td className="td">{book.id}</td>
              <td className="td">{book.title}</td>
              <td className="td">{book.author}</td>
              <td className="td">{book.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
