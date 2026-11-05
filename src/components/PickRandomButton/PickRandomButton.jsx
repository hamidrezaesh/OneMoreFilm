export default function PickRandom({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-8 py-3 rounded-xl
                 bg-amber-500 text-black
                 border-2 border-amber-500
                 font-semibold text-lg
                 cursor-pointer
                 hover:bg-transparent hover:text-amber-500
                 active:scale-95
                 transition-all duration-200"
    >
      Pick Random
    </button>
  );
}