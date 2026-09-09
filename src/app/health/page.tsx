export default async function HealthCheck() {
  let status = "Loading...";
  let data = null;
  let error = null;

  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos/1', {
      cache: 'no-store', // ensure we fetch on every request for health check
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch status: ${res.status}`);
    }
    data = await res.json();
    status = "Healthy";
  } catch (err: any) {
    status = "Unhealthy";
    error = err.message;
  }

  return (
    <div className="flex flex-col items-start gap-4">
      <h1 className="text-3xl font-bold">Health Check</h1>
      
      <div className="p-6 border rounded-lg shadow-sm bg-gray-50 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <span className="font-semibold text-gray-700">Status:</span>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${status === 'Healthy' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {status}
          </span>
        </div>
        
        {data && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">Fetched Data:</h3>
            <pre className="text-xs bg-gray-800 text-gray-100 p-3 rounded overflow-x-auto">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        )}
        
        {error && (
          <div className="mt-4 pt-4 border-t border-gray-200 text-red-600 text-sm">
            <h3 className="font-semibold mb-1">Error Details:</h3>
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
