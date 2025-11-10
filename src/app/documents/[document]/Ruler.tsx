import { useStorage, useMutation } from "@liveblocks/react/suspense";
import { root } from "postcss";
import React, { useRef, useState } from "react";

import { FaCaretDown } from "react-icons/fa";
const markers = Array.from({ length: 83 }, (_, i) => i);
const Ruler = () => {
  const leftMargin = useStorage((root) => root.leftMargin);
  const rightMargin = useStorage((root) => root.rightMargin);
  const SetLeftMargin = useMutation(({ storage }, margin: number) => {
    storage.set("leftMargin", margin);
  }, []);

  const SetRightMargin = useMutation(({ storage }, margin: number) => {
    storage.set("rightMargin", margin);
  }, []);

  const [isDraggingLeft, setIsDraggingLeft] = useState(false);
  const [isDraggingRight, setIsDraggingRight] = useState(false);

  const rulerRef = useRef<HTMLDivElement>(null);

  const handleLeftMouseDown = () => {
    setIsDraggingLeft(true);
  };

  const handleRightMouseDown = () => {
    setIsDraggingRight(true);
  };
  const handleMouseUp = () => {
    setIsDraggingLeft(false);
    setIsDraggingRight(false);
  };

  const handleLeftDoubleClick = () => {
    SetLeftMargin(56);
  };
  const handleRightDoubleClick = () => {
    SetRightMargin(56);
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if ((isDraggingLeft || isDraggingRight) && rulerRef.current) {
      const container = rulerRef.current.querySelector("#ruler-container");

      if (container) {
        const containerRect = container.getBoundingClientRect();
        const relativeX = event.clientX - containerRect.left;
        const rawPosition = Math.max(0, Math.min(816, relativeX));
        if (isDraggingLeft) {
          const maxLeftPosition = 816 - rightMargin - 100;
          const newLeftPosition = Math.min(maxLeftPosition, rawPosition);
          SetLeftMargin(newLeftPosition);
        } else if (isDraggingRight) {
          const maxRightPosition = 816 - (leftMargin + 100);
          const newRightPosition = Math.max(816 - rawPosition, 0);

          const constrainedRightPosition = Math.min(
            newRightPosition,
            maxRightPosition
          );
          SetRightMargin(constrainedRightPosition);
        }
      }
    }
  };

  return (
    <div
      className=" h-6 border-b border-gray-300 flex select-none items-end print:hidden"
      ref={rulerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div
        className=" max-w-[816px] mx-auto relative h-full w-full "
        id="ruler-container"
      >
        <Marker
          position={leftMargin}
          isLeft={true}
          isDragging={isDraggingLeft}
          onMouseDown={handleLeftMouseDown}
          onDoubleClick={handleLeftDoubleClick}
        />

        <Marker
          position={rightMargin}
          isLeft={false}
          isDragging={isDraggingRight}
          onMouseDown={handleRightMouseDown}
          onDoubleClick={handleRightDoubleClick}
        />
        <div className="absolute inset-0 h-full">
          <div className="relative h-full w-[816px]">
            {markers.map((marker, index) => {
              const position = (marker * 816) / 83;
              return (
                <div
                  key={index}
                  className="absolute bottom-0"
                  style={{ left: `${position}px` }}
                >
                  {marker % 10 === 0 && (
                    <div className="h-2 w-[1px] rounded-full bg-neutral-500 " />
                  )}

                  {marker % 10 === 0 && (
                    <span className="absolute bottom-2 text-[10px] transform -translate-x-1/2">
                      {marker / 10 + 1}
                    </span>
                  )}

                  {marker % 5 === 0 && marker % 10 !== 0 && (
                    <div className="h-1.5 w-[1px] rounded-full bg-neutral-500 " />
                  )}
                  {marker % 5 !== 0 && (
                    <div className="h-1 w-[1px] rounded-full bg-neutral-500 " />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ruler;

interface MarkerProps {
  position: number;
  isLeft: boolean;
  isDragging: boolean;
  onMouseDown: () => void;
  onDoubleClick: () => void;
}

const Marker = ({
  position,
  isLeft,
  isDragging,
  onMouseDown,
  onDoubleClick,
}: MarkerProps) => {
  return (
    <div
      className="absolute top-0 w-4 h-full cursor-ew-resize z-10"
      onMouseDown={onMouseDown}
      onDoubleClick={onDoubleClick}
      style={{
        [isLeft ? "left" : "right"]: `${position}px`,
      }}
    >
      <FaCaretDown className=" absolute -left-1/2 top-0 fill-blue-500" />
      <div
        className="absolute bg-blue-700 w-[2px] top-4"
        style={{
          display: `${isDragging ? "block" : "none"}`,
          height: "100vh",
        }}
      ></div>
    </div>
  );
};
