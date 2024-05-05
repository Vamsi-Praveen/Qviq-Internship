import React, { useState } from 'react'
import Input from '../components/Input'
import { Link, useNavigate } from "react-router-dom"
import { registerNewUser, uploadImage } from '../utils/firebase'
import axios from 'axios'
import toast from 'react-hot-toast'

const SignUp = () => {
  const navigation = useNavigate()
  const [loading, setLoading] = useState(false)
  const [userDetails, setUserDetails] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    qualification: "student",
    profileImage: null,
    coverImage: null,
    bio: ''
  })
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    // If the input is a file input
    if (type === "file") {
      setUserDetails({
        ...userDetails,
        [name]: e.target.files[0]
      });
    } else {
      setUserDetails({
        ...userDetails,
        [name]: value
      });
    }
  };
  const handleCreateAccount = async () => {
    try {
      setLoading(true)
      console.log(userDetails)
      const user = await registerNewUser(userDetails.email, userDetails.password)
      if (user.code == 'auth/email-already-in-use') {
        setLoading(false)
        return toast.error('Email Already Registered')
      }
      const profileURL = await uploadImage(userDetails.profileImage)
      const coverURL = await uploadImage(userDetails.coverImage)

      await axios.post('http://localhost:4000/api/register-user', {
        fullName: userDetails.fullName,
        email: userDetails.email,
        phone: userDetails.phone,
        gender: userDetails.gender,
        qualification: userDetails.qualification,
        password: userDetails.password,
        profilePic: profileURL,
        coverPic: coverURL,
        bio: userDetails.bio
      }).then((data) => {
        console.log(data)
        setLoading(false)
        toast.success('Created Succesfully')
        navigation('/login')

      })
        .catch((err) => {
          console.log(err)
        })
      setLoading(false)
    } catch (error) {
      console.log(error)
      return toast.error('Error occured')
    }
  }

  return (
    <div className='h-screen w-full relative flex items-center justify-center overflow-hidden'>
      <div className='h-[500px] w-[600px] bg-emerald-100 rounded-full blur-[5rem] absolute -right-20 -top-10 -z-10' />
      <div className='h-[500px] w-[600px] bg-pink-100 rounded-full blur-[5rem] absolute left-20 -bottom-10 -z-10' />
      <div className='flex items-center justify-center w-full'>
        <div className='bg-white p-5 rounded-md border border-gray-100 shadow-md max-w-[600px]'>
          <h1 className='font-semibold text-xl ml-1'>Share your toughts,&nbsp;Join now 🖐</h1>
          <div className='mt-3 space-y-2'>
            <Input type={"text"} placeholder={"Full Name"} name={"fullName"} onChange={handleChange} />
            <Input type={"text"} placeholder={"Email Address"} name={"email"} onChange={handleChange} />
            <Input type={"text"} placeholder={"Phone Number"} name={"phone"} onChange={handleChange} />
            <Input type={"password"} placeholder={"Password"} name={"password"} onChange={handleChange} />

            <div className='flex items-center text-gray-400 gap-2 pt-2'>
              <Input type={"radio"} name="gender" value={"male"} onChange={handleChange} /><p className='cursor-default'>Male</p>
              <Input type={"radio"} name="gender" value={"female"} onChange={handleChange} /><p className='cursor-default'>Female</p>
            </div>
            <div className='border-b border-gray-200'>
              <select className='w-full border-none outline-none focus:border-none py-2 text-gray-500'
                name='qualification'
                onChange={handleChange}
                defaultValue={"student"}
              >
                <option value={"student"}>Student</option>
                <option value={"employed"}>Employed</option>
                <option value={"other"}>Other</option>
              </select>
            </div>
            <div className='flex flex-col space-y-2 items-center'>
              <div className='flex gap-2 items-center'>
                <p className='text-gray-400'>Profile Photo</p>
                <input type='file' className='text-gray-400' name='profileImage' onChange={handleChange} />
              </div>
              <div className='flex gap-2 items-center border-b border-gray-200 pb-2'>
                <p className='text-gray-400'>Cover Photo</p>
                <input type='file' className='text-gray-400' name="coverImage" onChange={handleChange} />
              </div>
            </div>
            <div>
              <textarea className='w-full resize-none border-none outline-none focus:outline-none' placeholder='Type Bio' name='bio' onChange={handleChange} />
            </div>

          </div>
          <div className='mt-4 ml-1'>
            <div className={`cursor-pointer ${loading ? 'bg-blue-400 pointer-events-none' : 'bg-blue-500 pointer-events-auto'} flex items-center justify-center p-2 rounded-[3px] hover:bg-blue-600 transition-all`}
              onClick={handleCreateAccount}
            >
              <p className='font-bold text-white tracking-wide'>{loading ? 'Creating....' : "Create Account"}</p>
            </div>
            <div className='mt-3'>
              <p className='text-sm'>Have an account ?&nbsp;<Link to={'/login'}><span className='text-blue-600 font-medium underline cursor-pointer'>Login</span></Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp