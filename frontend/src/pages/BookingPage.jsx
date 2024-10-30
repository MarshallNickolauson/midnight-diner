import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCreateBookingMutation } from '../features/booking/bookingApiSlice';

const BookingPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [partySize, setPartySize] = useState('');
    const [specialRequests, setSpecialRequests] = useState('');
    const [timeOptions, setTimeOptions] = useState([]);

    const navigate = useNavigate();

    const { userInfo } = useSelector((state) => state.auth);

    const [createBooking, { isLoading }] = useCreateBookingMutation();

    useEffect(() => {
        if (userInfo) {
            setName(userInfo.name);
            setEmail(userInfo.email);
            setPhone(userInfo.phone);
        }
    }, [userInfo]);

    const handleBookingSubmit = async (e) => {
        e.preventDefault();

        const bookingData = {
            name,
            email,
            phone,
            dateTime: `${date}T${time}:00`,
            partySize: parseInt(partySize, 10),
            specialRequests,
        };

        try {
            await createBooking(bookingData).unwrap();
            setDate('');
            setTime('')
            setPartySize('');
            setSpecialRequests('');

            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 10);

            // Add confirmation page at booking/success
        } catch (error) {
            console.log(error);
        }
    };

    const getTodayDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

    useEffect(() => {
        const generateTimeOptions = () => {
            const today = new Date();
            const selectedDate = new Date(date);
            let options = [];

            for (let hour = 16; hour <= 26; hour++) {
                const displayHour = hour > 24 ? hour - 24 : hour;
                const suffix = displayHour >= 12 ? 'PM' : 'AM';
                const formattedHour = displayHour > 12 ? displayHour - 12 : displayHour;

                const timeString = `${formattedHour.toString().padStart(2, '0')}:${'00'} ${suffix}`;
                const timeString30 = `${formattedHour.toString().padStart(2, '0')}:${'30'} ${suffix}`;

                const optionTime = new Date(date);
                optionTime.setHours(hour > 24 ? hour - 24 : hour, 0);

                const optionTime30 = new Date(date);
                optionTime30.setHours(hour > 24 ? hour - 24 : hour, 30);

                if (selectedDate.toDateString() === today.toDateString()) {
                    if (optionTime > today) options.push(timeString);
                    if (optionTime30 > today) options.push(timeString30);
                } else {
                    options.push(timeString, timeString30);
                }
            }
            setTimeOptions(options);
        };

        if (date) {
            generateTimeOptions();
        }
    }, [date]);

    return (
        <div className="flex justify-center items-start py-10 min-h-screen bg-mainDarkGray">
            <div className="bg-mainBlack p-8 shadow-lg border-2 border-mainWhite w-[360px] rounded-lg">
                <h1 className="text-mainWhite text-3xl mb-6 text-center font-semibold">Book a Reservation</h1>
                <form onSubmit={handleBookingSubmit} className="space-y-6">

                    <div className="justify-center text-center">
                        <p
                            onClick={() => navigate('/booking/search')}
                            className="inline-block text-mainYellow text-sm cursor-pointer hover:underline"
                        >Have a Reservation?</p>
                    </div>

                    {/* Name Field */}
                    <div className="space-y-3">
                        <label htmlFor="name" className="block text-mainWhite text-sm">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 border border-mainWhite focus:outline-none focus:ring-2 focus:ring-mainYellow bg-mainDarkGray text-mainWhite rounded transition duration-150"
                            required
                            placeholder="Your full name"
                        />
                    </div>

                    {/* Email Field */}
                    <div className="space-y-3">
                        <label htmlFor="email" className="block text-mainWhite text-sm">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-mainWhite focus:outline-none focus:ring-2 focus:ring-mainYellow bg-mainDarkGray text-mainWhite rounded transition duration-150"
                            required
                            placeholder="Your email"
                        />
                    </div>

                    {/* Phone Field */}
                    <div className="space-y-3">
                        <label htmlFor="phone" className="block text-mainWhite text-sm">
                            Phone
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full px-4 py-2 border border-mainWhite focus:outline-none focus:ring-2 focus:ring-mainYellow bg-mainDarkGray text-mainWhite rounded transition duration-150"
                            required
                            placeholder="Your phone number"
                        />
                    </div>

                    {/* Date Field */}
                    <div className="space-y-3">
                        <label htmlFor="date" className="block text-mainWhite text-sm">
                            Date
                        </label>
                        <input
                            type="date"
                            id="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full px-4 py-2 border border-mainWhite focus:outline-none focus:ring-2 focus:ring-mainYellow bg-mainDarkGray text-mainWhite rounded transition duration-150"
                            required
                            min={getTodayDate()}
                        />
                    </div>

                    {/* Time Field */}
                    <div className="space-y-3">
                        <label htmlFor="time" className="block text-mainWhite text-sm">
                            Time
                        </label>
                        <select
                            id="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="w-full px-4 py-2 border border-mainWhite focus:outline-none focus:ring-2 focus:ring-mainYellow bg-mainDarkGray text-mainWhite rounded transition duration-150"
                            required
                        >
                            <option value="" disabled>Select a time</option>
                            {timeOptions.map((timeOption, index) => (
                                <option key={index} value={timeOption.split(' ')[0]}>
                                    {timeOption}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Party Size Field */}
                    <div className="space-y-3">
                        <label htmlFor="partySize" className="block text-mainWhite text-sm">
                            Party Size
                        </label>
                        <input
                            type="number"
                            id="partySize"
                            value={partySize}
                            onChange={(e) => setPartySize(e.target.value)}
                            className="w-full px-4 py-2 border border-mainWhite focus:outline-none focus:ring-2 focus:ring-mainYellow bg-mainDarkGray text-mainWhite rounded transition duration-150"
                            required
                            placeholder="Number of people"
                            min="1"
                        />
                    </div>

                    {/* Special Requests Field */}
                    <div className="space-y-3">
                        <label htmlFor="specialRequests" className="block text-mainWhite text-sm">
                            Special Requests
                        </label>
                        <textarea
                            id="specialRequests"
                            value={specialRequests}
                            onChange={(e) => setSpecialRequests(e.target.value)}
                            className="w-full h-32 resize-none px-4 py-2 border border-mainWhite focus:outline-none focus:ring-2 focus:ring-mainYellow bg-mainDarkGray text-mainWhite rounded transition duration-150"
                            placeholder="Any additional requests"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center mt-8">
                        <button
                            type="submit"
                            className="bg-mainYellow w-full border-2 border-transparent hover:border-mainWhite text-mainBlack font-semibold py-2 rounded transition duration-200 hover:bg-mainBlack hover:text-mainYellow"
                        >
                            Book Now
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookingPage;
