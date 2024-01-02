import { useState } from 'react'
import '../App.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export default function Register() {

    const [email, setEmail] = useState('')
    const [fullname, setFullname] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setcPassword] = useState('')
    const [selectedRole, setSelectedRole] = useState('');
    const [err, setErr] = useState('')
    const navigate = useNavigate();
    const [phonemsg, setPhonemsg] = useState('')

    const signupRedirect = () => {
        navigate("/")
    }

    const handleSubmit = async (e) => {
        if (selectedRole == ''){
            setErr('Please select a role!')
        }
        e.preventDefault()
        console.log(email, password, selectedRole)
        const phoneRegex = /^[0-9]{10}$/;
        console.log(phone,phoneRegex.test(phone))
        const isPhone = (phone) => {
            if (!phoneRegex.test(phone)) {
                setPhonemsg('Invalid phone number')
                return false
            } else {
                setPhonemsg('');
                return true
            }
        }
        
        const isPass = (password,cpassword) =>{
            if (password != cpassword){
                setErr('Passwords do not match')
                return false
            } else {
                setErr('')
                return true
            }
        }
        console.log('verification: ',isPass(password,cpassword),isPhone(phone))
        if (isPhone(phone) && isPass(password,cpassword) && selectedRole != '') {
            try {
                const response = await axios.post('https://journey-api-eb2a.onrender.com/register', {
                    username: email,
                    fullname: fullname,
                    password: password,
                    phone: phone,
                    role: selectedRole,
                })
                if (response.data.success) {
                    setErr('Registration success! You will be redirected to sign in page in few seconds')
                    setTimeout(() => {
                        navigate('/')
                    }, 3000);
                } else {
                    setErr(response.data.message)
                }
            } catch (error) {
                console.error('Login failed', error);
            }
        }

    }
    return (
        <main>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-black">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-40 w-auto"
                        src="/flat.png"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 font-bold text-center text-2xl leading-9 tracking-tight text-primary">
                        Register with your details
                    </h2>
                </div>
                <div>
                    <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} className='w-max bg-gray-300 border-0 rounded mt-10'>
                        <option value="">Select a role </option>
                        <option value="journalist">Journalist</option>
                        <option value="reader">Reader</option>
                    </select>
                </div>

                <div className="opacity-1 mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit} method="POST">
                        <div>
                            <label htmlFor="email" className="block text-left text-sm font-medium leading-6 text-primary">
                                Username
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="text"
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    placeholder='Username here'
                                    className="block w-full rounded-md border-0 py-1.5 bg-gray-300 text-black ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="fullname" className="block text-left text-sm font-medium leading-6 text-primary">
                                Full name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="fullname"
                                    name="fullname"
                                    type="text"
                                    required
                                    onChange={(e) => {
                                        setFullname(e.target.value)
                                        console.log(fullname)
                                    }
                                    }
                                    value={fullname}
                                    placeholder='Full name here'
                                    className="block w-full rounded-md border-0 py-1.5 bg-gray-300 text-black ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-left text-sm font-medium leading-6 text-primary">
                                Phone number
                            </label>
                            <div className="mt-2">
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    required
                                    value={phone}
                                    placeholder='Contact here'
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 bg-gray-300 text-black ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <p className='text-red-500'>
                                    {phonemsg}
                                </p>
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
                                    placeholder='Password here'
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    className="block w-full rounded-md border-0 py-1.5 bg-gray-300 text-black ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="cpassword" className="block text-sm font-medium leading-6 text-primary">
                                    Confirm Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="cpassword"
                                    name="cpassword"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    placeholder='Password here'
                                    onChange={(e) => setcPassword(e.target.value)}
                                    value={cpassword}
                                    className="block w-full rounded-md border-0 py-1.5 bg-gray-300 text-black ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full transition-colors duration-200 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Register
                            </button>
                        </div>
                    </form>
                    <p className='text-red-500' >
                        {err}
                    </p>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        already a member?{' '}
                        <button onClick={signupRedirect} className="font-semibold leading-6 transition-colors text-indigo-600 hover:text-indigo-500">
                            sign in here
                        </button>
                    </p>
                </div>
            </div>
        </main>
    )
}

