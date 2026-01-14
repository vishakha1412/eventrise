import React, { useState } from "react";
const ExpandableText = ({ text }) => {
  const [expanded, setExpanded] = useState(false);
  const maxChars = 300;

  const isLong = text.length > maxChars;
  const displayText = expanded ? text : text.slice(0, maxChars);

  return (
    <div className="text-gray-800 text-sm">
      <p className={expanded ? "whitespace-pre-wrap" : "line-clamp-[6]"}>
        {text}
      </p>
      {text.length > 300 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-purple-500 hover:underline mt-1 text-xs"
        >
          {expanded ? "Read less" : "Read more"}
        </button>
      )}
    </div>

  );
};

export default ExpandableText;
