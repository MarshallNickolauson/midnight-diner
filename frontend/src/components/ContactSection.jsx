import React, { useState } from 'react'

const ContactSection = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !email || !message) {
            setError('Please fill out all fields');
            return;
        }

        setError('');

        console.log({ name, email, message })
    }

    return (
        <div className='bg-mainBlack py-12'>
            <div className='flex flex-col justify-center items-center text-mainWhite space-y-6'>
                <div className='text-center'>
                    <h1 className="font-bold text-[3rem]"><span className='text-mainYellow'>CONTACT</span> US</h1>
                    <p>We do events and catering.</p>
                    <p>Let us help make your next occasion unforgettable!</p>
                </div>
                <form onSubmit={handleSubmit} noValidate className='space-y-4'>
                    {error && <p className='text-mainYellow font-md text-center'>{error}</p>}
                    <div>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 border border-mainWhite focus:outline-none focus:ring-1 focus:ring-mainWhite transition-all duration-100 ease-in-out bg-mainDarkGray text-mainWhite"
                            placeholder='Name'
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border border-mainWhite focus:outline-none focus:ring-1 focus:ring-mainWhite transition-all duration-100 ease-in-out bg-mainDarkGray text-mainWhite"
                            placeholder='Email'
                            required
                        />
                    </div>
                    <div>
                        <textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full px-3 py-2 h-32 resize-none border border-mainWhite focus:outline-none focus:ring-1 focus:ring-mainWhite transition-all duration-100 ease-in-out bg-mainDarkGray text-mainWhite overflow-y-scroll" required
                            placeholder='Your message'
                        />
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="bg-mainBlack w-full hover:bg-mainYellow hover:border-mainYellow hover:text-mainYellow cursor-pointer border-2 border-mainYellow transition-all duration-300 ease-in-out group py-3"
                        >
                            <h1 className="text-mainYellow text-lg transition-all duration-100 ease-in-out group-hover:text-mainBlack">
                                Send Message
                            </h1>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ContactSection
