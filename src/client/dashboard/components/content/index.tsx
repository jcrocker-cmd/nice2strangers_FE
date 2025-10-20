import TransactionContent from "./ShoppingCart";
import OrderHistoryContent from "./Purchases";

export const renderContent = (
  activeMenu: string | null,
  setIsGlobalLoading: (value: boolean) => void
) => {
  switch (activeMenu) {
    case "My Cart":
      return <TransactionContent />;
    case "Order History":
      return <OrderHistoryContent setIsGlobalLoading={setIsGlobalLoading} />;
    default:
      return <div className="p-4">Error</div>;
  }
};
