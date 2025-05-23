const MemberCard = ({ member }) => {
  return (
    <div className="flex flex-col items-center text-center">
      <img
        src={member.image}
        alt={member.name}
        className="w-80 h-80 rounded-full border-4 border-blue-500 object-cover shadow-lg"
      />
      <h2 className="text-3xl font-bold mt-6 text-white font-serif tracking-tight">
        {member.name}
      </h2>
      <p className="text-xl text-blue-500 font-bold mt-2 font-sans">
        {member.role}
      </p>
      <p className="text-lg text-gray-200 mt-4 max-w-md font-sans leading-relaxed">
        {member.description}
      </p>
    </div>
  );
};
  
  export default MemberCard;
  