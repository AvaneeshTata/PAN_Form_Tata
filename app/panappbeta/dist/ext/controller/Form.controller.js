sap.ui.define(["sap/ui/core/mvc/ControllerExtension","sap/m/Dialog","sap/ui/core/Fragment","sap/m/library","sap/m/MessageToast","sap/ui/core/routing/History","sap/ui/core/library"],function(e,t,n,o,a,g,s){"use strict";var i=o.ButtonType;var r=o.DialogType;var l=s.ValueState;var c=new sap.m.BusyDialog("oBusyDialog");let m;var d;var p;const u=async function(e,t,n,o){console.log(e);let a=e.bindContext(`/${t}(...)`);a.setParameter(o,JSON.stringify(n));await a.execute();let g=a.getBoundContext();let s=g.getObject();if(s){return s.value}else{return""}};return e.extend("panappbeta.ext.controller.Form",{override:{onInit:async function(){},onBeforeRendering:async function(){var e=this.base.getExtensionAPI().getModel();let t=this.base.getExtensionAPI();var n=window.location.href;var o=n.split("(");var a=o[1];var g=a.split("'");var s=g[1];let i="InsertData";let r=await u(e,i,s,"ID");console.log(r)},editFlow:{onBeforeDiscard:async function(e){let t=window.location.href;var n=t.split("(");var o=n[1];var a=o.split("'");let g=a[1];let s="flag";const i="discard";let r=e.context.getModel().bindContext(`/${s}(...)`);r.setParameter("ID",g);r.setParameter("case",i);await r.execute();const l=r.getBoundContext();var c=l.getValue();console.log(c);sap.ui.getCore().byId("panappbeta::tab1ObjectPage--fe::CustomSubSection::Attachment--uploadSet").mBindingInfos.items.binding.refresh()},onAfterSave:async function(e){let t=window.location.href;var n=t.split("(");var o=n[1];var g=o.split("'");let s=g[1];let d="flag";const p="saved";let b=e.context.getModel().bindContext(`/${d}(...)`);b.setParameter("ID",s);b.setParameter("case",p);await b.execute();const v=b.getBoundContext();var f=v.getValue();console.log(f);m=new sap.m.Dialog({title:"Confirm",type:r.Message,content:new sap.m.Text({text:"   Submit PAN Form For Approval  "}),beginButton:new sap.m.Button({type:i.Emphasized,text:"OK",press:async function(){c.open();const e=this.base.getExtensionAPI().getModel();let t="sendforapproval";let n=window.location.href;let o=window.location.origin;let g=window.location.search;let s=g.split("&");let d=s[0];let p=window.location.hash;p=p.replace("obj1-display","pan_approval-display");p=p.replace("panappbeta","panapproval");p=p.replace("tab1","PAN_Details_APR");var b=n.split("(");var v=b[1];var f=v.split("'");let A=await u(e,"getsync",f[1],"data");A=JSON.parse(A);debugger;if(A.length!=0){let n="https://btp-dev-0or0hi20.launchpad.cfapps.eu10.hana.ondemand.com/site?siteId=94a17d9a-05b5-425d-b51d-2cd74a2c2762#pan_approval-display?sap-ui-app-id-hint=saas_approuter_panapproval&/PAN_Details_APR('"+f[1]+"')";let g=o+"/site"+d+p;let s={url:g,PAN_Number:f[1],buttonclicked:"sendforApproval"};debugger;var w;try{console.log(e);let n=e.bindContext(`/${t}(...)`);n.setParameter("data",JSON.stringify(s));await n.execute();let o=n.getBoundContext();var w=o.getObject()}catch(e){debugger;console.log(e);w=e}m.close();m.destroy();c.close();if(w.value=="error"){window.alert("Sorry.. Please try again after sometime")}else{window.location.reload();a.show("PANForm Submitted for Approval");var h=await sap.ushell.Container.getServiceAsync("Navigation");h.navigate({target:{semanticObject:"obj1",action:"display"}})}console.log(w)}else{if(!this.oErrorMessageDialog){this.oErrorMessageDialog=new sap.m.Dialog({type:r.Message,title:"Error",state:l.Error,content:new sap.m.Text({text:"Cannot Submit for approval When Approvers are Empty"}),beginButton:new sap.m.Button({type:i.Emphasized,text:"OK",press:function(){this.oErrorMessageDialog.close()}.bind(this)})})}m.close();m.destroy();c.close();this.oErrorMessageDialog.open()}}.bind(this)}),endButton:new sap.m.Button({text:"Close",press:async function(){c.open();const e=this.base.getExtensionAPI().getModel();let t="getuserinfo";let n=window.location.href;var o=n.split("(");var a=o[1];var g=a.split("'");let s=g[1];let i=await u(e,t,s,"ID");m.close();m.destroy();c.close()}.bind(this)})});m.open()},onBeforeEdit:async function(e){this.getView().getContent()[0].getSections()[3].setVisible(true);this.getView().getContent()[0].getSections()[2].mAggregations._grid.getContent()[0].mAggregations._grid.getContent()[0].getContent().getItems()[1].getDependents()[1].mAggregations.headerToolbar.setVisible(true)},onBeforeSave:async function(e){debugger;var t=this.base.getView().mAggregations.content[0].mAggregations.sections[2].mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.items[1].mAggregations.items;var n=this.base.getView().mAggregations.content[0].mAggregations.sections[2].mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.items[1].mBindingInfos.items.binding.oCache.aElements.$byPredicate;var o=this.base.getView().mAggregations.content[0].mAggregations.sections[2].mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.items[1].mBindingInfos.items.binding.oCache.aElements.$byPredicate;var a=Object.values(o);for(var g=0;g<a.length;g++){var s=false;for(var i=0;i<t.length;i++){var r=t[i].mProperties.url;var l=/ID=([a-f\d-]+)/i;var c=r.match(l);if(a[g].ID===c[1]){s=true;break}}if(!s){this.base.getView().mAggregations.content[0].mAggregations.sections[2].mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.items[1].mBindingInfos.items.binding.aContexts[g].delete()}}}},routing:{onBeforeBinding:async function(e){debugger;try{c.open();const r=this.base.getExtensionAPI().getModel();const l=this;let m=this.base.getExtensionAPI();var t=window.location.href;var n=t.split("(");var o=n[1];var a=o.split("'");var g=a[1];let b="InsertData";let v={some:"data"};let f=await u(r,b,g,"ID");console.log(f);console.log(f);var s="getData";var i=this.base.getAppComponent().getManifestObject()._oBaseUri._string;let A=i+`odata/v4/catalog/tab1?$filter=(PAN_Number%20eq%20%27${a[1]}%27)&$expand=tab1toWORKFLOW_HISTORY`;await $.ajax({url:A,success:function(e){console.log(e);w(e)},error:function(e,t,n){console.error(n)}});function w(e){debugger;var t;if(e.length){t=e}else{debugger;t=e.value[0]?.tab1toWORKFLOW_HISTORY}var n=[];t.forEach(e=>{n.push({Result:e.Result,level:e.level,Notification_Status:e.Notification_Status,Title:e.Title,Employee_ID:e.Employee_ID,Employee_Name:e.Employee_Name,"Begin_Date/_Time":e.Begin_DateAND_Time,"End_Date/_Time":e.End_DateAND_Time,Days_Taken:e.Days_Taken,Status:e.Result,"By User":e.Approved_by})});debugger;l.base.getView().getContent()[0].getSections()[4].setBusy(true);let o=l.base.getView().getContent()[0].getSections()[4];let a=n.sort((e,t)=>{if(e.level>t.level){return 1}else if(e.level<t.level){return-1}else{return 0}});let g=[];let s=[];let i;let r;let m=a.length-1;a.forEach((e,t)=>{i=e.level;if(r!=undefined){if(i!==r){g.push(s);s=[]}}s.push(e);r=e.level;if(t==m){g.push(s)}});o.destroySubSections();o.addSubSection(new sap.uxap.ObjectPageSubSection({}));let p=o.getSubSections();let b=p[p.length-1];try{b.addBlock(new sap.m.ScrollContainer({horizontal:true,vertical:true,visible:true,height:"400px"}))}catch(e){}let v=b.getBlocks()[0];v.addContent(new sap.m.HBox({width:"100%",alignItems:"End",alignContent:"End"}));let f=v.getContent();let A=f[f.length-1];A.addItem(new sap.m.HBox({width:"90%"}));A.addItem(new sap.m.Button({text:"Refresh",press:async function(e){console.log(e);let t="updatee";let n=e.getSource().getModel();console.log();var o=window.location.href;var a=o.split("(");var g=a[1];var s=g.split("'");var i=s[1];let r=await u(n,t,i,"ID");r=JSON.parse(r);debugger;this.getParent().getParent().getParent().getParent().getParent().destroySubSections();w(r)}}));A.addItem(new sap.m.HBox({width:"1%"}));A.addItem(new sap.m.Button({text:"Comment History",press:async function(e){function t(){var e=Math.floor(Math.random()*1e6);var t=(new Date).getTime();var n=t+"-"+e;return n}if(!d){d=new sap.m.Dialog({title:"Approval Comments",endButton:new sap.m.Button({text:"Close",press:async function(){d.close()},layoutData:new sap.m.FlexItemData({growFactor:5,alignSelf:"End"})})})}d.addContent(new sap.m.VBox({width:"60vw"}));let n="getcomments";let o=e.getSource().getModel();console.log();var a=window.location.href;var g=a.split("(");var s=g[1];var i=s.split("'");var r=i[1];let l=await u(o,n,r,"ID");l=JSON.parse(l);const c=[];const m=l[0];if(m==undefined){d.getContent()[0].destroyItems();var p=new sap.suite.ui.commons.TimelineItem({text:"No Comments Found"});d.getContent()[0].addItem(p)}else{l.forEach(e=>{const t=e.createdAt;const n=e.createdBy;const o=e.modifiedAt;const a=e.modifiedBy;const g=e.idd;const s=e.PAN_Number;const i=e.user;const r=e.Comments;const l=e.status;c.push({firsname:i,lname:l,comment:r,dateTime:t})});d.getContent()[0].destroyItems();for(let e=0;e<c.length;e++){var p=new sap.suite.ui.commons.TimelineItem({id:`${"item"+t()}`,dateTime:`${c[e].dateTime}`,title:`${c[e].lname}`,userNameClickable:false,userNameClicked:"onUserNameClick",select:"onPressItems",userPicture:"Photo",text:`${c[e].comment}`,userName:`${c[e].firsname}`});d.mAggregations.content[0].addItem(p)}}d.open()}}));let h=0;g.forEach(e=>{v.addContent(new sap.uxap.ObjectPageSubSection({}));let t=v.getContent();let n=t[t.length-1];n.addBlock(new sap.m.VBox(`Box-${e[0].level}`));let o=n.getBlocks()[0];o.addItem(new sap.m.HBox({alignItems:"Center"}));let a=o.getItems()[0];a.addItem(new sap.m.Label({text:`Level ${e[0].level}`,design:"Bold"}));a.addItem(new sap.m.HBox({width:"40%"}));a.addItem(new sap.m.Label({text:`Notification: `}));if(l.getView().getContent()[0].getHeaderTitle().mAggregations._actionsToolbar.getContent()[4].mProperties.visible==true){a.addItem(new sap.m.Switch({enabled:!l.getView().getContent()[0].getHeaderTitle().mAggregations._actionsToolbar.getContent()[4].mProperties.visible,state:e[0].Notification_Status==="true",type:"AcceptReject",change:async function(e){console.log(e);c.open();let t=e.getSource().getParent().getItems()[0].mProperties.text;let n=t.split(" ");let o=n[1];let a="switch_control";let g=e.getSource().getModel();console.log();var s=window.location.href;var i=s.split("(");var r=i[1];var l=r.split("'");var m=l[1];var d={level:o,PAN_Number:m};let p=await u(g,a,d,"ID");console.log(p);c.close()}}))}else{if(!e[0].Result){a.addItem(new sap.m.Switch({enabled:true,state:e[0].Notification_Status==="true",type:"AcceptReject",change:async function(e){c.open();console.log(e);console.log(e);let t=e.getSource().getParent().getItems()[0].mProperties.text;let n=t.split(" ");let o=n[1];let a="switch_control";let g=e.getSource().getModel();console.log();var s=window.location.href;var i=s.split("(");var r=i[1];var l=r.split("'");var m=l[1];var d={level:o,PAN_Number:m};let p=await u(g,a,d,"ID");console.log(p);c.close()}}))}else{a.addItem(new sap.m.Switch({enabled:false,state:e[0].Notification_Status==="true",type:"AcceptReject",change:async function(e){c.open();console.log(e);console.log(e);let t=e.getSource().getParent().getItems()[0].mProperties.text;let n=t.split(" ");let o=n[1];let a="switch_control";let g=e.getSource().getModel();console.log();var s=window.location.href;var i=s.split("(");var r=i[1];var l=r.split("'");var m=l[1];var d={level:o,PAN_Number:m};let p=await u(g,a,d,"ID");console.log(p);c.close()}}))}}o.addItem(new sap.m.Table({visible:true}));let g=o.getItems()[1];let s=Object.keys(e[0]);s=s.slice(3);let i=[];s.forEach(e=>{if(!i.includes(e)){var t=new sap.m.Column({header:new sap.m.Label({text:e.replace(/_/g," ")}),width:"200px"});g.addColumn(t);i.push(e)}});e.forEach(e=>{let t=[];let n;let o=Object.values(e);o=o.slice(3);let a;o.forEach(e=>{a=new sap.m.Text({text:e});t.push(a)});n=new sap.m.ColumnListItem({cells:t});g.addItem(n)});h=h+1});l.base.getView().getContent()[0].getSections()[4].setBusy(false)}let h=await u(r,s,g,"ID");p=h;if(h==="Pending for Approval"||h==="Approved"||h==="Rejected"){l.getView().getContent()[0].getSections()[3].setVisible(false);this.getView().getContent()[0].getSections()[2].mAggregations._grid.getContent()[0].mAggregations._grid.getContent()[0].getContent().getItems()[1].getDependents()[1].mAggregations.headerToolbar.setVisible(false);l.getView().getContent()[0].setShowEditHeaderButton(false);l.getView().getContent()[0].getHeaderTitle().mAggregations._actionsToolbar.getContent()[4].setEnabled(false);l.getView().getContent()[0].getHeaderTitle().mAggregations._actionsToolbar.getContent()[4].setVisible(false)}else{if(this.getView().getContent()[0].getHeaderTitle().mAggregations._actionsToolbar.getContent()[4].mProperties.visible===true){l.getView().getContent()[0].getSections()[3].setVisible(false);this.getView().getContent()[0].getSections()[2].mAggregations._grid.getContent()[0].mAggregations._grid.getContent()[0].getContent().getItems()[1].getDependents()[1].mAggregations.headerToolbar.setVisible(false);l.getView().getContent()[0].setShowEditHeaderButton(true);l.getView().getContent()[0].getHeaderTitle().mAggregations._actionsToolbar.getContent()[4].setEnabled(true);l.getView().getContent()[0].getHeaderTitle().mAggregations._actionsToolbar.getContent()[4].setVisible(true)}}let C=sap.ui.getCore().byId("panappbeta::tab1ObjectPage--fe::FacetSubSection::VendorData").mAggregations._grid.mAggregations.content[0].getContent().getContent().mAggregations._content.getRows().length;for(let _=0;_<C;_++){sap.ui.getCore().byId("panappbeta::tab1ObjectPage--fe::FacetSubSection::VendorData").mAggregations._grid.mAggregations.content[0].getContent().getContent().mAggregations._content.getRows()[_].getCells()[1].removeStyleClass("css1");sap.ui.getCore().byId("panappbeta::tab1ObjectPage--fe::FacetSubSection::VendorData").mAggregations._grid.mAggregations.content[0].getContent().getContent().mAggregations._content.getRows()[_].getCells()[5].removeStyleClass("css1");sap.ui.getCore().byId("panappbeta::tab1ObjectPage--fe::FacetSubSection::VendorData").mAggregations._grid.mAggregations.content[0].getContent().getContent().mAggregations._content.getRows()[_].getCells()[1].addStyleClass("css1");sap.ui.getCore().byId("panappbeta::tab1ObjectPage--fe::FacetSubSection::VendorData").mAggregations._grid.mAggregations.content[0].getContent().getContent().mAggregations._content.getRows()[_].getCells()[5].addStyleClass("css1")}}catch(S){console.log(S)}finally{c.close()}},onAfterBinding:function(e){debugger;var t=this.getView().getContent()[0].attachSectionChange(function(e){var t=e.getSource().mAggregations.sections[2].mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.items[1].getItems();var n=e.getSource().mAggregations.headerTitle.mAggregations._actionsToolbar.getContent()[4].mProperties.visible;if(n==true||(p==="Pending for Approval"||p==="Approved"||p==="Rejected")){e.getSource().mAggregations.sections[2].mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.getItems()[1].setUploadEnabled(false);for(let e=0;e<t.length;e++){t[e].setVisibleRemove(false);t[e].setEnabledRemove(false)}}else{e.getSource().mAggregations.sections[2].mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.getItems()[1].setUploadEnabled(true);for(let e=0;e<t.length;e++){t[e].setVisibleRemove(true);t[e].setEnabledRemove(true)}}});var n=this.getView().getContent()[0].getHeaderTitle().mAggregations._actionsToolbar.getContent()[4].mProperties.visible;let o=this.getView().getContent()[0].getSections()[2].mAggregations._grid.getContent()[0].mAggregations._grid.getContent()[0].getContent().getItems()[1].getItems();if(!n){this.getView().getContent()[0].getSections()[2].mAggregations._grid.getContent()[0].mAggregations._grid.getContent()[0].getContent().getItems()[1].setUploadEnabled(true);for(let e=0;e<o.length;e++){this.getView().getContent()[0].getSections()[2].mAggregations._grid.getContent()[0].mAggregations._grid.getContent()[0].getContent().getItems()[1].getDependents()[1].mAggregations.headerToolbar.setVisible(true);o[e].setVisibleRemove(true);o[e].setEnabledRemove(true)}}else{this.getView().getContent()[0].getSections()[2].mAggregations._grid.getContent()[0].mAggregations._grid.getContent()[0].getContent().getItems()[1].setUploadEnabled(false);for(let e=0;e<o.length;e++){this.getView().getContent()[0].getSections()[2].mAggregations._grid.getContent()[0].mAggregations._grid.getContent()[0].getContent().getItems()[1].getDependents()[1].mAggregations.headerToolbar.setVisible(false);o[e].setVisibleRemove(false);o[e].setEnabledRemove(false)}}var a=e.oBinding.sPath;const g=/PAN_Number='([^']+)'/;const s=a.match(g);let i=window.location.href;var r=i.split("(");var l=r[1];var c=l.split("'");const m=c[1];debugger}}}})});