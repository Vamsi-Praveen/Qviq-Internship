import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../components/Input'
import { loginWithEmailPassword, loginWithGoogle } from '../utils/firebase'
import axios from 'axios'
import useAuth from '../hooks/useAuth'
import usePersistent from '../hooks/usePersistent'
const Login = () => {
    const navigate = useNavigate()
    const imageRef = useRef()
    const { setPersistentItem } = usePersistent()
    const { setUserId, setUser, setToken } = useAuth()
    const [loading, setLoading] = useState(false)
    const handleLoginWithGoogle = async () => {
        try {
            const googleUser = await loginWithGoogle()
            if (googleUser?.user) {
                console.log(googleUser?.user)
                const isUserExist = await axios.post('http://localhost:4000/api/get-user-email', { email: googleUser?.user?.email })
                console.log(isUserExist?.data)
                setToken(googleUser?.user?.accessToken)
                if (isUserExist?.data?.data) {
                    setUserId(isUserExist?.data?.data?._id)
                    setUser(isUserExist?.data?.data)
                    setPersistentItem('token', googleUser?.user?.accessToken)
                    setPersistentItem('userId', isUserExist?.data?.data?._id)
                    toast.success('Login Success')
                    setLoading(false)
                    return navigate(`/`)
                }
                else {
                    await axios.post('http://localhost:4000/api/register-user', {
                        email: googleUser?.user?.email,
                        fullName: googleUser?.user?.displayName,
                        phone: googleUser?.user?.phoneNumber,
                        profilePic: googleUser?.user?.photoURL,
                        password: ''
                    })
                        .then((data) => {
                            console.log(data)
                            setUserId(data?.data?.data?._id)
                            setUser(data?.data?.data)
                            setPersistentItem('token', googleUser?.user?.accessToken)
                            setPersistentItem('userId', data?.data?.data?._id)
                            toast.success('Login Success')
                            setLoading(false)
                            return navigate(`/`)
                        })
                }


            }
        } catch (error) {
            console.log(error)
            return toast.error('Error Occured')
        }
    }

    const [loginDetails, setLoginDetails] = useState({
        email: '',
        password: ''
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleLogin = async () => {
        try {
            setLoading(true)
            const userData = await loginWithEmailPassword(loginDetails.email, loginDetails.password)
            if (userData.code === 'auth/invalid-email' || userData.code === 'auth/user-not-found') {
                setLoading(false)
                return toast.error('Invalid username or email');
            } else if (userData.code === 'auth/wrong-password') {
                setLoading(false)
                return toast.error('Invalid password');
            }
            else if (userData.code === 'auth/invalid-credential') {
                setLoading(false)
                return toast.error('Invalid Credentials');
            }
            else if (userData.code === 'auth/too-many-requests') {
                setLoading(false)
                return toast.error('Too many Attempts, Try Again');
            }
            if (userData?.user) {
                console.log(userData?.user)
                setToken(userData?.user?.accessToken)
                await axios.post('http://localhost:4000/api/get-user-email', {
                    email: loginDetails.email
                })
                    .then((data) => {
                        setUserId(data?.data?.data?._id)
                        setUser(data?.data?.data)
                        setPersistentItem('token', userData?.user?.accessToken)
                        setPersistentItem('userId', data?.data?.data?._id)
                        toast.success('Login Success')
                        setLoading(false)
                        return navigate(`/`)
                    })

            }
        } catch (error) {
            console.log(error)
            return toast.error('Error Occured')
        }
    }
    const handleMouseMove = (e) => {
        const image = imageRef.current;
        const imageRect = image.getBoundingClientRect();

        const offsetX = e.clientX - (imageRect.left + imageRect.width / 2);
        const offsetY = e.clientY - (imageRect.top + imageRect.height / 2);

        image.style.transition = 'none';
        image.style.transform = `translate(${offsetX * 0.1}px, ${offsetY * 0.1}px)`;
    };

    const handleMouseLeave = () => {
        const image = imageRef.current;
        image.style.transition = 'transform 0.3s ease';
        image.style.transform = 'translate(0, 0)';
    };

    return (
        <div className='h-screen w-full relative flex items-center justify-center'>
            <div className='h-[500px] w-[600px] bg-emerald-100 rounded-full blur-[5rem] absolute -right-20 -top-10 -z-10' />
            <div className='h-[500px] w-[600px] bg-pink-100 rounded-full blur-[5rem] absolute left-20 -bottom-10 -z-10' />
            <div className='flex w-full items-center justify-center mx-20'>
                <div className='w-full cursor-pointer flex items-center justify-center' >
                    <img src='/rocket.png' alt='rocket' className='w-[70%]' ref={imageRef}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                    />
                </div>
                <div className='bg-white p-5 rounded-md border border-gray-100 shadow-md min-w-[400px]'>
                    <h1 className='font-semibold text-xl ml-1'>Welcome back, 🖐</h1>
                    <div className='mt-2 space-y-2'>
                        <Input type={"text"} placeholder={"Email Address"} onChange={handleChange} name={"email"} />
                        <Input type={"password"} placeholder={"Password"} onChange={handleChange} name={"password"} />
                    </div>
                    <div className='mt-4 ml-1'>
                        <div className={`cursor-pointer ${loading ? 'bg-blue-400 pointer-events-none' : 'bg-blue-500 pointer-events-auto'} flex items-center justify-center p-2 rounded-[3px] hover:bg-blue-600 transition-all`}
                            onClick={handleLogin}
                        >
                            <p className='font-bold text-white tracking-wide'>{loading ? 'Logging in...' : 'Login'}</p>
                        </div>
                        <div className='mt-3'>
                            <p className='text-sm'>Don't have an account ?&nbsp;<Link to={'/register'}><span className='text-blue-600 font-medium underline cursor-pointer'>Create one</span></Link></p>
                        </div>
                    </div>
                    <div className='flex items-center justify-between mx-1 gap-3 my-4'>
                        <div className='h-[1px] w-full bg-gray-300' />
                        <p className='font-bold text-gray-400 text-sm'>OR</p>
                        <div className='h-[1px] w-full bg-gray-300' />
                    </div>
                    <div className='flex items-center justify-center gap-3 border border-gray-200 p-2 cursor-pointer rounded-[3px] hover:bg-gray-50 transition-all'
                        onClick={handleLoginWithGoogle}
                    >
                        <img src='/google.png' className='w-6 h-6 object-cover ' alt='google' />
                        <p className='font-semibold tracking-wide text-black'>Sign in with Google</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Login