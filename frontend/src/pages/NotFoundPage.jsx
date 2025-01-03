import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'

const NotFoundPage = () => {
    const location = useLocation();

    useEffect(() => {
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 10)
    }, [location]);

    return (
        <section className='text-center flex flex-col justify-center items-center h-96'>
            <h1 className='text-6xl font-bold mb-4'>404 Not Found</h1>
            <p className='text-xl mb-5'>This page does not exist</p>
            <Link
                to='/'
                className='text-white bg-orange-400 hover:bg-orange-500 rounded-full px-3 py-3 mt-4'
            >
                Go Back
            </Link>
        </section>
    )
}

export default NotFoundPage
