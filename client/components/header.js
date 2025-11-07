import Link from "next/link";

export default ({currentUser}) => {
    return <nav className="navbar navbar-light bg-light">
        <Link className="navbar-brand" href="/">
            GitTix
        </Link>
    </nav>
};