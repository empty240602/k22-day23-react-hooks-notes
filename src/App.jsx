import { useCallback, useRef, useState } from "react";
import { initialNotes } from "./data/initialNotes.js";
import { NoteInput } from "./components/NoteInput.jsx";
import { useNoteFilter } from "./hooks/useNoteFilter.js";
import { NoteItem } from "./components/NoteItem.jsx";

function App() {
  const titleInputRef = useRef(null);
  const [notes, setNotes] = useState(initialNotes);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const { keyword, setKeyword, filter, setFilter, filteredNotes } =
    useNoteFilter(notes);

  const handleAddNotes = (e) => {
    e.preventDefault();

    if (title.trim() !== "") {
      const newNote = {
        id: crypto.randomUUID(),
        title: title,
        content: content,
        isImportant: false,
      };

      setNotes((prevNote) => [...prevNote, newNote]);
      setTitle("");
      setContent("");
      titleInputRef.current.focus();
      setError("");
    } else {
      setError("Please enter your title");
      titleInputRef.current.focus();
    }
  };

  const handleToggleImportant = useCallback((id) => {
    setNotes((prevNote) => {
      const newNote = prevNote.map((note) => {
        if (note.id !== id) {
          return note;
        } else {
          return { ...note, isImportant: !note.isImportant };
        }
      });

      return newNote;
    });
  }, []);

  return (
    <div className="bg-gray-50 px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      <div className="flex flex-col gap-8 mx-auto w-full max-w-3xl">
        <header className="text-center">
          <h1 className="font-bold text-gray-900 text-3xl sm:text-4xl tracking-tight">
            My Notes
          </h1>
          <p className="mt-2 text-gray-500 text-sm">
            Keep your thoughts organized.
          </p>
        </header>

        <section className="bg-white shadow-sm p-5 sm:p-6 border border-gray-200 rounded-2xl">
          <h2 className="mb-5 font-semibold text-gray-800 text-lg">
            Create a new note
          </h2>

          <form onSubmit={handleAddNotes} className="flex flex-col gap-4">
            <NoteInput
              ref={titleInputRef}
              value={title}
              placeholder="Enter your title"
              id="title"
              title="Title"
              name="title"
              onChange={(e) => {
                setTitle(e.target.value);
                setError("");
              }}
            />

            <NoteInput
              value={content}
              placeholder="Enter your content"
              id="content"
              title="Content"
              name="content"
              onChange={(e) => setContent(e.target.value)}
            />

            {error && (
              <p className="font-medium text-red-500 text-sm">{error}</p>
            )}

            <button
              type="submit"
              className="bg-amber-600 hover:bg-amber-700 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 w-full sm:w-fit font-semibold text-white text-sm transition-colors"
            >
              + Add Note
            </button>
          </form>
        </section>

        <section className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="search"
              className="block mb-2 font-semibold text-gray-700 text-sm"
            >
              Search Notes
            </label>

            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              type="text"
              id="search"
              placeholder="Search by title or content..."
              className="bg-white px-4 py-2.5 border border-gray-300 focus:border-amber-500 rounded-lg outline-none focus:ring-2 focus:ring-amber-100 w-full text-gray-800 placeholder:text-gray-400 text-sm transition-colors"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setFilter("all")}
              type="button"
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                filter === "all"
                  ? "bg-amber-600 text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"
              }`}
            >
              All
            </button>

            <button
              onClick={() => setFilter("important")}
              type="button"
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                filter === "important"
                  ? "bg-amber-600 text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"
              }`}
            >
              Important
            </button>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-gray-800 text-lg">Your Notes</h2>

            <span className="bg-amber-100 px-3 py-1 rounded-full font-semibold text-amber-700 text-xs">
              {filteredNotes.length} Notes
            </span>
          </div>

          {filteredNotes.length > 0 ? (
            <div className="gap-4 grid grid-cols-1 sm:grid-cols-2">
              {filteredNotes.map((note) => (
                <NoteItem
                  note={note}
                  onToggleImportant={handleToggleImportant}
                  key={note.id}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white px-4 py-12 border border-gray-300 border-dashed rounded-xl text-center">
              <p className="font-medium text-gray-600 text-base">Empty Note</p>
              <p className="mt-1 text-gray-400 text-sm">
                Try another keyword or change your filter.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default App;
