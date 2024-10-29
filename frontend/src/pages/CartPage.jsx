import React from 'react'
import BlackButtonHollow from '../components/BlackButtonHollow'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { userInfo } = useSelector((state) => state.auth);

    return (
        <div className='bg-mainWhite py-3 min-h-screen'>
            <div className='text-center'>
                <h1 className='text-[3rem] text-mainBlack font-bold'>YOUR <span className='text-mainRed'>BAG</span></h1>
                <h1 className='text-[1.2rem]'>Here you'll see what you've added to your takeout bag.</h1>
                {!userInfo &&
                    <h1
                        onClick={() => navigate('/login')}
                        className='text-[1rem] mt-5 cursor-pointer inline-block text-blue-500 hover:underline'>
                        For the best experience, please sign in.
                    </h1>
                }
                <div className='flex justify-center mt-5'>
                    <BlackButtonHollow title='View Menu' navigateTo='/menu' width='160' />
                </div>
                <div className="flex justify-center mt-5">
                    <h1 className='text-[1.2rem]'>Items will appear here!</h1>
                </div>
            </div>
        </div>
    )
}

export default CartPage
