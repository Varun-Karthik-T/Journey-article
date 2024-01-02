import { useState } from 'react'
import './App.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export default function App() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [selectedRole, setSelectedRole] = useState();
  const [err, setErr] = useState('')
  const navigate = useNavigate();

  const registerRedirect = () => {
    navigate("/register")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(email, password, selectedRole)
    try {
      const response = await axios.post('https://journey-api-eb2a.onrender.com/login', {
        username: email,
        password: password,
        role: selectedRole,
      })
      console.log(response.data);
      console.log(response.data.role)
      if (response.data.success) {
        if (response.data.role == 'editor') {
          navigate("/editor")
        } else if (response.data.role == 'journalist') {
          navigate("/journalist")
        } else if (response.data.role == 'reader') {
          navigate("/reader")
        } else {
          setErr('Please select a role!')
        }
      } else {
        setErr('Login failed, check your credentials!')
      }
    } catch (error) {
      console.error('Login failed', error);
    }

  }
  return (
    <main>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-40 w-auto"
            src="/flat.png"
            alt="Your Company"
          />
          <h2 className="mt-10 font-bold text-center text-2xl leading-9 tracking-tight text-primary">
            Sign in to your account
          </h2>
        </div>


        <div className="opacity-1 mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit} method="POST">
            <div>
              <select value={selectedRole} required onChange={(e) => setSelectedRole(e.target.value)} className='w-max transition-colors duration-150 border-0 rounded mt-10 bg-gray-300 hover:bg-gray-50'>
                <option value="">Select a role </option>
                <option value="editor">Editor</option>
                <option value="journalist">Journalist</option>
                <option value="reader">Reader</option>
              </select>
            </div>
            <div>
              <label htmlFor="email" className="block text-left text-sm font-medium leading-6 text-primary">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  placeholder='Username here'
                  className="block bg-gray-300 w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-primary">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder='Password here'
                  className="block w-full rounded-md border-0 py-1.5 bg-gray-300 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
          <p className='text-red-500' >
            {err}
          </p>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <button onClick={registerRedirect} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Register here
            </button>
          </p>
        </div>
      </div>
    </main>
  )
}

