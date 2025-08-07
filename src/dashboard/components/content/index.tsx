import DashboardContent from "./DashboardContent";
import TransactionContent from "./TransactionContent";
import InquiryContent from "./InquiryContent";
import CustomTable from "./OrdersContent";
import ProductsContent from "./ProductsContent";

export const renderContent = (activeMenu: string | null, setIsGlobalLoading: (value: boolean) => void) => {
  switch (activeMenu) {
    case "Dashboard":
      return (
        <>
          <DashboardContent />
        </>
      );
    case "Transactions":
      return <TransactionContent setIsGlobalLoading={setIsGlobalLoading}/>;
    case "Team":
      return <div>This is Team</div>;
    case "Items":
      return <ProductsContent setIsGlobalLoading={setIsGlobalLoading}/>;
    case "Account":
      return <div>This is Account</div>;
    case "Settings":
      return <div>This is Settings</div>;
    case "Orders":
      return <CustomTable />;
    case "Inquiry":
      return <InquiryContent />;
    case "Chart":
      return <div>This is Chart</div>;
    default:
      return <div className="p-4">Select a menu item</div>;
  }
};
