import DashboardContent from "./DashboardContent";
import TransactionContent from "./TransactionContent";
import CustomTable from "./OrdersContent";
import ProductsContent from "./ProductsContent";
import Newsletter from "./NewsletterContent";
import InquiryContent from "./Inquiry";
import DroneServiceInquiry from "./services/DroneServiceInquiry";
import SMConsulting from "./services/SocialMediaConsulting";
import SMCreation from "./services/SocialMediaCreation";
import VideoEditing from "./services/VideoEditing";
import Software from "./services/Software";

export const renderContent = (
  activeMenu: string | null,
  setIsGlobalLoading: (value: boolean) => void
) => {
  switch (activeMenu) {
    case "Dashboard":
      return (
        <>
          <DashboardContent />
        </>
      );
    case "Transactions":
      return <TransactionContent setIsGlobalLoading={setIsGlobalLoading} />;
    case "Team":
      return <div>This is Team</div>;
    case "Items":
      return <ProductsContent setIsGlobalLoading={setIsGlobalLoading} />;
    case "Account":
      return <div>This is Account</div>;
    case "Settings":
      return <div>This is Settings</div>;
    case "Orders":
      return <CustomTable />;
    case "Inquiry":
      return <InquiryContent setIsGlobalLoading={setIsGlobalLoading} />;
    case "Drone Services":
      return <DroneServiceInquiry setIsGlobalLoading={setIsGlobalLoading} />;
    case "SM Consulting":
      return <SMConsulting setIsGlobalLoading={setIsGlobalLoading} />;
    case "SM Creation":
      return <SMCreation setIsGlobalLoading={setIsGlobalLoading} />;
    case "Video Editing":
      return <VideoEditing setIsGlobalLoading={setIsGlobalLoading} />;
    case "Software Creation":
      return <Software setIsGlobalLoading={setIsGlobalLoading} />;
    case "Chart":
      return <div>This is Chart</div>;
    case "Newsletter":
      return <Newsletter setIsGlobalLoading={setIsGlobalLoading} />;
    default:
      return <div className="p-4">Select a menu item</div>;
  }
};
