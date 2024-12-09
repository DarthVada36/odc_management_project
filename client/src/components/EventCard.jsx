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
  <button className="px-6 py-2 bg-orange text-white font-semibold rounded hover:bg-orange-600 transition-colors">
    Inscripciones
  </button>

  <button className="px-6 py-2 border-2 border-black font-semibold rounded hover:bg-gray-100 transition-colors flex items-center gap-2">
    <svg className="w-10 h-10" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path fill="#000000" d="M400,0 L400,150.005 C400.002761,205.231522 444.773478,250 500,250 L650,250 L650,850 L50,850 C22.3857625,850 0,827.614237 0,800 L0,0 L400,0 Z M385.118,325 L264.882,325 C242.843275,325.055973 224.986176,342.898329 224.912,364.937 L225,550 L98,550 L289.335,735.547 L289.784998,735.979141 C299.284487,744.99092 311.890142,750.016016 325,750.00007 L325.637833,749.997305 C339.024162,749.85958 351.882295,744.708989 361.666,735.549 L552,550 L425,550 L425.088,364.937 C425.013824,342.898329 407.156725,325.055973 385.118,325 Z M450,0 L650,200 L494.443,200 C469.9,200 450,177.617 450,150 L450,0 Z" transform="matrix(.1 0 0 .1 17.5 7.5)" />
    </svg>
    Descargar info
  </button>
</div>
            </div>
        </div>
    );
};

export default EventCard;