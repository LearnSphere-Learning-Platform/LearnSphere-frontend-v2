export default function NotesTab({ notes, newNote, setNewNote, handleAddNote }) {
  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold mb-4" style={{ color: '#333A2F' }}>My Notes</h3>
      <div className="space-y-4">
        {notes.map(note => (
          <div key={note.id} className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-400">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs text-gray-500 font-medium">{note.lessonTitle}</span>
              <span className="text-xs text-gray-500">{note.timestamp}</span>
            </div>
            <p className="text-sm text-gray-700">{note.content}</p>
          </div>
        ))}
        <div className="mt-4">
          <textarea
            value={newNote}
            onChange={e => setNewNote(e.target.value)}
            placeholder="Add a new note..."
            className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
          />
          <button
            onClick={handleAddNote}
            className="mt-2 px-4 py-2 rounded-md text-white font-medium hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#333A2F' }}
          >
            Add Note
          </button>
        </div>
      </div>
    </div>
  );
} 