sap.ui.define(["sap/ui/core/mvc/ControllerExtension","sap/m/Dialog","sap/ui/core/Fragment","sap/m/library","sap/m/MessageToast","sap/ui/core/routing/History"],function(e,t,n,o,a,g){"use strict";var i=o.ButtonType;var s=o.DialogType;var r=new sap.m.BusyDialog("oBusyDialog");let l;var c;const m=async function(e,t,n,o){console.log(e);let a=e.bindContext(`/${t}(...)`);a.setParameter(o,JSON.stringify(n));await a.execute();let g=a.getBoundContext();let i=g.getObject();if(i){return i.value}else{return""}};return e.extend("panappbeta.ext.controller.Form",{override:{onInit:async function(){},onBeforeRendering:async function(){var e=this.base.getExtensionAPI().getModel();let t=this.base.getExtensionAPI();let n="InsertData";let o={some:"data"};let a=await m(e,n,o,"ID");console.log(a)},editFlow:{onBeforeDiscard:async function(e){let t=window.location.href;var n=t.split("(");var o=n[1];var a=o.split("'");let g=a[1];let i="flag";const s="discard";let r=e.context.getModel().bindContext(`/${i}(...)`);r.setParameter("ID",g);r.setParameter("case",s);await r.execute();const l=r.getBoundContext();var c=l.getValue();console.log(c);sap.ui.getCore().byId("panappbeta::tab1ObjectPage--fe::CustomSubSection::Attachment--uploadSet").mBindingInfos.items.binding.refresh()},onAfterSave:async function(e){let t=window.location.href;var n=t.split("(");var o=n[1];var g=o.split("'");let c=g[1];let d="flag";const p="saved";let u=e.context.getModel().bindContext(`/${d}(...)`);u.setParameter("ID",c);u.setParameter("case",p);await u.execute();const v=u.getBoundContext();var A=v.getValue();console.log(A);l=new sap.m.Dialog({title:"Confirm",type:s.Message,content:new sap.m.Text({text:"   Submit PAN Form For Approval  "}),beginButton:new sap.m.Button({type:i.Emphasized,text:"OK",press:async function(){r.open();const e=this.base.getExtensionAPI().getModel();let t="sendforapproval";let n=window.location.href;let o=window.location.origin;let g=window.location.search;let i=g.split("&");let s=i[0];let c=window.location.hash;c=c.replace("obj1-display","pan_approval-display");c=c.replace("panappbeta","panapproval");c=c.replace("tab1","PAN_Details_APR");var d=n.split("(");var p=d[1];var u=p.split("'");let v="https://btp-dev-0or0hi20.launchpad.cfapps.eu10.hana.ondemand.com/site?siteId=94a17d9a-05b5-425d-b51d-2cd74a2c2762#pan_approval-display?sap-ui-app-id-hint=saas_approuter_panapproval&/PAN_Details_APR('"+u[1]+"')";let A=o+"/site"+s+c;let b={url:A,PAN_Number:u[1],buttonclicked:"sendforApproval"};debugger;var f;try{f=await m(e,t,b,"data")}catch(e){debugger;console.log(e);f=e}l.close();l.destroy();r.close();if(f=="error"){window.alert("Sorry.. Please try again after sometime")}else{a.show("PANForm Submitted for Approval");var h=await sap.ushell.Container.getServiceAsync("Navigation");h.navigate({target:{semanticObject:"obj1",action:"display"}})}console.log(f)}.bind(this)}),endButton:new sap.m.Button({text:"Close",press:async function(){r.open();const e=this.base.getExtensionAPI().getModel();let t="getuserinfo";let n=window.location.href;var o=n.split("(");var a=o[1];var g=a.split("'");let i=g[1];let s=await m(e,t,i,"ID");l.close();l.destroy();r.close();var c=await sap.ushell.Container.getServiceAsync("Navigation");c.navigate({target:{semanticObject:"obj1",action:"display"}})}.bind(this)})});l.open()},onBeforeEdit:async function(e){this.getView().getContent()[0].getSections()[3].setVisible(true);this.getView().getContent()[0].getSections()[2].mAggregations._grid.getContent()[0].mAggregations._grid.getContent()[0].getContent().getItems()[1].getDependents()[1].mAggregations.headerToolbar.setVisible(true)},onBeforeSave:async function(e){debugger;var t=this.base.getView().mAggregations.content[0].mAggregations.sections[2].mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.items[1].mAggregations.items;var n=this.base.getView().mAggregations.content[0].mAggregations.sections[2].mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.items[1].mBindingInfos.items.binding.oCache.aElements.$byPredicate;var o=this.base.getView().mAggregations.content[0].mAggregations.sections[2].mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.items[1].mBindingInfos.items.binding.oCache.aElements.$byPredicate;var a=Object.values(o);for(var g=0;g<a.length;g++){var i=false;for(var s=0;s<t.length;s++){var r=t[s].mProperties.url;var l=/ID=([a-f\d-]+)/i;var c=r.match(l);if(a[g].ID===c[1]){i=true;break}}if(!i){this.base.getView().mAggregations.content[0].mAggregations.sections[2].mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.items[1].mBindingInfos.items.binding.aContexts[g].delete()}}}},routing:{onBeforeBinding:async function(e){try{r.open();const d=this.base.getExtensionAPI().getModel();const p=this;let u=this.base.getExtensionAPI();let v="InsertData";let A={some:"data"};let b=await m(d,v,A,"ID");console.log(b);console.log(b);var t="getData";var n=window.location.href;var o=n.split("(");var a=o[1];var g=a.split("'");var i=g[1];var s=this.base.getAppComponent().getManifestObject()._oBaseUri._string;let f=s+`odata/v4/catalog/tab1?$filter=(PAN_Number%20eq%20%27${g[1]}%27)&$expand=tab1toWORKFLOW_HISTORY`;await $.ajax({url:f,success:function(e){console.log(e);h(e)},error:function(e,t,n){console.error(n)}});function h(e){var t=e.value[0].tab1toWORKFLOW_HISTORY;var n=[];t.forEach(e=>{n.push({Result:e.Result,level:e.level,Notification_Status:e.Notification_Status,Title:e.Title,Employee_ID:e.Employee_ID,Employee_Name:e.Employee_Name,"Begin_Date/_Time":e.Begin_DateAND_Time,"End_Date/_Time":e.End_DateAND_Time,Days_Taken:e.Days_Taken,Approved_by:e.Approved_by})});let o=p.base.getView().getContent()[0].getSections()[4];let a=n.sort((e,t)=>{if(e.level>t.level){return 1}else if(e.level<t.level){return-1}else{return 0}});let g=[];let i=[];let s;let l;let d=a.length-1;a.forEach((e,t)=>{s=e.level;if(l!=undefined){if(s!==l){g.push(i);i=[]}}i.push(e);l=e.level;if(t==d){g.push(i)}});o.destroySubSections();o.addSubSection(new sap.uxap.ObjectPageSubSection({}));let u=o.getSubSections();let v=u[u.length-1];try{v.addBlock(new sap.m.ScrollContainer({horizontal:true,vertical:true,visible:true,height:"400px"}))}catch(e){}let A=v.getBlocks()[0];A.addContent(new sap.m.HBox({width:"100%",alignItems:"End",alignContent:"End"}));let b=A.getContent();let f=b[b.length-1];f.addItem(new sap.m.HBox({width:"90%"}));f.addItem(new sap.m.Button({text:"Refresh",visible:!p.getView().getContent()[0].getHeaderTitle().mAggregations._actionsToolbar.getContent()[4].mProperties.visible,press:async function(e){console.log(e)}}));f.addItem(new sap.m.HBox({width:"1%"}));f.addItem(new sap.m.Button({text:"Comment History",press:async function(e){function t(){var e=Math.floor(Math.random()*1e6);var t=(new Date).getTime();var n=t+"-"+e;return n}if(!c){c=new sap.m.Dialog({title:"Approval Comments",endButton:new sap.m.Button({text:"Close",press:async function(){c.close()},layoutData:new sap.m.FlexItemData({growFactor:5,alignSelf:"End"})})})}c.addContent(new sap.m.VBox({width:"60vw"}));let n="getcomments";let o=e.getSource().getModel();console.log();var a=window.location.href;var g=a.split("(");var i=g[1];var s=i.split("'");var r=s[1];let l=await m(o,n,r,"ID");l=JSON.parse(l);const d=[];const p=l[0];if(p==undefined){c.getContent()[0].destroyItems();var u=new sap.suite.ui.commons.TimelineItem({text:"No Comments Found"});c.getContent()[0].addItem(u)}else{l.forEach(e=>{const t=e.createdAt;const n=e.createdBy;const o=e.modifiedAt;const a=e.modifiedBy;const g=e.idd;const i=e.PAN_Number;const s=e.user;const r=e.Comments;const l=e.status;d.push({firsname:s,lname:l,comment:r,dateTime:t})});c.getContent()[0].destroyItems();for(let e=0;e<d.length;e++){var u=new sap.suite.ui.commons.TimelineItem({id:`${"item"+t()}`,dateTime:`${d[e].dateTime}`,title:`${d[e].lname}`,userNameClickable:false,userNameClicked:"onUserNameClick",select:"onPressItems",userPicture:"Photo",text:`${d[e].comment}`,userName:`${d[e].firsname}`});c.mAggregations.content[0].addItem(u)}}c.open()}}));let h=0;g.forEach(e=>{A.addContent(new sap.uxap.ObjectPageSubSection({}));let t=A.getContent();let n=t[t.length-1];n.addBlock(new sap.m.VBox(`Box-${e[0].level}`));let o=n.getBlocks()[0];o.addItem(new sap.m.HBox({alignItems:"Center"}));let a=o.getItems()[0];a.addItem(new sap.m.Label({text:`Level ${e[0].level}`,design:"Bold"}));a.addItem(new sap.m.HBox({width:"40%"}));a.addItem(new sap.m.Label({text:`Notification: `}));if(p.getView().getContent()[0].getHeaderTitle().mAggregations._actionsToolbar.getContent()[4].mProperties.visible==true){a.addItem(new sap.m.Switch({enabled:!p.getView().getContent()[0].getHeaderTitle().mAggregations._actionsToolbar.getContent()[4].mProperties.visible,state:e[0].Notification_Status==="true",type:"AcceptReject",change:async function(e){console.log(e);r.open();let t=e.getSource().getParent().getItems()[0].mProperties.text;let n=t.split(" ");let o=n[1];let a="switch_control";let g=e.getSource().getModel();console.log();var i=window.location.href;var s=i.split("(");var l=s[1];var c=l.split("'");var d=c[1];var p={level:o,PAN_Number:d};let u=await m(g,a,p,"ID");console.log(u);r.close()}}))}else{if(!e[0].Result){a.addItem(new sap.m.Switch({enabled:true,state:e[0].Notification_Status==="true",type:"AcceptReject",change:async function(e){r.open();console.log(e);console.log(e);let t=e.getSource().getParent().getItems()[0].mProperties.text;let n=t.split(" ");let o=n[1];let a="switch_control";let g=e.getSource().getModel();console.log();var i=window.location.href;var s=i.split("(");var l=s[1];var c=l.split("'");var d=c[1];var p={level:o,PAN_Number:d};let u=await m(g,a,p,"ID");console.log(u);r.close()}}))}else{a.addItem(new sap.m.Switch({enabled:false,state:e[0].Notification_Status==="true",type:"AcceptReject",change:async function(e){r.open();console.log(e);console.log(e);let t=e.getSource().getParent().getItems()[0].mProperties.text;let n=t.split(" ");let o=n[1];let a="switch_control";let g=e.getSource().getModel();console.log();var i=window.location.href;var s=i.split("(");var l=s[1];var c=l.split("'");var d=c[1];var p={level:o,PAN_Number:d};let u=await m(g,a,p,"ID");console.log(u);r.close()}}))}}o.addItem(new sap.m.Table({visible:true}));let g=o.getItems()[1];let i=Object.keys(e[0]);i=i.slice(3);let s=[];i.forEach(e=>{if(!s.includes(e)){var t=new sap.m.Column({header:new sap.m.Label({text:e.replace(/_/g," ")}),width:"200px"});g.addColumn(t);s.push(e)}});e.forEach(e=>{let t=[];let n;let o=Object.values(e);o=o.slice(3);let a;o.forEach(e=>{a=new sap.m.Text({text:e});t.push(a)});n=new sap.m.ColumnListItem({cells:t});g.addItem(n)});h=h+1})}let w=await m(d,t,i,"ID");if(w==="Pending for Approval"||w==="Approved"||w==="Rejected"){p.getView().getContent()[0].getSections()[3].setVisible(false);this.getView().getContent()[0].getSections()[2].mAggregations._grid.getContent()[0].mAggregations._grid.getContent()[0].getContent().getItems()[1].getDependents()[1].mAggregations.headerToolbar.setVisible(false);p.getView().getContent()[0].setShowEditHeaderButton(false);p.getView().getContent()[0].getHeaderTitle().mAggregations._actionsToolbar.getContent()[4].setEnabled(false);p.getView().getContent()[0].getHeaderTitle().mAggregations._actionsToolbar.getContent()[4].setVisible(false)}else{if(this.getView().getContent()[0].getHeaderTitle().mAggregations._actionsToolbar.getContent()[4].mProperties.visible===true){p.getView().getContent()[0].getSections()[3].setVisible(false);this.getView().getContent()[0].getSections()[2].mAggregations._grid.getContent()[0].mAggregations._grid.getContent()[0].getContent().getItems()[1].getDependents()[1].mAggregations.headerToolbar.setVisible(false);p.getView().getContent()[0].setShowEditHeaderButton(true);p.getView().getContent()[0].getHeaderTitle().mAggregations._actionsToolbar.getContent()[4].setEnabled(true);p.getView().getContent()[0].getHeaderTitle().mAggregations._actionsToolbar.getContent()[4].setVisible(true)}}var l=this.base.getView().getContent()[0];l.attachSectionChange(function(){var e=this.getScrollingSectionId();var t=sap.ui.getCore().byId(`${e}`).mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.content.mAggregations.columns;if(t!=undefined)t.forEach(t=>{let n=t.mProperties.dataProperty;let o=n.length;let a=sap.ui.getCore().byId(`${e}`).mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.content.mAggregations._content.mBindingInfos.rows.binding.oCache.getValue();const g=Math.max(...a.map(e=>e[n].length??8));if(g>o)o=g;const i=o*8+20+"px";t.setWidth(i)})})}catch(C){console.log(C)}finally{r.close()}},onAfterBinding:function(e){var t=this.getView().getContent()[0].attachSectionChange(function(e){var t=e.getSource().mAggregations.sections[2].mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.items[1].getItems();var n=e.getSource().mAggregations.headerTitle.mAggregations._actionsToolbar.getContent()[4].mProperties.visible;if(n==true){e.getSource().mAggregations.sections[2].mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.getItems()[1].setUploadEnabled(false);for(let e=0;e<t.length;e++){t[e].setVisibleRemove(false);t[e].setEnabledRemove(false)}}else{e.getSource().mAggregations.sections[2].mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.getItems()[1].setUploadEnabled(true);for(let e=0;e<t.length;e++){t[e].setVisibleRemove(true);t[e].setEnabledRemove(true)}}});var n=this.getView().getContent()[0].getHeaderTitle().mAggregations._actionsToolbar.getContent()[4].mProperties.visible;let o=this.getView().getContent()[0].getSections()[2].mAggregations._grid.getContent()[0].mAggregations._grid.getContent()[0].getContent().getItems()[1].getItems();if(!n){this.getView().getContent()[0].getSections()[2].mAggregations._grid.getContent()[0].mAggregations._grid.getContent()[0].getContent().getItems()[1].setUploadEnabled(true);for(let e=0;e<o.length;e++){this.getView().getContent()[0].getSections()[2].mAggregations._grid.getContent()[0].mAggregations._grid.getContent()[0].getContent().getItems()[1].getDependents()[1].mAggregations.headerToolbar.setVisible(true);o[e].setVisibleRemove(true);o[e].setEnabledRemove(true)}}else{this.getView().getContent()[0].getSections()[2].mAggregations._grid.getContent()[0].mAggregations._grid.getContent()[0].getContent().getItems()[1].setUploadEnabled(false);for(let e=0;e<o.length;e++){this.getView().getContent()[0].getSections()[2].mAggregations._grid.getContent()[0].mAggregations._grid.getContent()[0].getContent().getItems()[1].getDependents()[1].mAggregations.headerToolbar.setVisible(false);o[e].setVisibleRemove(false);o[e].setEnabledRemove(false)}}var a=e.oBinding.sPath;const g=/PAN_Number='([^']+)'/;const i=a.match(g);let s=window.location.href;var r=s.split("(");var l=r[1];var c=l.split("'");const m=c[1];var d=this.base.getView().getContent()[0].getSections()[2].mAggregations._grid.getContent()[0].mAggregations._grid.getContent()[0].getContent().getItems()[1].mBindingInfos.items.binding;d.filter(new sap.ui.model.Filter({path:"PAN_Number",operator:sap.ui.model.FilterOperator.EQ,value1:m}))}}}})});