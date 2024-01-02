import React from "react";

export default function Comment({ user, text }) {
  return (
    <div className="bg-[#555558] p-4 mb-4 rounded-lg">
      <p className="text-lg font-semibold">@{user}</p>
      <p className="text-gray-800">{text}</p>
    </div>
  );
}