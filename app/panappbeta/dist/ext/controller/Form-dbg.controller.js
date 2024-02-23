sap.ui.define(['sap/ui/core/mvc/ControllerExtension', "sap/m/Dialog", "sap/ui/core/Fragment", "sap/m/library", "sap/m/MessageToast"], function (ControllerExtension, Dialog, Fragment, library, MessageToast) {
	'use strict';
	// var oUserInfoService = sap.ushell.Container.getService("UserInfo");
	// var oUser = oUserInfoService.getUser();
	var ButtonType = library.ButtonType;
	var DialogType = library.DialogType;
	var oBusyDialog = new sap.m.BusyDialog("oBusyDialog");
	let dialog;
	var cdialog;
	const Fimport = async function (oModel, name, data, param) {
		debugger
		console.log(oModel);
		let oFunction = oModel.bindContext(`/${name}(...)`);
		// let oFunction = oModel.bindContext(`/Books`);

		oFunction.setParameter(param, JSON.stringify(data));
		// oFunction.setParameter("Book",{ID:3, title: "BookTitle", stock:10000});
		await oFunction.execute();
		// console.log(response);

		let oContext = oFunction.getBoundContext();

		let result = oContext.getObject();
		// console.log(result);
		if (result) {
			return result.value;
		} else {
			return "";
		}
	};

	return ControllerExtension.extend('panappbeta.ext.controller.Form', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
			 * Called when a controller is instantiated and its View controls (if available) are already created.
			 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
			 * @memberOf panappbeta.ext.controller.Form
			 */
			onInit: async function () {
				debugger
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				// var oModel = this.base.getExtensionAPI().getModel();
				// let oExtensionAPI = this.base.getExtensionAPI();
				// 	// this.getView().getContent()[0].getHeader().getContent()[0].getItems()[0].getContent().addFilterItem(new sap.m.Button({
				// 	// 	text:"Sync",
				// 	// 	press: async function(oEvent){debugger
				// 	// 		console.log(oEvent);
				// 	// 	}
				// 	// }));
				// 	// let oModel = oExtensionAPI.getModel();
				// 	let sFunctionName = "InsertData";
				// 	let oFunction = sap.ui.getCore().byId("panappbeta::tab1List--fe::table::tab1::LineItem").getModel().bindContext(`/${sFunctionName}(...)`);
				// 	// let oFunction = oModel.bindContext(`/Books`);
				// 	let data = {some: "data"};
				// 	oFunction.setParameter("ID",JSON.stringify(data));
				// 	// oFunction.setParameter("Book",{ID:3, title: "BookTitle", stock:10000});
				// 	await oFunction.execute();
				// 	// console.log(response);

				// 	let oContext = oFunction.getBoundContext();

				// 	let result = oContext.getObject();
				// 	console.log(result);
			},
			onBeforeRendering: async function () {
				debugger

				var oModel = this.base.getExtensionAPI().getModel();
				let oExtensionAPI = this.base.getExtensionAPI();
				// this.getView().getContent()[0].getHeader().getContent()[0].getItems()[0].getContent().addFilterItem(new sap.m.Button({
				// 	text:"Sync",
				// 	press: async function(oEvent){debugger
				// 		console.log(oEvent);
				// 	}
				// }));
				// let oModel = oExtensionAPI.getModel();
				let sFunctionName = "InsertData";
				let data = { some: "data" };
				debugger
				let result = await Fimport(oModel, sFunctionName, data, "ID")
				console.log(result);
			},
			editFlow: {
				onAfterSave: async function (oEvent) {
					debugger
					dialog = new sap.m.Dialog({
						title: "Confirm",
						type: DialogType.Message,
						content: new sap.m.Text({ text: "   Submit PAN Form For Approval  " }),
						beginButton: new sap.m.Button({
							type: ButtonType.Emphasized,
							text: "OK",
							press: async function () {
								debugger
								// for(let i=0;i<2;i++){
								oBusyDialog.open();
								const oModel = this.base.getExtensionAPI().getModel();
								let sFunctionName = "sendforapproval";
								// let oFunction = oModel.bindContext(`/${sFunctionName}(...)`);
								let appr_url = window.location.href;
								// let nav_url = appr_url.split("obj1-display");
								let nav_url = window.location.origin;
								let search = window.location.search;
								let nav = search.split("&");
								let nav1 = nav[0];
								let hash = window.location.hash;
								hash = hash.replace("obj1-display","pan_approval-display");
								hash = hash.replace("panappbeta","panapproval");
								hash = hash.replace("tab1","PAN_Details_APR");
								
								var pieces = appr_url.split("(");
								var res = pieces[1];
								var res1 = res.split("'");

								let comp_url = "https://btp-dev-0or0hi20.launchpad.cfapps.eu10.hana.ondemand.com/site?siteId=94a17d9a-05b5-425d-b51d-2cd74a2c2762#pan_approval-display?sap-ui-app-id-hint=saas_approuter_panapproval&/PAN_Details_APR('" + res1[1] + "')";
								// let comp = nav_url[0]+"pan_approval-display?sap-ui-app-id-hint=saas_approuter_panapproval&/PAN_Details_APR('" + res1[1] + "')";
								// let oFunction = oModel.bindContext(`/Books`);
								// let data = {some: "data"};
								let comp = nav_url+nav1+hash;
								let body = {
									"url": comp_url,
									"PAN_Number": res1[1],
									"buttonclicked": "sendforApproval"
								};
								// oFunction.setParameter("data", JSON.stringify(body));

								// await oFunction.execute();
								// let oContext = oFunction.getBoundContext();

								debugger
								// let result = oContext.getObject();
								let result = await Fimport(oModel, sFunctionName, body, "data")
								let value = JSON.parse(result);
								console.log(value);
								dialog.close();
								dialog.destroy();
								// dialog.exit();
								MessageToast.show("PANForm Submitted for Approval");
								// let oRouter=sap.ui.core.UIComponent.getRouterFor(this);

								oBusyDialog.close();
								// oRouter.navTo("tab1List");
								// this.extensionAPI.refresh()
								// this.getBindingContext().refresh();
								// if (sPreviousHash !== undefined) {
								// window.history.go(-1);
								var href_For_Product_display = await sap.ushell.Container.getServiceAsync("Navigation");

								href_For_Product_display.navigate({
									target: { semanticObject: "obj1", action: "display" }
								});
								// };

								console.log(result);

								// }
							}.bind(this)
						}),
						endButton: new sap.m.Button({
							text: "Close",
							press: async function () {
								debugger
								// for(let i=0;i<2;i++){
								oBusyDialog.open();
								const oModel = this.base.getExtensionAPI().getModel();
								let sFunctionName = "getuserinfo";
								// let oFunction = oModel.bindContext(`/${sFunctionName}(...)`);
								let appr_url = window.location.href;
								var pieces = appr_url.split("(");
								var res = pieces[1];
								var res1 = res.split("'");
								let data = res1[1];
								// oFunction.setParameter("ID", data);

								// await oFunction.execute();
								// let oContext = oFunction.getBoundContext();

								// let result = oContext.getObject();
								debugger
								let result = await Fimport(oModel, sFunctionName, data, "ID");
								dialog.close();
								dialog.destroy();
								oBusyDialog.close();
								// window.history.go(-1);
								var href_For_Product_display = await sap.ushell.Container.getServiceAsync("Navigation");

								href_For_Product_display.navigate({
									target: { semanticObject: "obj1", action: "display" }
								});
								// dialog.exit();
								// }
							}.bind(this)
						})
					});
					// }
					// this.getView().addDependent(dialog); 
					dialog.open();

				},
				onBeforeSave: async function (oEvent) {
					debugger
					// return this._createDialog("Do you want to submit this really nice... object ?");
					let sFunctionName = "draft";
					let oFunction = oEvent.context.getModel();
					let appr_url = window.location.href;
					var pieces = appr_url.split("(");
					var res = pieces[1];
					var res1 = res.split("'");
					let data = res1[1];
					// oFunction.setParameter("ID", data);

					// await oFunction.execute();
					// let oContext = oFunction.getBoundContext();
					debugger

					let result = await Fimport(oFunction, sFunctionName, data, "ID");
					console.log(result);
				},
			},
			// onAfterRendering: function () {
			// 	// this.base.editFlow.onBeforeEdit(function(){
			// 	// 	debugger;
			// 	// });
			// 	debugger
			// 	let uploadsetitem = this.base.getView().mAggregations.content[0].mAggregations.sections[2].mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.items[1].mBindingInfos.items.path;
			// 	uploadsetitem = "/attachments?$filter=PAN_Number eq 'pan123'";
			// 	// this.func = async function (oEvent) {
			// 	// 	debugger
			// 		// if(!dialog){
			// 	// 	dialog = new sap.m.Dialog({
			// 	// 		title: "Confirm",
			// 	// 		content: new sap.m.Text({ text: "   Submit PAN Form For Approval  " }),
			// 	// 		beginButton: new sap.m.Button({
			// 	// 			type: ButtonType.Emphasized,
			// 	// 			text: "OK",
			// 	// 			press: async function () {
			// 	// 				debugger
			// 	// 				// for(let i=0;i<2;i++){
			// 	// 				oBusyDialog.open();
			// 	// 				const oModel = this.base.getExtensionAPI().getModel();
			// 	// 				let sFunctionName = "sendforapproval";
			// 	// 				// let oFunction = oModel.bindContext(`/${sFunctionName}(...)`);
			// 	// 				let appr_url = window.location.href;
			// 	// 				var pieces = appr_url.split("(");
			// 	// 				var res = pieces[1];
			// 	// 				var res1 = res.split("'");
			// 	// 				let comp_url = "https://btp-dev-0or0hi20.launchpad.cfapps.eu10.hana.ondemand.com/site?siteId=94a17d9a-05b5-425d-b51d-2cd74a2c2762#pan_approval-display?sap-ui-app-id-hint=saas_approuter_panapproval&/PAN_Details_APR('" + res1[1] + "')";
			// 	// 				// let oFunction = oModel.bindContext(`/Books`);
			// 	// 				// let data = {some: "data"};
			// 	// 				let body = {
			// 	// 					"url": comp_url,
			// 	// 					"PAN_Number": res1[1],
			// 	// 					"buttonclicked": "sendforApproval"
			// 	// 				};
			// 	// 				// oFunction.setParameter("data", JSON.stringify(body));

			// 	// 				// await oFunction.execute();
			// 	// 				// let oContext = oFunction.getBoundContext();

			// 	// 				debugger
			// 	// 				// let result = oContext.getObject();
			// 	// 				let result = await Fimport(oModel,sFunctionName,body,"data")
			// 	// 				let value = JSON.parse(result);
			// 	// 				console.log(value);
			// 	// 				dialog.close();
			// 	// 				dialog.destroy();
			// 	// 				// dialog.exit();
			// 	// 				MessageToast.show("PANForm Submitted for Approval");
			// 	// 				// let oRouter=sap.ui.core.UIComponent.getRouterFor(this);

			// 	// 				oBusyDialog.close();
			// 	// 				// oRouter.navTo("tab1List");
			// 	// 				// this.extensionAPI.refresh()
			// 	// 				// this.getBindingContext().refresh();
			// 	// 				// if (sPreviousHash !== undefined) {
			// 	// 				// window.history.go(-1);
			// 	// 				var href_For_Product_display = await sap.ushell.Container.getServiceAsync("Navigation");

			// 	// 				href_For_Product_display.navigate({
			// 	// 					target: { semanticObject: "obj1", action: "display" }
			// 	// 				});
			// 	// 				// };

			// 	// 				console.log(result);

			// 	// 				// }
			// 	// 			}.bind(this)
			// 	// 		}),
			// 	// 		endButton: new sap.m.Button({
			// 	// 			text: "Close",
			// 	// 			press: async function () {
			// 	// 				debugger
			// 	// 				// for(let i=0;i<2;i++){
			// 	// 				oBusyDialog.open();
			// 	// 				const oModel = this.base.getExtensionAPI().getModel();
			// 	// 				let sFunctionName = "getuserinfo";
			// 	// 				// let oFunction = oModel.bindContext(`/${sFunctionName}(...)`);
			// 	// 				let appr_url = window.location.href;
			// 	// 				var pieces = appr_url.split("(");
			// 	// 				var res = pieces[1];
			// 	// 				var res1 = res.split("'");
			// 	// 				let data = res1[1];
			// 	// 				// oFunction.setParameter("ID", data);

			// 	// 				// await oFunction.execute();
			// 	// 				// let oContext = oFunction.getBoundContext();

			// 	// 				// let result = oContext.getObject();
			// 	// 				debugger
			// 	// 				let result = await Fimport(oModel,sFunctionName,data,"ID");
			// 	// 				dialog.close();
			// 	// 				dialog.destroy();
			// 	// 				oBusyDialog.close();
			// 	// 				// window.history.go(-1);
			// 	// 				var href_For_Product_display = await sap.ushell.Container.getServiceAsync("Navigation");

			// 	// 				href_For_Product_display.navigate({
			// 	// 					target: { semanticObject: "obj1", action: "display" }
			// 	// 				});
			// 	// 				// dialog.exit();
			// 	// 				// }
			// 	// 			}.bind(this)
			// 	// 		})
			// 	// 	});
			// 	// 	// }
			// 	// 	// this.getView().addDependent(dialog); 
			// 	// 	dialog.open();

			// 	// }
			// 	// if (this.base.getExtensionAPI().getEditFlow() !== undefined) {
			// 	// 	debugger
			// 	// 	this.base.getExtensionAPI().getEditFlow().attachonAfterSave(this.func.bind(this));
			// 	// }
			// 	// this.draft = async function (oEvent) {
			// 	// 	debugger
			// 	// 	let sFunctionName = "draft";
			// 	// 	let oFunction = oModel.bindContext(`/${sFunctionName}(...)`);
			// 	// 	let appr_url = window.location.href;
			// 	// 	var pieces = appr_url.split("(");
			// 	// 	var res = pieces[1];
			// 	// 	var res1 = res.split("'");
			// 	// 	let data = res1[1];
			// 	// 	oFunction.setParameter("ID", data);

			// 	// 	await oFunction.execute();
			// 	// 	let oContext = oFunction.getBoundContext();

			// 	// 	let result = oContext.getObject();
			// 	// 	console.log(result);
			// 	// }
			// 	// if(this.base.getExtensionAPI().getEditFlow()!== undefined){debugger
			// 	// 	this.base.getExtensionAPI().getEditFlow().onBeforeSave(this.draft.bind(this));
			// 	// }

			// 	// this.base.getExtensionAPI().getEditFlow().attachonAfterSave(this.onDialog.bind(this));
			// },

			routing: {
				onBeforeBinding: async function (oBindingContext) {
					debugger
					oBusyDialog.open();

					const oModel = this.base.getExtensionAPI().getModel();
					const that = this;
					// var oModel = this.base.getExtensionAPI().getModel();
					let oExtensionAPI = this.base.getExtensionAPI();
					// this.getView().getContent()[0].getHeader().getContent()[0].getItems()[0].getContent().addFilterItem(new sap.m.Button({
					// 	text:"Sync",
					// 	press: async function(oEvent){debugger
					// 		console.log(oEvent);
					// 	}
					// }));
					// let oModel = oExtensionAPI.getModel();
					// let FunctionName = "InsertData";
					// let Function = oModel.bindContext(`/${FunctionName}(...)`);
					// // let oFunction = oModel.bindContext(`/Books`);
					// let dat = { some: "data" };
					// Function.setParameter("ID", JSON.stringify(dat));
					// // oFunction.setParameter("Book",{ID:3, title: "BookTitle", stock:10000});
					// await Function.execute();
					// // console.log(response);

					// let oContext = Function.getBoundContext();
					let FunctionName = "InsertData";
					let dat = { some: "data" };
					debugger
					let result = await Fimport(oModel, FunctionName, dat, "ID")
					console.log(result);

					// let result = oContext.getObject();
					console.log(result);
					// var v = that.getView().getContent()[0].getHeaderTitle().mAggregations._actionsToolbar.getContent()[4].mProperties.visible;
					// // this.getView().getContent()[0].getSections()[2].mAggregations._grid.getContent()[0].mAggregations._grid.getContent()[0].getContent().getItems()[1].getItems()[0].setVisibleRemove(!v);
					// let uploadsetitems_list = this.getView().getContent()[0].getSections()[2].mAggregations._grid.getContent()[0].mAggregations._grid.getContent()[0].getContent().getItems()[1].getItems();
					// debugger
					// // setTimeout(() => {
					// // if (v == false) {
					// // 	this.getView().getContent()[0].getSections()[2].mAggregations._grid.getContent()[0].mAggregations._grid.getContent()[0].getContent().getItems()[1].setUploadEnabled(true)
					// // 	for (let i = 0; i < uploadsetitems_list.length; i++) {
					// // 		this.getView().getContent()[0].getSections()[2].mAggregations._grid.getContent()[0].mAggregations._grid.getContent()[0].getContent().getItems()[1].getDependents()[1].mAggregations.headerToolbar.setVisible(true);
					// // 		uploadsetitems_list[i].setVisibleRemove(true);
					// // 		uploadsetitems_list[i].setEnabledRemove(true);

					// // 	}
					// // }
					// // else {
					// // this.getView().getContent()[0].getSections()[2].mAggregations._grid.getContent()[0].mAggregations._grid.getContent()[0].getContent().getItems()[1].setUploadEnabled(false)
					// // for (let i = 0; i < uploadsetitems_list.length; i++) {
					// // 	this.getView().getContent()[0].getSections()[2].mAggregations._grid.getContent()[0].mAggregations._grid.getContent()[0].getContent().getItems()[1].getDependents()[1].mAggregations.headerToolbar.setVisible(false);
					// // 	uploadsetitems_list[i].setVisibleRemove(false);
					// // 	uploadsetitems_list[i].setEnabledRemove(false);

					// // }
					// // }
					// // }, 1000);

					// var Name = "getuserinfo";

					var sFunctionName = "getData";
					// oFunction = oModel.bindContext(`/${Name}(...)`);
					var complete_url = window.location.href;
					var pieces = complete_url.split("(");
					var res = pieces[1];
					//    var res = pieces[1];
					var res1 = res.split("'");
					var data = res1[1];
					// 	oFunction.setParameter("ID",data);
					// await oFunction.execute();debugger
					//  var oContext = oFunction.getBoundContext();

					//  var res = oContext.getObject();
					//  debugger
					// await oFunction.execute();

					// 	 var complete_url = window.location.href;
					// 	 var pieces = complete_url.split("(");
					// 	 var res = pieces[1];
					//   //    var res = pieces[1];
					// 	 var res1 = res.split("'");
					var baseUrl = this.base.getAppComponent().getManifestObject()._oBaseUri._string;
					//  let url =`/odata/v4/pan-approval/PAN_Details_APR/${res1[1]}/tab1toWORKFLOW_HISTORY`;
					let url = baseUrl+`odata/v4/catalog/tab1?$filter=(PAN_Number%20eq%20%27${res1[1]}%27)&$expand=tab1toWORKFLOW_HISTORY`
					// let url =`/odata/v4/catalog/tab1?$filter=(PAN_Number%20eq%20%27${res1[1]}%27)&$expand=tab1toWORKFLOW_HISTORY`
					debugger
					await $.ajax({
						url: url,
						success: function (result) {
							debugger
							// Code inside this function will execute after the AJAX call successfully completes
							console.log(result);

							// Call a function and pass the result data to it
							processData(result);
						},
						error: function (xhr, status, error) {
							debugger
							// Handle errors if any
							console.error(error);
						}
					});

					// Define a function to process the result data
					function processData(result) {
						debugger

						var dataa = result.value[0].tab1toWORKFLOW_HISTORY;
						var data = [];
						dataa.forEach(element => {
							debugger
							data.push({
								Result: element.Result,
								level: element.level,
								Notification_Status: element.Notification_Status,
								Title: element.Title,
								Employee_ID: element.Employee_ID,
								Employee_Name: element.Employee_Name,
								"Begin_Date/_Time": element.Begin_DateAND_Time,
								"End_Date/_Time": element.End_DateAND_Time,
								Days_Taken: element.Days_Taken,
								Approved_by: element.Approved_by,
							});
						});

						let oSection = that.base.getView().getContent()[0].getSections()[4];

						//   SORT DATA BY LEVEL
						let sortedData = data.sort((d1, d2) => (d1.level > d2.level) ? 1 : (d1.level < d2.level) ? -1 : 0);

						// this.sortedData = sortedData;

						let target = [];
						let innerArray = [];
						let level;
						let levelp;
						let len = sortedData.length - 1;

						// SEPARATE DATA BY LEVEL
						sortedData.forEach((item, index) => {
							level = item.level;
							if (levelp != undefined) {
								if (level !== levelp) {
									target.push(innerArray);
									innerArray = [];
								}
							}
							innerArray.push(item);
							levelp = item.level;
							if (index == len) {
								target.push(innerArray);
							}
						});

						// GENERATE TABLE UI

						oSection.destroySubSections();
						//   oSection.addCustomAction(new sap.m.Dialog({
						// 	"title":"Approval History"
						//   }));

						oSection.addSubSection(new sap.uxap.ObjectPageSubSection({
							// title: `Level ${levelArray[0].level}`
						}));

						let subSections = oSection.getSubSections();
						let oSubSection = subSections[subSections.length - 1];

						try {
							oSubSection.addBlock(new sap.m.ScrollContainer({
								horizontal: true,
								vertical: true,
								visible: true,
								height: "400px"
							}))
						} catch (error) {
							//   window.location.reload();
						}
						let oScroll = oSubSection.getBlocks()[0];

						oScroll.addContent(new sap.m.HBox({
							width: "100%",
							alignItems: "End",
							alignContent: "End"
						}));
						//   let RsubSections = oScroll.getContent();
						//   let RButtonHbox  = RsubSections[RsubSections.length - 1];
						//   RButtonHbox.addItem(new sap.m.HBox({
						// 	width:"90%"
						//   }));

						let BsubSections = oScroll.getContent();
						let ButtonHbox = BsubSections[BsubSections.length - 1];
						ButtonHbox.addItem(new sap.m.HBox({
							width: "90%"
						}))
						ButtonHbox.addItem(new sap.m.Button({
							text: "Refresh",
							visible: !(that.getView().getContent()[0].getHeaderTitle().mAggregations._actionsToolbar.getContent()[4].mProperties.visible),
							press: async function (oEvent) {
								console.log(oEvent);
							}
						}));
						ButtonHbox.addItem(new sap.m.HBox({
							width: "1%"
						}));
						ButtonHbox.addItem(new sap.m.Button({
							text: "Comment History",
							press: async function (oEvent) {
								debugger
								function generateUniqueId() {
									// Generate a random number
									var randomNumber = Math.floor(Math.random() * 1000000);

									// Get the current timestamp
									var timestamp = new Date().getTime();

									// Combine timestamp and random number to create a unique ID
									var uniqueId = timestamp + '-' + randomNumber;

									return uniqueId;
								}
								if (!cdialog) {
									cdialog = new sap.m.Dialog({
										title: "Approval Comments",
										endButton: new sap.m.Button({
											text: "Close",
											press: async function () {
												debugger
												cdialog.close();
											},
											layoutData: new sap.m.FlexItemData({ // Add layoutData for flexible item behavior
												growFactor: 5,
												alignSelf: "End" // Align the button to the end (right)
											})
										})
									})
								}
								cdialog.addContent(new sap.m.VBox({
									width: "60vw"
								}));


								let functionname = 'getcomments';
								// let oFunction = oEvent.getSource().getModel().bindContext(`/${functionname}(...)`);
								let oFunction = oEvent.getSource().getModel();
								console.log();
								var complete_url = window.location.href;
								var pieces = complete_url.split("(");
								var res = pieces[1];
								//    var res = pieces[1];
								var res1 = res.split("'");
								var panNumber = res1[1];
								// oFunction.setParameter('ID', panNumber);
								// await oFunction.execute();
								// const oContext = oFunction.getBoundContext();
								// let resVal = oContext.getValue();
								debugger
								let resVal = await Fimport(oFunction, functionname, panNumber, "ID")
								resVal = JSON.parse(resVal);

								const data = [];
								const entry = resVal[0];
								if (entry == undefined) {
									debugger
									cdialog.getContent()[0].destroyItems();
									var oTimelineItem = new sap.suite.ui.commons.TimelineItem({
										// id: `${"item" + generateUniqueId()}`,
										// dateTime: `${data[i].dateTime}`,
										// title: `${data[i].lname}`,
										// userNameClickable: false,
										// userNameClicked: "onUserNameClick",
										// select: "onPressItems",
										// userPicture: "Photo",
										text: 'No Comments Found',
										// userName: `${data[i].firsname}`,
									});
									cdialog.getContent()[0].addItem(oTimelineItem);
								}
								else {
									resVal.forEach(entry => {
										const createdAt = entry.createdAt;
										const createdBy = entry.createdBy;
										const modifiedAt = entry.modifiedAt;
										const modifiedBy = entry.modifiedBy;
										const idd = entry.idd;
										const pannum = entry.PAN_Number;
										const user = entry.user;
										const comments = entry.Comments;
										const status = entry.status;

										data.push({
											firsname: user,
											lname: status,
											comment: comments,
											dateTime: createdAt,
											// dateTime : "dfghjk",
										})
									});
									cdialog.getContent()[0].destroyItems();
									for (let i = 0; i < data.length; i++) {
										debugger
										// var currentDate = new Date();
										// var currentDateTime = currentDate.toISOString();
										var oTimelineItem = new sap.suite.ui.commons.TimelineItem({
											id: `${"item" + generateUniqueId()}`,
											dateTime: `${data[i].dateTime}`,
											title: `${data[i].lname}`,
											userNameClickable: false,
											userNameClicked: "onUserNameClick",
											select: "onPressItems",
											userPicture: "Photo",
											text: `${data[i].comment}`,
											userName: `${data[i].firsname}`,
										});

										cdialog.mAggregations.content[0].addItem(oTimelineItem);
									}


								}
								cdialog.open();



							}
						}));

						let i = 0;
						target.forEach((levelArray) => {
							oScroll.addContent(new sap.uxap.ObjectPageSubSection({
								// title: `Level ${levelArray[0].level}`
							}));

							let subSections = oScroll.getContent();
							let oSubSection = subSections[subSections.length - 1];
							oSubSection.addBlock(new sap.m.VBox(`Box-${levelArray[0].level}`));
							let Box = oSubSection.getBlocks()[0];
							// a++
							Box.addItem(new sap.m.HBox({
								alignItems: "Center"
							}));

							// LINK/TITLE

							let oHBox = Box.getItems()[0];
							oHBox.addItem(new sap.m.Label({
								text: `Level ${levelArray[0].level}`,
								design: "Bold"
							}));
							oHBox.addItem(new sap.m.HBox({
								width: "40%"
							}));



							oHBox.addItem(new sap.m.Label({
								text: `Notification: `,
								// design: "Bold"
							}));
							debugger
							if (that.getView().getContent()[0].getHeaderTitle().mAggregations._actionsToolbar.getContent()[4].mProperties.visible == true) {
								// if((!levelArray[0].Notification_Status)||(levelArray[0].Notification_Status==0)){
								oHBox.addItem(new sap.m.Switch({
									enabled: !(that.getView().getContent()[0].getHeaderTitle().mAggregations._actionsToolbar.getContent()[4].mProperties.visible),
									state: levelArray[0].Notification_Status === 'true',
									type: "AcceptReject",
									change: async function (oEvent) {
										debugger
										console.log(oEvent);
										oBusyDialog.open();
										let text = oEvent.getSource().getParent().getItems()[0].mProperties.text;
										let tex = text.split(" ");
										let level = tex[1];
										let functionname = 'switch_control';
										// let oFunction = oEvent.getSource().getModel().bindContext(`/${functionname}(...)`);
										let oFunction = oEvent.getSource().getModel();
										console.log();
										var complete_url = window.location.href;
										var pieces = complete_url.split("(");
										var res = pieces[1];
										//    var res = pieces[1];
										var res1 = res.split("'");
										var panNumber = res1[1];
										var ID = {
											"level": level,
											"PAN_Number": panNumber
										}
										// oFunction.setParameter('ID', JSON.stringify(ID));
										// await oFunction.execute();
										// const oContext = oFunction.getBoundContext();
										// let resVal = oContext.getValue();
										debugger
										let resVal = await Fimport(oFunction, functionname, ID, "ID");
										// resVal = JSON.parse(resVal.value);
										console.log(resVal);
										oBusyDialog.close();

									}
								}));

							}
							else {
								if (!levelArray[0].Result) {
									oHBox.addItem(new sap.m.Switch({
										enabled: true,
										state: levelArray[0].Notification_Status === 'true',
										type: "AcceptReject",
										change: async function (oEvent) {
											debugger
											oBusyDialog.open();
											console.log(oEvent)
											console.log(oEvent);
											let text = oEvent.getSource().getParent().getItems()[0].mProperties.text;
											let tex = text.split(" ");
											let level = tex[1];
											let functionname = 'switch_control';
											// let oFunction = oEvent.getSource().getModel().bindContext(`/${functionname}(...)`);
											let oFunction = oEvent.getSource().getModel();
											console.log();
											var complete_url = window.location.href;
											var pieces = complete_url.split("(");
											var res = pieces[1];
											//    var res = pieces[1];
											var res1 = res.split("'");
											var panNumber = res1[1];
											var ID = {
												"level": level,
												"PAN_Number": panNumber
											}
											// oFunction.setParameter('ID', JSON.stringify(ID));
											// await oFunction.execute();
											// const oContext = oFunction.getBoundContext();
											// let resVal = oContext.getValue();
											debugger
											let resVal = await Fimport(oFunction, functionname, ID, "ID");
											// resVal = JSON.parse(resVal.value);
											console.log(resVal);
											oBusyDialog.close();

										}
									}));


								} else {
									// if((!levelArray[0].Notification_Status)||(levelArray[0].Notification_Status==0)){
									oHBox.addItem(new sap.m.Switch({
										enabled: false,
										state: levelArray[0].Notification_Status === 'true',
										type: "AcceptReject",
										change: async function (oEvent) {
											oBusyDialog.open();
											console.log(oEvent);
											console.log(oEvent);
											let text = oEvent.getSource().getParent().getItems()[0].mProperties.text;
											let tex = text.split(" ");
											let level = tex[1];
											let functionname = 'switch_control';
											// let oFunction = oEvent.getSource().getModel().bindContext(`/${functionname}(...)`);
											let oFunction = oEvent.getSource().getModel();
											console.log();
											var complete_url = window.location.href;
											var pieces = complete_url.split("(");
											var res = pieces[1];
											//    var res = pieces[1];
											var res1 = res.split("'");
											var panNumber = res1[1];
											var ID = {
												"level": level,
												"PAN_Number": panNumber
											}
											// oFunction.setParameter('ID', JSON.stringify(ID));
											// await oFunction.execute();
											// const oContext = oFunction.getBoundContext();
											// let resVal = oContext.getValue();
											debugger
											let resVal = await Fimport(oFunction, functionname, ID, "ID");
											// resVal = JSON.parse(resVal.value);
											console.log(resVal);
											oBusyDialog.close();

										}
									}));
									// }
								}
							}

							// b++
							Box.addItem(new sap.m.Table({
								visible: true
							}));

							let oTable = Box.getItems()[1];
							// b++
							// TABLE COLUMNS

							let ColKeys = Object.keys(levelArray[0]);
							ColKeys = ColKeys.slice(3);
							let colArray = [];
							ColKeys.forEach((col) => {
								if (!colArray.includes(col)) {
									var oColumn = new sap.m.Column({
										header: new sap.m.Label({
											text: col.replace(/_/g, " ")
										}),
										width: "200px"
									});
									oTable.addColumn(oColumn);
									colArray.push(col)
								}
							});

							// Row Insert

							levelArray.forEach((item) => {
								let oCells = [];
								let oRow;
								let vals = Object.values(item);
								vals = vals.slice(3);
								let oCell

								vals.forEach((value) => {
									oCell = new sap.m.Text({
										text: value
									});
									oCells.push(oCell);
								});

								oRow = new sap.m.ColumnListItem({
									cells: oCells
								});

								oTable.addItem(oRow);

							})
							i = i + 1;
						})

					}
					// let oContext = oFunction.getBoundContext();

					// let result = oContext.getObject();
					// var oUserInfoService = sap.ushell.Container.getService("UserInfo");
					// var oUser = oUserInfoService.getUser();
					// var email = oUser.getEmail();
					// if(email===result.value){

					// that.getView().getContent()[0].setVisible(true);
					// let oFunction = oModel.bindContext(`/${sFunctionName}(...)`);
					// oFunction.setParameter("ID", data);
					// await oFunction.execute(); debugger
					//  var oContext = oFunction.getBoundContext();

					//  var res = oContext.getObject();
					//  debugger
					// await oFunction.execute();
					debugger
					// let oContext1 = oFunction.getBoundContext();

					// let result1 = oContext1.getObject();
					let result1 = await Fimport(oModel, sFunctionName, data, "ID");


					debugger
					if ((result1 === 'Pending for Approval') || (result1 === 'Approved') || (result1 === 'Rejected')) {
						that.getView().getContent()[0].getSections()[3].setVisible(false);
						// this.getView().getContent()[0].getSections()[2].mAggregations._grid.getContent()[0].mAggregations._grid.getContent()[0].getContent().getItems()[1].getDependents()[1].mAggregations.headerToolbar.setVisible(false);

						// this.getView().getContent()[0].getSections()[2].mAggregations._grid.getContent()[0].mAggregations._grid.getContent()[0].getContent().getContent().mAggregations._content.getHeaderToolbar().setVisible(false);
						this.getView().getContent()[0].getSections()[2].mAggregations._grid.getContent()[0].mAggregations._grid.getContent()[0].getContent().getItems()[1].getDependents()[1].mAggregations.headerToolbar.setVisible(false);
						that.getView().getContent()[0].setShowEditHeaderButton(false);
						that.getView().getContent()[0].getHeaderTitle().mAggregations._actionsToolbar.getContent()[4].setEnabled(false);
						that.getView().getContent()[0].getHeaderTitle().mAggregations._actionsToolbar.getContent()[4].setVisible(false);
					}
					else {

						if (this.getView().getContent()[0].getHeaderTitle().mAggregations._actionsToolbar.getContent()[4].mProperties.visible === true) {
							debugger

							that.getView().getContent()[0].getSections()[3].setVisible(false);
							this.getView().getContent()[0].getSections()[2].mAggregations._grid.getContent()[0].mAggregations._grid.getContent()[0].getContent().getItems()[1].getDependents()[1].mAggregations.headerToolbar.setVisible(false);
							// this.getView().getContent()[0].getSections()[2].mAggregations._grid.getContent()[0].mAggregations._grid.getContent()[0].getContent().getContent().mAggregations._content.getHeaderToolbar().setVisible(false);
							that.getView().getContent()[0].setShowEditHeaderButton(true);
							that.getView().getContent()[0].getHeaderTitle().mAggregations._actionsToolbar.getContent()[4].setEnabled(true);
							that.getView().getContent()[0].getHeaderTitle().mAggregations._actionsToolbar.getContent()[4].setVisible(true);


						}
						// else {
						// 	this.getView().getContent()[0].getSections()[2].mAggregations._grid.getContent()[0].mAggregations._grid.getContent()[0].getContent().getItems()[1].getDependents()[1].mAggregations.headerToolbar.setVisible(true);
						// 	that.getView().getContent()[0].getSections()[3].setVisible(true);
						// 	// this.getView().getContent()[0].getSections()[2].mAggregations._grid.getContent()[0].mAggregations._grid.getContent()[0].getContent().getContent().mAggregations._content.getHeaderToolbar().setVisible(true);

						// }

					}
					var frag4 = this.base.getView().getContent()[0]
					function resize(id) {debugger
					let subCol = sap.ui.getCore().byId(id).mAggregations.content.getContent().mAggregations.columns;
				subCol.forEach(col =>{
					let colName = col.mProperties.dataProperty;
					var colHeader = col.getHeader();
							var mLength = colHeader.length;	
								let valuevendor = sap.ui.getCore().byId(id).mAggregations.content.getContent().mAggregations._content.mBindingInfos.rows.binding.oCache.getAllElements();
								const maxLength = Math.max(...valuevendor.map(item => (item[colName]?.length ?? 8)));
						if(maxLength > mLength)
						mLength = maxLength; 
				const width = mLength * 8 + 20 + "px"; 

				col.setWidth(width)
							});	
				}
				
					frag4.attachSectionChange(function(){debugger
						var section = this.getScrollingSectionId()
						if(section == "panappbeta::tab1ObjectPage--fe::FacetSection::GeneralDetails1"){ 
							resize("__block1");
							resize("__block2");
						};

							debugger
							var columns = sap.ui.getCore().byId(`${section}`).mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.content.mAggregations.columns;
							if(columns != undefined )
							columns.forEach(col =>{
								let colName = col.mProperties.dataProperty;
								let mLength = colName.length;
											let valuevendor = sap.ui.getCore().byId(`${section}`).mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.content.mAggregations._content.mBindingInfos.rows.binding.oCache.getValue()
											const maxLength = Math.max(...valuevendor.map(item => (item[colName]?.length ?? 8)));
									if(maxLength > mLength)
									mLength = maxLength; 
							const width = mLength * 8 + 20 + "px"; 

							col.setWidth(width)
										});	
						
					   });






					// function resize(id) {debugger
					// 	let subCol = sap.ui.getCore().byId(id).mAggregations.content.getContent().mAggregations.columns;
					// subCol.forEach(col =>{
					// 	let colName = col.mProperties.dataProperty;
					// 	var colHeader = col.getHeader();
					// 			var mLength = colHeader.length;	
					// 				let valuevendor = sap.ui.getCore().byId(id).mAggregations.content.getContent().mAggregations._content.mBindingInfos.rows.binding.oCache.getAllElements();
					// 				const maxLength = Math.max(...valuevendor.map(item => (item[colName]?.length ?? 8)));
					// 		if(maxLength > mLength)
					// 		mLength = maxLength; 
					// const width = mLength * 8 + 20 + "px"; 

					// col.setWidth(width)
					// 			});	
					// }
					// var frag4 = this.base.getView().getContent()[0]
					// var section = this.getScrollingSectionId()
					// if(section == "panapproval::PAN_Details_APRObjectPage--fe::FacetSection::GeneralDetails1"){ 
					// 	resize("__block1");
					// 	resize("__block2");
					// };
					// function resize(id) {
					// 	debugger
					// 	// oBusyDialog.open();
					// 	let subCol = sap.ui.getCore().byId(id).mAggregations.content.getContent().mAggregations.columns;
					// 	subCol.forEach(col => {
					// 		let colName = col.mProperties.dataProperty;
					// 		let mLength = colName.length;
					// 		let valuevendor = sap.ui.getCore().byId(id).mAggregations.content.getContent().mAggregations._content.mBindingInfos.rows.binding.oCache.getValue();
					// 		const maxLength = Math.max(...valuevendor.map(item => (item[colName]?.length ?? 8)));
					// 		if (maxLength > mLength)
					// 			mLength = maxLength;
					// 		const width = (mLength+2) * 8 + 20 + "px";

					// 		col.setWidth(width)
					// 	});
					// 	// oBusyDialog.close();
					// } debugger
					// resize("__block1");
					// resize("__block2");
					// // frag4.attachSectionChange(function () {
					// 	debugger
						
					// 	function tableresize(section){
					// 	// if(sap.ui.getCore().byId(`${section}`).mAggregations._grid.mAggregations.content[0].getTitle()=="Vendor Details"){
					// 		// oBusyDialog.open();
					// 	var columns = sap.ui.getCore().byId(`${section}`).mAggregations._grid.mAggregations.content[0].getContent().getContent().getColumns();
					// 	if (columns != undefined)
					// 		columns.forEach(col => {
					// 			var colName = col.mProperties.dataProperty;
					// 			var colHeader = col.getHeader();
					// 			var mLength = colHeader.length;
					// 			var valuevendor = sap.ui.getCore().byId(`${section}`).mAggregations._grid.mAggregations.content[0].getContent().getContent().mAggregations._content.mBindingInfos.rows.binding.oCache.getValue();
					// 			const maxLength = Math.max(...valuevendor.map(item => (item[colName]?.length ?? 8)));
					// 			if (maxLength > mLength)
					// 				mLength = maxLength;
					// 			const width = (mLength+2) * 8 + 20 + "px";

					// 			col.setWidth(width)
					// 		});
					// 		// oBusyDialog.close();
					// 	// }
					// }
					// tableresize("panappbeta::tab1ObjectPage--fe::FacetSubSection::VendorData");
							

					// });

					oBusyDialog.close();

				},
				onAfterBinding: function (oBindingContext) {	
					debugger
					var path_1 = this.getView().getContent()[0].attachSectionChange(
						function(oEvent){
							var attach_items = oEvent.getSource().mAggregations.sections[2].mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.items[1].getItems();
							var edit_visible = oEvent.getSource().mAggregations.headerTitle.mAggregations._actionsToolbar.getContent()[4].mProperties.visible;
						if(edit_visible == true)
						{
							oEvent.getSource().mAggregations.sections[2].mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.getItems()[1].setUploadEnabled(false);
							for (let i = 0; i < attach_items.length; i++) {
								attach_items[i].setVisibleRemove(false);
								attach_items[i].setEnabledRemove(false);
							}
						}
						else {
							oEvent.getSource().mAggregations.sections[2].mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.getItems()[1].setUploadEnabled(true);
							for (let i = 0; i < attach_items.length; i++) {
								attach_items[i].setVisibleRemove(true);
								attach_items[i].setEnabledRemove(true);
							}
						}
							debugger
						}
					);
					
					// var frag4 = this.base.getView().getContent()[0]
					// function resize(id) {
					// 	let subCol = sap.ui.getCore().byId(id).mAggregations.content.getContent().mAggregations.columns;
					// subCol.forEach(col =>{
					// 	let colName = col.mProperties.dataProperty;
					// 	let mLength = colName.length;
					// 				let valuevendor = sap.ui.getCore().byId(id).mAggregations.content.getContent().mAggregations._content.mBindingInfos.rows.binding.oCache.getValue();
					// 				const maxLength = Math.max(...valuevendor.map(item => (item[colName]?.length ?? 8)));
					// 		if(maxLength > mLength)
					// 		mLength = maxLength; 
					// const width = mLength * 8 + 20 + "px"; 

					// col.setWidth(width)
					// 			});	
					// }
					// // resize("__block1");
					// // resize("__block2");
					// frag4.attachSectionChange(function(){debugger
					// 	var section = this.getScrollingSectionId()
					// 		var columns = sap.ui.getCore().byId(`${section}`).mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.content.mAggregations.columns;
					// 		if(columns != undefined )
					// 		columns.forEach(col =>{
					// 			var colName = col.mProperties.dataProperty;
					// 			var colHeader = col.getHeader();
					// 			var mLength = colHeader.length;		
					// 			var valuevendor = sap.ui.getCore().byId(`${section}`).mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.content.mAggregations._content.mBindingInfos.rows.binding.oCache.getValue()
					// 						const maxLength = Math.max(...valuevendor.map(item => (item[colName]?.length ?? 8)));
					// 			if(maxLength > mLength)
					// 				mLength = maxLength; 
					// 		const width = mLength * 8 + 20 + "px"; 

					// 		col.setWidth(width)
					// 					});	

					//    });



					debugger;
					var edit_mode = this.getView().getContent()[0].getHeaderTitle().mAggregations._actionsToolbar.getContent()[4].mProperties.visible;

					let uploadsetitems_list = this.getView().getContent()[0].getSections()[2].mAggregations._grid.getContent()[0].mAggregations._grid.getContent()[0].getContent().getItems()[1].getItems();
					debugger
						if (!edit_mode) {
							this.getView().getContent()[0].getSections()[2].mAggregations._grid.getContent()[0].mAggregations._grid.getContent()[0].getContent().getItems()[1].setUploadEnabled(true)
							for (let i = 0; i < uploadsetitems_list.length; i++) {
								this.getView().getContent()[0].getSections()[2].mAggregations._grid.getContent()[0].mAggregations._grid.getContent()[0].getContent().getItems()[1].getDependents()[1].mAggregations.headerToolbar.setVisible(true);
								uploadsetitems_list[i].setVisibleRemove(true);
								uploadsetitems_list[i].setEnabledRemove(true);

							}
						}
						else {
							debugger;
							this.getView().getContent()[0].getSections()[2].mAggregations._grid.getContent()[0].mAggregations._grid.getContent()[0].getContent().getItems()[1].setUploadEnabled(false)
							for (let i = 0; i < uploadsetitems_list.length; i++) {
								this.getView().getContent()[0].getSections()[2].mAggregations._grid.getContent()[0].mAggregations._grid.getContent()[0].getContent().getItems()[1].getDependents()[1].mAggregations.headerToolbar.setVisible(false);
								uploadsetitems_list[i].setVisibleRemove(false);
								uploadsetitems_list[i].setEnabledRemove(false);

							}
						}

					debugger
					var pan_numb = oBindingContext.oBinding.sPath;
					const pattern = /PAN_Number='([^']+)'/;
					const matches = pan_numb.match(pattern);
					// this.getView().getContent()[0].getSections()[2].mAggregations._grid.getContent()[0].mAggregations._grid.getContent()[0].getContent().getItems()[1].getDependents()[1].setNoDataText("No files found");
					let appr_url = window.location.href;
					var pieces = appr_url.split("(");
					var res = pieces[1];
					var res1 = res.split("'");
					const panNumber = res1[1];
					var path = this.base.getView().getContent()[0].getSections()[2].mAggregations._grid.getContent()[0].mAggregations._grid.getContent()[0].getContent().getItems()[1].mBindingInfos.items.binding;
					path.filter(
						new sap.ui.model.Filter({
							path: "PAN_Number",
							operator: sap.ui.model.FilterOperator.EQ,
							value1: panNumber
						})
					);
				}
			}
		}

	});

});
