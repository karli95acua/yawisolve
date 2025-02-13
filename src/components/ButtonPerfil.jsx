import { useState, useEffect } from "react";

export default function ButtonPerfil() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("userId");
      if (storedUserId) {
        setUserId(storedUserId);
      }
    }
  }, []);

  return (
    <a
      href={userId ? `/user/${userId}` : "#"}
      className={`flex items-center justify-center w-12 h-12 mr-8 rounded-full transition ${
        userId ? "bg-gray-200 hover:bg-gray-300 cursor-pointer" : "bg-gray-400 cursor-not-allowed"
      }`}
    >
      <svg
        className="w-10 h-10 text-gray-800"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          fillRule="evenodd"
          d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
          clipRule="evenodd"
        />
      </svg>
    </a>
  );
}



