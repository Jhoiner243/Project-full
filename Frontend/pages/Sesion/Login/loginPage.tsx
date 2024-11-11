import { Login } from "./login"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex flex-col justify-between">
      <header className="p-4">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-gray-800">YourApp</h2>
        </div>
      </header>
      
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
            <div className="p-8">
              <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Welcome Back</h1>
              <Login />
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">
                      Or continue with
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Github
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Google
                  </button>
                </div>
              </div>
            </div>
            <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="p-4 text-center text-gray-600">
        <p>&copy; 2023 YourApp. All rights reserved.</p>
      </footer>
    </div>
  )
}