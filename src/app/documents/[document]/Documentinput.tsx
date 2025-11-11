"use client";
import { useMutation } from "convex/react";
import { useState, useEffect, useCallback } from "react";
import { BsCloudCheck } from "react-icons/bs";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { Cloud, Loader2 } from "lucide-react";
import { useStatus } from "@liveblocks/react";

interface DocumentInputProps {
  title: string;
  id: Id<"documents">;
}

const DocumentInput = ({ title, id }: DocumentInputProps) => {
  const renameDocument = useMutation(api.document.renameById);
  const status = useStatus();

  const [isEditing, setIsEditing] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(title ?? "Untitled");
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">(
    "idle"
  );

  const showLoader =
    status === "connecting" ||
    status === "reconnecting" ||
    saveStatus === "saving";
  // Debounce timer
  const DEBOUNCE_DELAY = 600; // ms

  const saveTitle = useCallback(
    async (newTitle: string) => {
      if (!newTitle.trim()) return;
      try {
        setSaving(true);
        setSaveStatus("saving");
        await renameDocument({ id, title: newTitle });
        setSaveStatus("saved");
      } catch (err) {
        console.error("Error updating title:", err);
      } finally {
        setSaving(false);
        // Reset status after a short delay
        setTimeout(() => setSaveStatus("idle"), 1500);
      }
    },
    [id, renameDocument]
  );

  // Debounced auto-save when user stops typing
  useEffect(() => {
    if (!isEditing) return;
    const handler = setTimeout(() => {
      if (currentTitle.trim() !== "") {
        saveTitle(currentTitle);
      }
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(handler);
  }, [currentTitle, isEditing, saveTitle]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      (e.target as HTMLInputElement).blur();
      setIsEditing(false);
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (currentTitle.trim() === "") setCurrentTitle("Untitled");
  };

  return (
    <div className="flex gap-2 items-center">
      {isEditing ? (
        <input
          autoFocus
          type="text"
          value={currentTitle}
          onChange={(e) => setCurrentTitle(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="text-lg font-semibold bg-transparent border-2 rounded-lg px-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-all px-1 min-[180px]"
        />
      ) : (
        <span
          className="text-lg font-semibold cursor-text truncate"
          onClick={() => setIsEditing(true)}
          title="Click to edit title"
        >
          {currentTitle}
        </span>
      )}

      {/* Status Indicator */}
      <div className="relative w-6 h-6 flex items-center justify-center">
        {showLoader ? (
          <>
            <Cloud size={24} className="text-gray-400" />
            <Loader2
              size={10}
              className="absolute top-[9px] animate-spin text-blue-500"
              strokeWidth={2}
            />
          </>
        ) : (
          <BsCloudCheck size={24} className="text-green-500" />
        )}
      </div>
    </div>
  );
};

export default DocumentInput;
