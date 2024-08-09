using { proj_schema as my } from '../db/schema';

@requires: 'authenticated-user'
service CatalogService {
    @odata.draft.enabled
 entity tab1 as projection on my.PAN_Details where created_by = $user and ltrim(rtrim(task_id))!='';
 entity tab2 as projection on my.PAN_WEB_EVENT;
 entity tab3 as projection on my.PAN_TYPE;
//  @odata.draft.enabled
 entity vendor_data as projection on my.PAN_vendor_data;
 entity Fvendor_responseoo as projection on my.PAN_vendor_response; 
 entity PAYMENT_TERM_DETAILS as projection on my.PAN_PAYMENT_TERM_DETAILS;
  //  @odata.draft.enabled
 entity PAN_PRICE_DETAILS as projection on my.PAN_PRICE_DETAILS;
 entity WORKFLOW_HISTORY as projection on my.PAN_WORKFLOW_HISTORY;
 entity attachments as projection on my.PAN_attachments;
 entity PAN_Payment_Method_Drop as projection on my.PAN_Payment_Method_Drop;
entity PAN_Comments as projection on my.PAN_Comments;
//below mentioned function import is used while the user submitting the PAN for approval process and updates certain to database from S4.
function sendforapproval(data:String) returns LargeString;
//below function import extracts the approvers data from S4 and inserts it into the database.
 function InsertData(ID:String) returns String;
 //below function import is used to return the PAN status to UI extension.
 function getData(ID:String) returns String;
 //it is used to update notification status as true or false in the Workflow history table based on UI actions.
 function switch_control(ID:String) returns String;
 //it updates the status as draft when the user provides the justification needed for approver.
 function getuserinfo(ID:String) returns String;
 //returns all the comments related to the PAn to the UI.
function getcomments(ID:String) returns String;
//returns all the workflow history table details related to the PAN to ui.
function getsync(data:String) returns String;
//this function has a code return but we are not using anywhere in the UI to call this function.
function draft(ID:String) returns String;
//this function has code written but we are notusing anywhere
function Listdata(ID:String) returns String;
//it is used to update certain details in the vendor table and to perform attachements related functionality
function flag (ID:String,case:String) returns String;
//it is used for the refresh button functionality in UI in workflow history table.
function updatee(ID:String) returns String;
}

//below mentioned service is not used.
service PanApproval {
 entity PAN_Details_APR as projection on my.PAN_Details;
 entity PAN_WEB_EVENT_APR as projection on my.PAN_WEB_EVENT;
 entity PAN_TYPE_APR as projection on my.PAN_TYPE;
 entity PAN_vendor_data_APR as projection on my.PAN_vendor_data;
 entity PAN_vendor_response_APR as projection on my.PAN_vendor_response; 
 entity PAN_PAYMENT_TERM_DETAILS_APR as projection on my.PAN_PAYMENT_TERM_DETAILS;
 entity PAN_PRICE_DETAILS_APR as projection on my.PAN_PRICE_DETAILS;
 entity PAN_WORKFLOW_HISTORY_APR as projection on my.PAN_WORKFLOW_HISTORY;
 entity PAN_attachments_APR as projection on my.PAN_attachments;
 entity PAN_Payment_Method_Drop_APR as projection on my.PAN_Payment_Method_Drop;
 entity PAN_Comments_APR as projection on my.PAN_Comments;
 entity vendorTaxDetails_APR as projection on my.vendorTaxDetails;
  function sendforapproval(data:String) returns LargeString;
 function InsertData(ID:String) returns String;
 function finalApprove(data:String) returns String;
 function getData(ID:String) returns String;
 function switch_control() returns String;
 function getuser(ID:String) returns String;
 function Reject(data:String) returns String;
 function getcomments(ID:String) returns String;
}