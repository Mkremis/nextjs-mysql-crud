import Link from "next/link";

function NavBar() {
  return (
    <nav className="bg-zinc-900 text-white py-3 mb-3">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <h3 className="text-3xl font-bold">NextMySQL</h3>
        </Link>
        <ul>
          <li>
            <Link
              href="/new"
              className="text-sky-500 hover:text-sky-700 px-3 py-2 rounded-md transition-all duration-300 ease-in-out"
            >
              New
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
