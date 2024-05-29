import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";

function App() {
  const { pathname } = useLocation();
  const [tab, setTab] = useState(pathname);

  const b = `acive text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-50`;
  const g = `hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300`;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="border-b border-gray-200 dark:border-gray-700">
        <ul
          className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400 "
          data-tabs-toggle="#default-tab-content"
          role="tablist"
        >
          <li className="me-2">
            <Link
              className={`inline-flex items-center justify-center p-4  group ${
                tab === "/workout" ? b : g
              }`}
              to={`/workout`}
              onClick={() => {
                setTab("/workout");
              }}
            >
              <svg
                className={`w-4 h-4 me-2 ${
                  tab === "workout" ? "dark:text-blue-500" : ""
                } `}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 18"
              >
                <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
              </svg>
              Workout
            </Link>
          </li>
          <li className="me-2">
            <Link
              className={`inline-flex items-center justify-center p-4 group ${
                tab === "/routine" ? b : g
              }`}
              to={`/routine`}
              onClick={() => {
                setTab("/routine");
              }}
            >
              <svg
                className={`w-4 h-4 me-2 ${
                  tab === "/routine" ? "dark:text-blue-500" : ""
                } `}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M5 11.424V1a1 1 0 1 0-2 0v10.424a3.228 3.228 0 0 0 0 6.152V19a1 1 0 1 0 2 0v-1.424a3.228 3.228 0 0 0 0-6.152ZM19.25 14.5A3.243 3.243 0 0 0 17 11.424V1a1 1 0 0 0-2 0v10.424a3.227 3.227 0 0 0 0 6.152V19a1 1 0 1 0 2 0v-1.424a3.243 3.243 0 0 0 2.25-3.076Zm-6-9A3.243 3.243 0 0 0 11 2.424V1a1 1 0 0 0-2 0v1.424a3.228 3.228 0 0 0 0 6.152V19a1 1 0 1 0 2 0V8.576A3.243 3.243 0 0 0 13.25 5.5Z" />
              </svg>
              Routine
            </Link>
          </li>
        </ul>
      </div>

      <Outlet />
    </div>
  );
}

export default App;
