export default function Loading() {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex space-x-2 items-center">
          {/* Spinner */}
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          {/* Texto "Loading..." */}
          <p className="text-lg font-semibold text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  