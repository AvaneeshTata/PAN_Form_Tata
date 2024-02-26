sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';
	const Fimport= async function(oModel,name,data){
		 
		console.log(oModel);
		let oFunction = oModel.bindContext(`/${name}(...)`);
					// let oFunction = oModel.bindContext(`/Books`);
					
		oFunction.setParameter("ID",JSON.stringify(data));
					// oFunction.setParameter("Book",{ID:3, title: "BookTitle", stock:10000});
		await oFunction.execute();
					// console.log(response);

		let oContext = oFunction.getBoundContext();

		let result = oContext.getObject();
		// console.log(result);
		return result.value;
	};

	return ControllerExtension.extend('panappbeta.ext.controller.Vendor', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf panappbeta.ext.controller.Vendor
             */
			onInit: function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();
			},
			routing:{
				onAfterBinding:async function(oBindingContext){ 
					var frag4 = this.base.getView().getContent()[0]
					frag4.attachSectionChange(function(){ 
						var section = this.getScrollingSectionId()
						
							var columns = sap.ui.getCore().byId(`${section}`).mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.content.mAggregations.columns;
							if(columns != undefined )
							columns.forEach(col =>{ 
								var colName = col.mProperties.dataProperty;
								var colheader=col.getHeader();
								var mLength = colheader.length;		
								var valuevendor = sap.ui.getCore().byId(`${section}`).mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.content.mAggregations._content.mBindingInfos.rows.binding.oCache.getValue()
											const maxLength = Math.max(...valuevendor.map(item => (item[colName]?.length ?? 8)));
								if(maxLength > mLength)
									mLength = maxLength; 
							const width = (mLength+2) * 8 + 20 + "px"; 

							col.setWidth(width);
										});	
						
					   });
					   let sObj = {sorters : [{descending: false , name:"Property::slNo"}]}; 
					   await sap.ui.getCore().byId('panappbeta::tab1_tab1tovendor_dataObjectPage--fe::table::vendtoptd::LineItem::PAYMENT_TERM_DETAILS').setSortConditions(sObj);
				},
				onBeforeBinding:async function(oBindingContext){ 
					const oModel = this.base.getExtensionAPI().getModel();
					var that = this;
					this.getView().getContent()[0].getSections()[0].setVisible(false);
					const v =this.getView().getContent()[0].getHeaderTitle().mAggregations._actionsToolbar.getContent()[4].mProperties.visible;
					var sFunctionName = "getData";
					// oFunction = oModel.bindContext(`/${Name}(...)`);
					   var complete_url = window.location.href;
					   var pieces = complete_url.split("(");
					   var res = pieces[1];
					//    var res = pieces[1];
            		   var res1 = res.split("'");
					   var data = res1[1];
					//    let oFunction = oModel.bindContext(`/${sFunctionName}(...)`);
					//    oFunction.setParameter("ID",data);
					//    await oFunction.execute(); 
					   //  var oContext = oFunction.getBoundContext();
						
					   //  var res = oContext.getObject();
					   //   
					   // await oFunction.execute();
						 
					//    let oContext1 = oFunction.getBoundContext();
						// 
					//    let result1 = oContext1.getObject();
					let result1 = await Fimport(oModel,sFunctionName,data);
					   if ((result1==='Pending for Approval')||(result1==='Approved')||(result1==='Rejected')){
						that.getView().getContent()[0].setShowEditHeaderButton(false);
						that.getView().getContent()[0].getHeaderTitle().mAggregations._actionsToolbar.getContent()[1].setEnabled(false);
						that.getView().getContent()[0].getHeaderTitle().mAggregations._actionsToolbar.getContent()[1].setVisible(false);
						that.getView().getContent()[0].getHeaderTitle().mAggregations._actionsToolbar.getContent()[1].destroy();
					   }
				}
			}
		}
	});
});
