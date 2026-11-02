import Link from "next/link";

function NotFound() {
  return (
    <div className="flex justify-center h-screen items-center  text-app-primary">
      <div className="text-center">
        <h1 className="m-0 text-7xl font-bold tracking-tight sm:text-8xl">
          404
        </h1>
        <h2 className="mb-4 mt-3 text-2xl font-semibold sm:text-3xl">
          Page not found
        </h2>
        <p className="mb-6">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link href="/" className="underline hover:text-app-primary">
          Go back home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
