import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCreateBookingMutation } from '../features/booking/bookingApiSlice';

const BookingPage = () => {
    const location = useLocation();

    useEffect(() => {
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 10)
    }, [location]);

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
            setTime('');
            setPartySize('');
            setSpecialRequests('');

            navigate('/booking/success');
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

                const timeString = `${formattedHour.toString().padStart(2, '0')}:00 ${suffix}`;
                const timeString30 = `${formattedHour.toString().padStart(2, '0')}:30 ${suffix}`;

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
        <div className="flex justify-center items-start py-10 min-h-screen bg-mainWhite">
            <div className="bg-white p-8 shadow-lg border-2 border-mainDarkGray w-[360px] rounded-lg">
                <h1 className="text-mainDarkGray text-[1.8rem] mb-6 text-center font-semibold">Book a Reservation</h1>
                <form onSubmit={handleBookingSubmit} className="space-y-6">

                    <div className="justify-center text-center">
                        <p
                            onClick={() => navigate('/booking/search')}
                            className="inline-block text-blue-500 text-md cursor-pointer hover:underline"
                        >
                            Have a Reservation?
                        </p>
                    </div>

                    {[
                        { id: 'name', label: 'Name', type: 'text', value: name, onChange: setName, placeholder: 'Your full name' },
                        { id: 'email', label: 'Email', type: 'email', value: email, onChange: setEmail, placeholder: 'Your email' },
                        { id: 'phone', label: 'Phone', type: 'tel', value: phone, onChange: setPhone, placeholder: 'Your phone number' },
                        { id: 'partySize', label: 'Party Size', type: 'number', value: partySize, onChange: setPartySize, placeholder: 'Number of people', min: '1' },
                        { id: 'date', label: 'Date', type: 'date', value: date, onChange: setDate, placeholder: '', min: getTodayDate() },
                    ].map((field, index) => (
                        <div key={index} className="space-y-3">
                            <label htmlFor={field.id} className="block text-mainDarkGray text-sm">
                                {field.label}
                            </label>
                            <input
                                type={field.type}
                                id={field.id}
                                value={field.value}
                                onChange={(e) => field.onChange(e.target.value)}
                                className="w-full px-4 py-2 border border-mainDarkGray focus:outline-none focus:border-blue-500 bg-white text-mainDarkGray rounded transition duration-200"
                                required
                                placeholder={field.placeholder}
                                min={field.min}
                            />
                        </div>
                    ))}

                    {/* Time Field */}
                    <div className="space-y-3">
                        <label htmlFor="time" className="block text-mainDarkGray text-sm">
                            Time
                        </label>
                        <select
                            id="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="w-full px-4 py-2 border border-mainDarkGray focus:outline-none focus:border-blue-500 bg-white text-mainDarkGray rounded transition duration-200"
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

                    {/* Special Requests Field */}
                    <div className="space-y-3">
                        <label htmlFor="specialRequests" className="block text-mainDarkGray text-sm">
                            Special Requests
                        </label>
                        <textarea
                            id="specialRequests"
                            value={specialRequests}
                            onChange={(e) => setSpecialRequests(e.target.value)}
                            className="w-full h-32 resize-none px-4 py-2 border border-mainDarkGray focus:outline-none focus:border-blue-500 bg-white text-mainDarkGray rounded transition duration-200"
                            placeholder="Any additional requests"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center mt-8">
                        <button
                            type="submit"
                            className="bg-mainYellow w-full border border-mainDarkGray hover:border-mainDarkGray text-mainDarkGray font-semibold py-2 rounded transition duration-200 hover:bg-mainDarkGray hover:text-darkYellow"
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
