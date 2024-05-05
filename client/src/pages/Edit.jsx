import React, { useEffect, useState } from 'react'
import Input from '../components/Input'
import { Link, useNavigate, useParams } from "react-router-dom"
import { registerNewUser, uploadImage } from '../utils/firebase'
import axios from 'axios'
import toast from 'react-hot-toast'

const Edit = () => {
  const { userid } = useParams()
  const navigation = useNavigate()
  const [user, setUser] = useState({
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
  useEffect(() => {
    if (!userid) return navigation('/')
    const fetchData = async () => {
      await axios.get(`http://localhost:4000/api/get-user/${userid}`)
        .then((data) => {
          const user = data?.data?.data
          setUser({
            fullName: user.fullName,
            email: user.email,
            phone: user.phone,
            gender: user.gender,
            qualification: user.qualification,
            profileImage: null,
            coverImage: null,
            bio: user.bio || ''
          });
        })
    }
    fetchData()
  }, [userid])
  const [loading, setLoading] = useState(false)
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    // If the input is a file input
    if (type === "file") {
      setUser({
        ...user,
        [name]: e.target.files[0]
      });
    } else {
      setUser({
        ...user,
        [name]: value
      });
    }
  };
  const handleEdit = async () => {
    try {
      console.log(user)
      setLoading(true)
      let profileURL;
      let coverURL;
      if (user?.profileImage) {
        profileURL = await uploadImage(user.profileImage)
      }
      if (user?.coverImage) {
        coverURL = await uploadImage(user.coverImage)
      }
      console.log(profileURL)
      await axios.put(`http://localhost:4000/api/update-user/${userid}`, {
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        gender: user.gender,
        qualification: user.qualification,
        profilePic: profileURL,
        coverPic: coverURL,
        bio: user.bio || ''
      })
        .then((data) => {
          console.log(data)
          toast.success('Updated')
          setLoading(false)
          setTimeout(() => {
            return window.location.href = "/"
          }, 1000)
        })
    } catch (error) {
      setLoading(false)
      console.log(error)
      return toast.error('Error while updating')
    }
  }
  return (
    <div className='h-screen w-full relative flex items-center justify-center overflow-hidden'>
      <div className='h-[500px] w-[600px] bg-emerald-100 rounded-full blur-[5rem] absolute -right-20 -top-10 -z-10' />
      <div className='h-[500px] w-[600px] bg-pink-100 rounded-full blur-[5rem] absolute left-20 -bottom-10 -z-10' />
      <div className='flex items-center justify-center w-full'>
        <div className='bg-white p-5 rounded-md border border-gray-100 shadow-md max-w-[600px]'>
          <h1 className='font-semibold text-xl ml-1'>Edit your Profile</h1>
          <div className='mt-3 space-y-2'>
            <Input type={"text"} placeholder={"Full Name"} name={"fullName"} onChange={handleChange} value={user?.fullName} />
            <Input type={"text"} placeholder={"Email Address"} name={"email"} disabled onChange={handleChange} value={user?.email} />
            <Input type={"text"} placeholder={"Phone Number"} name={"phone"} onChange={handleChange} value={user?.phone} />
            <div className='flex items-center text-gray-400 gap-2 pt-2'>
              <Input type={"radio"} name="gender" value={"male"} onChange={handleChange} checked={user?.gender == "male"} /><p className='cursor-default'>Male</p>
              <Input type={"radio"} name="gender" value={"female"} onChange={handleChange} checked={user?.gender == "female"} /><p className='cursor-default'>Female</p>
            </div>
            <div className='border-b border-gray-200'>
              <select className='w-full border-none outline-none focus:border-none py-2 text-gray-500'
                name='qualification'
                onChange={handleChange}
                value={user?.qualification}
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
              <textarea className='w-full resize-none border-none outline-none focus:outline-none' placeholder='Type Bio' name='bio' onChange={handleChange} defaultValue={user?.bio} />
            </div>

          </div>
          <div className='mt-4 ml-1'>
            <div className={`cursor-pointer ${loading ? 'bg-blue-400 pointer-events-none' : 'bg-blue-500 pointer-events-auto'} flex items-center justify-center p-2 rounded-[3px] hover:bg-blue-600 transition-all`}
              onClick={handleEdit}
            >
              <p className='font-bold text-white tracking-wide'>{loading ? 'Please wait....' : "Edit Profile"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Edit