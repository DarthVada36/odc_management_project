import React from 'react';

const EventCard = ({ imageUrl, title, description }) => {
    return (
        <div className="max-w-sm bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Image Section */}
            <div className="w-full h-48 bg-gray-200">
                <img
                    src={imageUrl || "/api/placeholder/400/320"}
                    alt="Event"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Content Section */}
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-3">
                    {title || "Title"}
                </h2>

                <p className="text-gray-600 mb-6">
                    {description || "Description"} 
                </p>

                {/* Buttons Container */}
                <div className="flex gap-4">
  <button className="px-6 py-2 bg-orange text-black font-semibold hover:bg-black hover:text-white transition-colors">
    Inscripciones
  </button>

</div>
            </div>
        </div>
    );
};

export default EventCard;