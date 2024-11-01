import { useState } from 'react';
import { useGetBookingsMutation } from '../features/booking/bookingApiSlice';
import { useLocation, useNavigate } from 'react-router-dom';

const BookingSearchPage = () => {
    const location = useLocation();

    useEffect(() => {
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 10)
    }, [location]);

    const [email, setEmail] = useState('');
    const [searched, setSearched] = useState(false);
    const [bookings, setBookings] = useState([]);

    const navigate = useNavigate();

    const [getBookings, { isLoading }] = useGetBookingsMutation();

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await getBookings({ email: email }).unwrap();
            setBookings(res);
            setSearched(true);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex justify-center items-start py-10 min-h-screen bg-mainWhite">
            <div className="bg-white p-8 shadow-lg border-2 border-mainDarkGray w-[360px] rounded-lg">
                <h1 className="text-mainDarkGray text-[1.4rem] mb-6 text-center font-semibold">Search for a Reservation</h1>
                <div className="justify-center text-center mb-4">
                    <p
                        onClick={() => navigate('/booking')}
                        className="inline-block text-blue-500 text-sm cursor-pointer hover:underline"
                    >Make a Reservation</p>
                </div>
                <form onSubmit={handleSearchSubmit} className="space-y-6">
                    {/* Search Bar */}
                    <div className="space-y-3">
                        <label htmlFor="search" className="block text-mainDarkGray text-sm">
                            Email
                        </label>
                        <input
                            type="email"
                            id="search"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-mainDarkGray focus:outline-none focus:border-blue-500 bg-white text-mainDarkGray rounded transition duration-200"
                            required
                            placeholder="Enter your email"
                        />
                    </div>

                    {/* Search Button */}
                    <div className="flex justify-center mt-6">
                        <button
                            type="submit"
                            className="bg-mainYellow w-full border border-mainDarkGray hover:border-mainDarkGray text-mainDarkGray font-semibold py-2 rounded transition duration-200 hover:bg-mainDarkGray hover:text-darkYellow"
                        >
                            Search
                        </button>
                    </div>
                </form>

                {/* Render Booking Cards */}
                <div className="mt-8 text-mainDarkGray">
                    {bookings.length > 0 ? (
                        bookings.map((booking) => (
                            <div key={booking._id} className="border border-mainDarkGray p-4 rounded mb-4">
                                <h2 className="text-lg"><strong>Name:</strong> {booking.name}</h2>
                                <p><strong>Party Size:</strong> {booking.partySize}</p>
                                <p><strong>Date:</strong> {new Date(booking.dateTime).toLocaleDateString()}</p>
                                <p><strong>Time:</strong> {new Date(booking.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                <p><strong>Special Requests:</strong> {booking.specialRequests}</p>
                                <p><strong>Status:</strong> {booking.status}</p>
                            </div>
                        ))
                    ) : (
                        searched && <p>No bookings found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookingSearchPage;
