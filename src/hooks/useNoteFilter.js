import { useState, useMemo } from "react";

export const useNoteFilter = (notes) => {
  const [keyword, setKeyword] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredNotes = useMemo(() => {
    const handleFilter = (note) => {
      const searchCondition =
        note.title.toLowerCase().includes(keyword.toLowerCase()) ||
        note.content.toLowerCase().includes(keyword.toLowerCase());
      const filterCondition = filter === "all" || note.isImportant;

      return searchCondition && filterCondition;
    };
    return notes.filter(handleFilter);
  }, [notes, keyword, filter]);

  return { keyword, setKeyword, filter, setFilter, filteredNotes };
};
