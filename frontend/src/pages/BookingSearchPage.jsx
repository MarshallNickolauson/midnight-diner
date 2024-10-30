import { useState } from 'react';

const BookingSearchPage = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        console.log('Searching for:', searchTerm);
    };

    return (
        <div className="flex justify-center items-start py-10 min-h-screen bg-mainDarkGray">
            <div className="bg-mainBlack p-8 shadow-lg border-2 border-mainWhite w-[360px] rounded-lg">
                <h1 className="text-mainWhite text-3xl mb-6 text-center font-semibold">Search for a Reservation</h1>
                <form onSubmit={handleSearchSubmit} className="space-y-6">
                    {/* Search Bar */}
                    <div className="space-y-3">
                        <label htmlFor="search" className="block text-mainWhite text-sm">
                            Search
                        </label>
                        <input
                            type="text"
                            id="search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
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

                {/* Hard-Coded Example Booking Information */}
                <div className="mt-8 text-mainWhite">
                    <h2 className="text-lg font-semibold">Example Booking</h2>
                    <p className="mt-2"><strong>Name:</strong> John Doe</p>
                    <p><strong>Party Size:</strong> 4</p>
                    <p><strong>Date:</strong> 2024-10-30</p>
                    <p><strong>Time:</strong> 7:00 PM</p>
                    <p><strong>Special Requests:</strong> Window seat</p>
                </div>
            </div>
        </div>
    );
};

export default BookingSearchPage;