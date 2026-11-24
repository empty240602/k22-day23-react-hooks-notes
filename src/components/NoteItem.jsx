import { memo } from "react";

export const NoteItem = memo(function NoteItem({ note, onToggleImportant }) {
  return (
    <div className="flex flex-col gap-3 bg-white shadow-sm hover:shadow-md p-4 border border-gray-200 rounded-xl transition-shadow duration-200">
      <div className="flex justify-between items-start gap-3">
        <h2 className="font-semibold text-gray-800 text-base">{note.title}</h2>

        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
            note.isImportant
              ? "bg-amber-100 text-amber-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {note.isImportant ? "Important" : "Normal"}
        </span>
      </div>

      <p className="text-gray-600 text-sm wrap-break-word leading-relaxed">
        {note.content}
      </p>

      <button
        type="button"
        onClick={() => onToggleImportant(note.id)}
        className={`self-start rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ${
          note.isImportant
            ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
            : "bg-amber-500 text-white hover:bg-amber-600"
        }`}
      >
        {note.isImportant ? "Remove Important" : "Mark Important"}
      </button>
    </div>
  );
});
