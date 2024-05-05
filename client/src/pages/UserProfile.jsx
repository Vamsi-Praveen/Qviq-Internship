import axios from 'axios';
import { QRCodeSVG } from 'qrcode.react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UserProfile = () => {
    const [user, setUser] = useState({})
    const { userid } = useParams()
    useEffect(() => {
        const fetchData = async () => {
            await axios.get(`http://localhost:4000/api/get-user/${userid}`)
                .then((data) => {
                    setUser(data?.data?.data)
                })
        }
        fetchData()
    }, [])
    return (
        <div className='h-screen w-full flex items-center justify-center'>
            <div className='h-[500px] w-[600px] bg-emerald-100 rounded-full blur-[5rem] absolute -right-20 -top-10 -z-10' />
            <div className='h-[500px] w-[600px] bg-pink-100 rounded-full blur-[5rem] absolute left-20 -bottom-10 -z-10' />

            <div className='bg-white w-[65%] shadow-md rounded-sm p-2.5 min-h-[400px]'>
                <div className='w-full min-h-[200px] flex'>
                    <div className='flex-1 border-r border-gray-300 pr-3'>
                        <div className='w-full h-[170px] relative rounded-[4px]'>
                            <img src={user?.coverPic ? user?.coverPic : '/grp0.jpeg'} alt='coverimage' className='h-full w-full object-cover object-center rounded-[4px]' />
                            <div className='absolute w-[110px] h-[110px] rounded-full -bottom-12 left-2 overflow-hidden border border-white/80'>
                                <img src={user?.profilePic ? user?.profilePic : '/pic4.jpeg'} alt='profile' className='w-full h-full object-cover object-center' />
                            </div>
                        </div>
                        <div className='mt-12 ml-3'>
                            <div className='flex gap-2'>
                                <h1 className='text-xl tracking-wide font-semibold'>{user?.fullName}</h1>
                                <p className='font-medium'>({user?.qualification})</p>
                            </div>
                            <p className='text-sm tracking-wide'>{user?.email}</p>
                            <div className='mt-1'>
                                <p>Phone: <span className='font-medium tracking-wide'>{user?.phone}</span></p>
                                <p>Gender: <span className='font-medium tracking-wide'>{user?.gender}</span></p>
                                <p>Bio: <span className='font-medium tracking-wide'>{user?.bio == '' ? 'No Bio' : user?.bio}</span></p>
                            </div>
                        </div>
                    </div>
                    <div className='w-[22%] flex p-2 items-center flex-col gap-4 pt-10 justify-center'>
                        <QRCodeSVG size={150} value={`http://localhost:5173/user-profile/${userid}`} />
                        <div>
                            <p className='font-medium tracking-wide text-md text-black'>Scan QRCode for my Profile</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default UserProfile