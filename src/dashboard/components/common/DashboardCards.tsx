interface DashboardCardsProps {
    className?: string;
    cardName: string;
    data: number;
}

const DashboardCards = ({className, cardName, data}: DashboardCardsProps) => {
  return (
    <div className={`group rounded-lg font-primary p-6 text-white flex flex-1 justify-between cursor-pointer ${className}`}>
      <div>
        <p className="text-2xl pb-2">{cardName}</p>
        <h2 className="font-semibold text-4xl py-2">{data}</h2>
        <p className="text-xs"> Increased from the last month</p>
      </div>
      <div className="bg-white rounded-full h-fit self-start p-2 flex items-center justify-center group-hover:scale-115 transition-transform duration-300">
        <i className="pi pi-arrow-up-right text-black"></i>
      </div>
    </div>
  );
};

export default DashboardCards;
