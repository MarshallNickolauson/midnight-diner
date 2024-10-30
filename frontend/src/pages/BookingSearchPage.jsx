import { useState } from 'react';
import { useGetBookingsMutation } from '../features/booking/bookingApiSlice';
import { useNavigate } from 'react-router-dom';

const BookingSearchPage = () => {
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
        <div className="flex justify-center items-start py-10 min-h-screen bg-mainDarkGray">
            <div className="bg-mainBlack p-8 shadow-lg border-2 border-mainWhite w-[360px] rounded-lg">
                <h1 className="text-mainWhite text-3xl mb-2 text-center font-semibold">Search for a Reservation</h1>
                <div className="justify-center text-center">
                    <p
                        onClick={() => navigate('/booking')}
                        className="inline-block text-mainYellow text-sm cursor-pointer hover:underline"
                    >Make a Reservation</p>
                </div>
                <form onSubmit={handleSearchSubmit} className="space-y-6">
                    {/* Search Bar */}
                    <div className="space-y-3">
                        <label htmlFor="search" className="block text-mainWhite text-sm">
                            Search
                        </label>
                        <input
                            type="text"
                            id="search"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-mainWhite focus:outline-none focus:ring-2 focus:ring-mainYellow bg-mainDarkGray text-mainWhite rounded transition duration-150"
                            required
                            placeholder="Enter your email"
                        />
                    </div>

                    {/* Search Button */}
                    <div className="flex justify-center mt-4">
                        <button
                            type="submit"
                            className="bg-mainYellow w-full border-2 border-transparent hover:border-mainWhite text-mainBlack font-semibold py-2 rounded transition duration-200 hover:bg-mainBlack hover:text-mainYellow"
                        >
                            Search
                        </button>
                    </div>
                </form>

                {/* Render Booking Cards */}
                <div className="mt-8 text-mainWhite">
                    {bookings.length > 0 && (
                        bookings.map((booking) => (
                            <div key={booking._id} className="border border-mainWhite p-4 rounded mb-4">
                                <h2 className="text-lg"><strong>Name:</strong> {booking.name}</h2>
                                <p><strong>Party Size:</strong> {booking.partySize}</p>
                                <p><strong>Date:</strong> {new Date(booking.dateTime).toLocaleDateString()}</p>
                                <p><strong>Time:</strong> {new Date(booking.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                <p><strong>Special Requests:</strong> {booking.specialRequests}</p>
                                <p><strong>Status:</strong> {booking.status}</p>
                            </div>
                        ))
                    )}
                    {(bookings.length === 0 && searched) && (
                        <p>No bookings found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookingSearchPage;