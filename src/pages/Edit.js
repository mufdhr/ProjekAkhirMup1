function Edit() {
  const { id } = useParams();
  const { says, setSays } = useContext(SayContext);
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const sayToEdit = says[id];
      if (sayToEdit) {
        setTitle(sayToEdit.title);
        setNote(sayToEdit.note);
      }
    }
  }, [id, says]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi
    if (title.trim() === '' || note.trim() === '') {
      setError('Title and Note cannot be empty!');
      return;
    }

    const newSays = [...says];
    newSays[id] = { title, note };
    setSays(newSays);
    navigate('/view');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100">
      <div className="w-full max-w-2xl p-4 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6">{id ? 'Edit Say' : 'Create Say'}</h1>
        {error && (
          <p className="mb-4 text-red-500 text-center">{error}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-lg font-semibold text-gray-700 mb-2">Subject:</label>
            <input 
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border-2 border-purple-400 rounded-md"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-lg font-semibold text-gray-700 mb-2">Note:</label>
            <textarea 
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full p-2 border-2 border-pink-400 rounded-md h-64"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-2 rounded-md font-semibold hover:bg-purple-600 transition"
          >
            {id ? 'Update' : 'Create'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Edit;
