const BookCard = ({ data, handleModal, handleRead, handleEditModal }) => {
  return (
    <div className="d-flex justify-content-between align-items-center border shadow rounded p-3 mt-5">
      <div>
        <h5 className={data.isRead ? "text-decoration-line-through" : ""}>
          {data.title}
        </h5>
        <p>{new Date(data.date).toLocaleString()}</p>
      </div>
      <div className="btn-group">
        <button className="btn btn-danger" onClick={() => handleModal(data.id)}>
          Delete
        </button>
        <button
          onClick={() => handleEditModal(data)}
          className="btn btn-primary"
        >
          Edit
        </button>
        <button onClick={() => handleRead(data)} className="btn btn-success">
          {data.isRead ? "Read " : "Not Read"}
        </button>
      </div>
    </div>
  );
};

export default BookCard;
