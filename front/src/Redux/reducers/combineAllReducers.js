import { combineReducers } from "redux";
import { userAuthReducer, getLoggedUserDataReducer, changePasswordReducer, forgotPasswordSendOtpReducer,changePasswordAfterOtpReducer } from "./userReducer";
import { getAdminDashboardDataReducer, getTrainerDashboardDataReducer, getMemberDashboardDataReducer } from "./dashboardReducer";
import { registerMemberReducer, deleteMemberReducer, getMemberListReducer, updateMemberReducer } from "./memberReducer";
import { registerTrainerReducer, deleteTrainerReducer, getTrainerListReducer, updateTrainerReducer } from "./trainerReducer";
import { createMembershipReducer, deleteMembershipReducer, getMembershipListReducer, updateMembershipReducer } from "./membershipReducer";
import { createLeadReducer, deleteLeadReducer, getLeadListReducer, updateLeadReducer } from "./leadReducer";
import { createSupplementReducer, deleteSupplementReducer, getSupplementListReducer, updateSupplementReducer } from "./supplementReducer";
import { createInvoiceReducer, deleteInvoiceReducer, getInvoiceListReducer, updateInvoiceReducer } from "./invoiceReducer";

const reducers = combineReducers({
    userauth: userAuthReducer,
    admindashboarddata: getAdminDashboardDataReducer,
    trainerdashboarddata: getTrainerDashboardDataReducer,
    memberdashboarddata: getMemberDashboardDataReducer,
    loggeduserdata: getLoggedUserDataReducer,
    registermember: registerMemberReducer,
    changepassword: changePasswordReducer,
    forgotpasswordsendotp: forgotPasswordSendOtpReducer,
    changepasswordafterotp:changePasswordAfterOtpReducer,
    getmemberlist: getMemberListReducer,
    updatemember: updateMemberReducer,
    deletemember: deleteMemberReducer,
    registertrainer: registerTrainerReducer,
    gettrainerlist: getTrainerListReducer,
    updatetrainer: updateTrainerReducer,
    deletetrainer: deleteTrainerReducer,
    createmembership: createMembershipReducer,
    getmembershiplist: getMembershipListReducer,
    updatemembership: updateMembershipReducer,
    deletemembership: deleteMembershipReducer,
    createsupplement: createSupplementReducer,
    getsupplementlist: getSupplementListReducer,
    updatesupplement: updateSupplementReducer,
    deletesupplement: deleteSupplementReducer,
    createinvoice: createInvoiceReducer,
    getinvoicelist: getInvoiceListReducer,
    updateinvoice: updateInvoiceReducer,
    deleteinvoice: deleteInvoiceReducer,
    createlead: createLeadReducer,
    getleadlist: getLeadListReducer,
    updatelead: updateLeadReducer,
    deletelead: deleteLeadReducer,
})

export default reducers;