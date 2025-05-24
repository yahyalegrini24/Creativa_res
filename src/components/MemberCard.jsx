const MemberCard = ({ member }) => {
  return (
    <div className="flex flex-col items-center text-center p-4">
      <img
        src={member.image}
        alt={member.name}
        // Responsive image size: smaller on small screens, larger on bigger screens
        className="w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-full border-4 border-blue-500 object-cover shadow-lg mb-4 sm:mb-6"
      />
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white font-serif tracking-tight">
        {member.name}
      </h2>
      <p className="text-lg sm:text-xl text-blue-500 font-bold mt-1 sm:mt-2 font-sans">
        {member.role}
      </p>
      <p className="text-base sm:text-lg text-gray-200 mt-2 sm:mt-4 max-w-xs sm:max-w-sm md:max-w-md font-sans leading-relaxed">
        {member.description}
      </p>
    </div>
  );
};
  
  export default MemberCard;

