import { v4 as getPass } from "uuid";
import { useState } from "react";
import BookCard from "./components/BookCard";
import DeleteModal from "./components/DeleteModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditModal from "./components/EditModal";

function App() {
  const [books, setBooks] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // submit form event
  const handleSubmit = (e) => {
    e.preventDefault();
    //access to book name
    const title = e.target[0].value;

    //confirm the book name
    if (!title) {
      toast.warning("PLease, enter name of the book", { autoClose: 1500 });
      return;
    }
    //object of the book
    const newBook = {
      id: getPass(),
      title,
      date: new Date(),
      isRead: false,
    };
    //created object, transfer to array of the books
    setBooks([newBook, ...books]);
    //clear the input
    e.target[0].value = "";

    //alert
    toast.success("The book has just been added", { autoClose: 1500 });
  };

  // function for delete of modal
  const handleModal = (id) => {
    //cleared id of the object, transfer to state
    setDeleteId(id);
    // show the modal
    setShowDelete(true);
  };
  // function for deletion operation
  const handleDelete = () => {
    const filtered = books.filter((book) => book.id !== deleteId);
    setBooks(filtered);
    setShowDelete(false);
    //alert
    toast.error("The book has just been deleted", { autoClose: 1500 });
  };

  //function for read button
  const handleRead = (editItem) => {
    const updated = { ...editItem, isRead: !editItem.isRead };
    //update item in the array
    const newBooks = books.map((item) =>
      item.id !== updated.id ? item : updated
    );
    setBooks(newBooks);
  };

  // edit the title of the book
  const handleEditModal = (item) => {
    setShowEdit(true);
    setEditingItem(item);
  };

  // update the item
  const updateItem = () => {
    //update the item of the array
    const newBooks = books.map((book) =>
      book.id !== editingItem.id ? book : editingItem
    );
    //update the state
    setBooks(newBooks);
    //close the edit modal
    setShowEdit(false);
    //alert
    toast.info("The book has just been updated", { autoClose: 1500 });
  };

  return (
    <div className="App">
      <header className="bg-dark text-light py-2 fz-5 text-center">
        <h1>Bookworm</h1>
      </header>
      <main className="container">
        {/* form part */}
        <form onSubmit={handleSubmit} className="d-flex gap-3 mt-4 p-4">
          <input
            className="form-control shadow "
            type="text"
            placeholder="type the book name"
          />
          <button className="btn btn-warning shadow">Add</button>
        </form>
        {/* if books array part empty */}
        {books.length === 0 && (
          <h4 className="mt-5 text-center">No books have been added yet.</h4>
        )}
        {/* if books array part full */}
        {books.map((book) => (
          <BookCard
            key={book.id}
            handleModal={handleModal}
            data={book}
            handleRead={handleRead}
            handleEditModal={handleEditModal}
          />
        ))}
      </main>
      {/* Modal part */}
      {showDelete && (
        <DeleteModal
          setShowDelete={setShowDelete}
          handleDelete={handleDelete}
        />
      )}
      {showEdit && (
        <EditModal
          editingItem={editingItem}
          setShowEdit={setShowEdit}
          setEditingItem={setEditingItem}
          updateItem={updateItem}
        />
      )}
      {/* for alerts */}
      <ToastContainer />
    </div>
  );
}

export default App;
