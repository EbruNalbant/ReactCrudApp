const EditModal = ({
  editingItem,
  setEditingItem,
  setShowEdit,
  updateItem,
}) => {
  return (
    <div className="delete-modal">
      <div className="modal-inner">
        <h5>Edit the Title of the Book</h5>
        <input
          value={editingItem.title}
          className="form-control shadow"
          type="text"
          onChange={(e) =>
            setEditingItem({
              ...editingItem,
              title: e.target.value,
              date: new Date(),
            })
          }
        />
        <div className="d-flex justify-content-between mt-4">
          <button
            onClick={() => setShowEdit(false)}
            className="btn btn-warning"
          >
            Cancel
          </button>
          <button onClick={() => updateItem()} className="btn btn-success">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
