import React, { useEffect, useRef, useState } from "react";
import ArticleIcon from '@mui/icons-material/Article';
import "./App.css";

import { fetchNotesAPI } from "./service/fetchApi";
import mqtt from "mqtt";

const client = mqtt.connect("wss://broker.hivemq.com:8884/mqtt");
function App() {
  interface Note {
    content: string;
    createdAt: number;
  }
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalPages, setTotalPages] = useState(0); 
  const listRef = useRef<HTMLUListElement>(null);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const data = await fetchNotesAPI(page);

      if (data.currentPage >= data.totalPages) {
        setHasMore(false); 
        console.log("No more data to load.");
      }

     
      setTotalPages(data.totalPages);

    
      setNotes((prev) => [...prev, ...data.data]);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNote = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newNote.trim()) {
      
      client.publish("task/new", JSON.stringify({ content: newNote }));
      setNewNote("");
      const newNoteObj = { content: newNote, createdAt: Date.now() };
      setNotes((prev) => [newNoteObj, ...prev]);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [page]);

  const handleScrollInfinite = () => {
    const container = listRef.current;
    if (!container || loading || !hasMore) return; 
    const { scrollTop, scrollHeight, clientHeight } = container;
    if (scrollTop + clientHeight >= scrollHeight - 50) {
      if (page < totalPages) {
        
        setPage((prev) => prev + 1); 
      }
    }
  };

  useEffect(() => {
    client.on("connect", () => {
      console.log("✅ Frontend connected to MQTT");
    });

    client.subscribe("task/update", (err) => {
      if (!err) {
        console.log("👂 Subscribed to task.update");
      }
    });

    client.on("message", (topic, message) => {
      if (topic === "task.update") {
        try {
          const updatedTasks = JSON.parse(message.toString());
          setNotes(updatedTasks);
        } catch (e) {
          console.error("Failed to parse message", e);
        }
      }
    });
  }, []);
  

  return (
    <div className="w-full bg-white absolute top-0 bottom-0 sm:bottom-0 left-0 right-0 flex items-center justify-center">
      <div className="lg:w-[30vw] sm:w-[80%] p-2 mx-auto rounded-lg shadow-md overflow-hidden">
       
        <div className="flex items-center gap-2">
    <ArticleIcon sx={{ color: 'rgb(138, 75, 56)', fontSize: '2rem' }} />
    <h1 className="text-[#1F2937] text-xl sm:text-2xl md:text-3xl font-bold">Note App</h1>
  </div>

        
        <div className="border-gray-300 shadow-sm rounded-b-2xl-lg p-4">
          <div className="flex items-center justify-between gap-x-2">
            <input
              type="text"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="New note..."
              className="px-3 w-full py-2 text-black border-gray-300 outline-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />

            <button
              onClick={(e: any) => handleAddNote(e)}
              onKeyDown={(e: any) => handleAddNote(e)}
              className="flex gap-x-2 items-center transition bg-[#92400E] hover:bg-[#6a5fad] text-white font-semibold py-2 px-4 rounded"
              disabled={!newNote.trim()}
            >
            <span className="text-white text-lg flex items-center gap-1">
              <span className="text-white text-xxl ">+</span>
                  Add
                    </span>

            </button>
          </div>
        </div>

       
        <div className="p-4">
          <h2 className="text-lg font-semibold text-black mb-3 text-left">
            Notes
          </h2>
          <ul
            className="space-y-2 overflow-auto max-h-[30vh] custom-scroll"
            ref={listRef}
            onScroll={handleScrollInfinite}
          >
            {loading
              ? 
                Array.from({ length: 3 }).map((_, index) => (
                  <li
                    key={index}
                    className="p-3 bg-gray-200 animate-pulse rounded-md"
                  >
                    <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  </li>
                ))
              : 
                notes?.map((note, index: number) => (
                  <li
                    key={index}
                    className="p-3 text-black bg-gray-50 hover:bg-gray-100 cursor-pointer transition border-b-1 text-left"
                  >
                    {note?.content}
                  </li>
                ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
