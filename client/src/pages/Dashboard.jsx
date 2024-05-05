import axios from 'axios';
import { QRCodeSVG } from 'qrcode.react';
import React from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebaseConfig';
import useAuth from '../hooks/useAuth';
import usePersistent from '../hooks/usePersistent';
import { LogOut } from 'lucide-react';

const Dashboard = () => {
    const { userId, user } = useAuth()
    const { deleteItem } = usePersistent()
    const navigate = useNavigate()
    const handleDelete = async () => {
        try {
            const user = auth.currentUser;
            await user.delete()
            deleteItem()
            await axios.delete(`http://localhost:4000/api/delete-user/${userId}`)
                .then((data) => {
                    console.log(data);
                    toast.success('Account Deleted')
                    return navigate('/login')
                })
        }
        catch (err) {
            console.log(err)
            return toast.error('Error while deleting')
        }
    }
    const handleEdit = async () => {
        navigate(`/edit/${userId}`)
    }
    const handleLogout = () => {
        try {
            deleteItem()
            auth.signOut().then(() => {
                navigate("/login")
            })
        } catch (error) {
            console.log(error)
            return toast.error('unable to logout')
        }
    }
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
                    <div className='w-[22%] flex p-2 items-center flex-col gap-4 pt-10'>
                        <QRCodeSVG size={150} value={`http://localhost:5173/user-profile/${userId}`} />
                        <div>
                            <p className='font-medium tracking-wide text-md text-black'>Scan QRCode for my Profile</p>
                            <div className='mt-3 space-y-2'>
                                <div className='bg-blue-400 text-center p-1.5 rounded-[4px] cursor-pointer hover:bg-blue-500 transition-all delay-75' onClick={handleEdit}>
                                    <p className='text-white font-medium'>Edit Profile</p>
                                </div>
                                <div className='bg-red-400 text-center rounded-[4px] p-1.5 cursor-pointer hover:bg-red-500 transition-all delay-75' onClick={handleDelete}>
                                    <p className='text-white font-medium'>Delete Account</p>
                                </div>
                                <div className='w-full bg-yellow-200 p-1.5 rounded-[4px] flex items-center justify-center gap-2 cursor-pointer'
                                    onClick={handleLogout}
                                >
                                    <LogOut className='w-5 h-5' />
                                    <p className='font-bold tracking-wide'>Logout</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Dashboard