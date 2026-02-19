import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold tracking-tight text-green-500">
          HACK R3P0RT
        </h1>
        <p className="text-gray-400 text-lg">
          Zero-Knowledge Pentest Reporting Environment
        </p>
        <div className="pt-4 border-t border-gray-800">
          <span className="text-sm font-mono text-gray-500">Status: Client Initialized Securely</span>
        </div>
      </div>
    </div>
  );
}

export default App;