
var g_ssid = [];

var g_security = [];
var g_authflag = [];

var g_mac = []; 
var g_servicename = [];

Ext.define('proauthRzAuthlog.controller.Procy', {
    extend: 'Ext.app.Controller',  
    stores: ['List'],
    models: ['List'],  
    views: ['list.List'],    
    mac:'',            
        
    sdate:'',
    stime:'',
    edate:'',
    etime:'',
    searchtype:'',            
    
    servicecode:'',
    servicename:'',                
    apmac:'',
    apname:'',
  
    init: function() {
        this.control({
        	
        //select: this.showTab,	
        'authloglist':{  			
        	render: this.showRender
        },	
        	
        //高级查询	
		  	'myselfPanel button[action=advancecx]':{
					click:this.highquery  
		  	},                
        
        //关键字查询  
          'myselfPanel button[action=keycx]':{
          	click: this.dwglkeycx
          },
		  		  		  
		  	//电子地图
		  	'authloglist button[action=electricmap]':{
        	click: this.placeelectricmap
        },
		  
		  	/* 新增按钮：是否合规  钱智明 15:53 */
		  	'authloglist button[action=ruleyes]':{
         	click: this.hotmarkruleyes
        },
		  
		  	'authloglist button[action=ruleno]':{
        	click: this.hotmarkruleno
        },
        
        //导出
		  	'authloglist button[action=export]':{
        	click: this.infoexport
        }
		  
		  
        });
    },
    
    showRender: function(){
        var store = Ext.ComponentQuery.query('authloglist')[0].getStore();
        store.on('beforeload', function (store, options) {
		//调整视图高度
        var qgrid=Ext.ComponentQuery.query('authloglist')[0];
    	  parent.grid_height=parent.Ext.getCmp('layout_center').getHeight()-56;
        qgrid.setHeight(parseInt(parent.grid_height)+25);
        	
        var keyword = Ext.getCmp('keyword_mobileaccount').value;
				//取到 combox 中选择的时间
        var time_flag = Ext.getCmp('time_flag').value;
        var groupid = parent.ncsgroupid;
				//var did = parent.corpdid;
        var did = parent.servicecode;
        if(did){
        	groupid = "";
        }
      
            var account = proauthRzAuthlog.controller.Procy.account;
            var servicecode;
            if(parent.servicecode!=''){
            	servicecode=parent.servicecode;
            }
            else{
              servicecode = proauthRzAuthlog.controller.Procy.servicecode;
            }
            var servicename = proauthRzAuthlog.controller.Procy.servicename;
            var mac = proauthRzAuthlog.controller.Procy.mac;
            var sdate = proauthRzAuthlog.controller.Procy.sdate;
            var stime = proauthRzAuthlog.controller.Procy.stime;
            var edate = proauthRzAuthlog.controller.Procy.edate;
            var etime = proauthRzAuthlog.controller.Procy.etime;            
            var ssid = proauthRzAuthlog.controller.Procy.ssid;
            
            var searchtype = proauthRzAuthlog.controller.Procy.searchtype;
            var apname = proauthRzAuthlog.controller.Procy.apname;
            var apmac = proauthRzAuthlog.controller.Procy.apmac;
         						       
            var new_params={groupid:groupid,did:did,keyword:keyword, time_flag:time_flag, mac:mac,ssid:ssid, sdate:sdate,stime:stime,edate:edate,etime:etime, servicecode:servicecode, servicename:servicename, searchtype:searchtype,apname:apname,apmac:apmac};
        
             Ext.apply(store.proxy.extraParams,new_params);

        });//store.on('beforeload', function (store, options) {

        proauthRzAuthlog.controller.Procy.loadProcyListStore();
    },

    //关键字查询
    dwglkeycx: function(thisBtn){
    	 
        proauthRzAuthlog.controller.Procy.searchtype = ""; 
        proauthRzAuthlog.controller.Procy.SetPage(1);  
        proauthRzAuthlog.controller.Procy.loadProcyListStore();
        
    },
  		
	//高级查询
    highquery: function(thisBtn){
			var myDate = new Date();
    	var yy = ( myDate.getYear() < 1900 ) ? ( 1900 + myDate.getYear() ) : myDate.getYear();
      var mm = myDate.getMonth()+1;
      if(mm<10)
      {
      	mm = '0'+mm;
      }
      var dd = myDate.getDate();
      if(dd<10)
      {
      	dd = '0'+dd;
      }
      var today = yy+'/'+mm+'/'+dd;
      var startday = yy+'/'+mm+'/'+'01';
       
      var formquery = new Ext.FormPanel({         
      	frame: true,
        layout: 'form',
        fieldDefaults: {
        	labelWidth: 85,                        
          width: 250
        },
        collapsible: false,
        bodyPadding: 10,
        	items: [
							{
              	layout: 'hbox',
                xtype: 'container',  					
                items:[
										{                        
											fieldLabel:'起始日期',
                      xtype: 'datefield',
                      format: "Y/m/d",
                      value:startday,
                      name:'sdate',
                      id:'sdate'
                    },
                    {
                    	fieldLabel:'&nbsp;&nbsp;起始时间',
                      xtype: 'textfield',
                      value:'00:00:00',
                      name:'stime',
                      regex :/^[0-2][0-9]:[0-6][0-9]:[0-6][0-9]$/,
                      regexText: "格式：xx:xx:xx",
                      allowBlank  : false,
                      id:'stime'
                    }
                ]					
              },
              {					
								layout: 'hbox',
                xtype: 'container',                   
                items:[
                    {
											fieldLabel:'结束日期',
                      xtype: 'datefield',
                      id:'edate',
                      format: "Y/m/d",
                      value:today,
                      name:'edate'
                    },
                    {
											fieldLabel:'&nbsp;&nbsp;结束时间',
                      xtype: 'textfield',
                      value:'23:59:59',
                      name:'etime',
                      regex :/^[0-2][0-9]:[0-6][0-9]:[0-6][0-9]$/,
                      regexText: "格式：xx:xx:xx",
                      allowBlank  : false,
                      id:'etime'
                    }
                ]					
              },
              {					
              	layout: 'hbox',
                xtype: 'container',                   
                items:[
										{
                    	fieldLabel:'场所编号',
                      xtype: 'textfield',
                      name:'servicecode'
                    },
                    {
                    	fieldLabel:'&nbsp;&nbsp;场所名称',
                      xtype: 'textfield',
                      name:'servicename'
                    }
                ]					
              },
              {
              	layout: 'hbox',
                xtype: 'container',
                items:[
                		{
											fieldLabel:'热点MAC',
                      xtype: 'textfield',
                      name:'apmac'
                    },
                    {                        
                    	fieldLabel:'&nbsp;&nbsp;采集设备编号',
                      xtype: 'textfield',
                      name:'apname'
                    }
                ]					
              },
              {
              	layout: 'column',
                xtype: 'container',                     
                items:[
                    {
											xtype: 'container',
                      columnWidth: .20
                    },
                    {
                      //fieldLabel:'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;          ',
                      //labelWidth: 85,                        
                    	xtype: 'button',
                      anchor: 'left',
                      //style : 'margin-left:80px',
                      text:'&nbsp;&nbsp;查&nbsp;&nbsp;询 &nbsp;&nbsp;',
                      columnWidth: .25, 
                      handler: function(){
												var grid = Ext.ComponentQuery.query('authloglist')[0];            
												var store = grid.getStore();
												
												proauthRzAuthlog.controller.Procy.searchtype ='adv';
												proauthRzAuthlog.controller.Procy.sdate = 
												formquery.getForm().getValues().sdate;
							
												proauthRzAuthlog.controller.Procy.stime = 
												formquery.getForm().getValues().stime;
							
												proauthRzAuthlog.controller.Procy.edate = 
												formquery.getForm().getValues().edate;
							
												proauthRzAuthlog.controller.Procy.etime = 
												formquery.getForm().getValues().etime;
												
												proauthRzAuthlog.controller.Procy.servicecode = 
												formquery.getForm().getValues().servicecode;
							
												proauthRzAuthlog.controller.Procy.servicename = 
												formquery.getForm().getValues().servicename;
												
												
												proauthRzAuthlog.controller.Procy.apmac = 
												formquery.getForm().getValues().apmac;
										
												proauthRzAuthlog.controller.Procy.apname = 
												formquery.getForm().getValues().apname; 
																									
												store.load();
                      }
                           
                   }]
				   
                }]
        });    
    
        var win3 = Ext.widget('window', {
            title: '高级查询',
//            closeAction: 'hide',
            x:200,
            y:32,
            width: 580,
            resizable: true,
            draggable:true,
            modal:false,
            items: formquery
        });
       
        win3.show();
    },
	
	/* 新增按钮：是否合规  钱智明 16:03 */
	hotmarkruleyes:function(thisBtn){		
		  	
		g_authflag = ["1"];		  				
		g_ssid = [];		
		g_mac = [];	
		
		/* 获取用户在热点信息查询选择框内容 */	
		//获取所有选中行
		var rows = Ext.getCmp('id_hotspottable').getSelectionModel(); 
	
		for(var i = 0; i <rows.selected.items.length;i++){					
			g_ssid.push([rows.selected.items[i].data.ssid]);			
			g_mac.push([rows.selected.items[i].data.mac]);			
		}
		
		alert(g_authflag);		
		alert(g_ssid);
		alert(g_mac);		
				
		Ext.Ajax.request({			
		url: '/pronline/Msg?FunName@ncsHotSpot_MarkRuleorNot&authflag@' 
					+ g_authflag + '&ssid@' + g_ssid + '&mac@' + g_mac , 
		
		method: 'GET',		
		success: function(resp, opts){			
			var respText = resp.responseText; 			//获取整个 JSON 数据的字符串
			try{
				var respRecord = eval("("+respText+")");	//字符串转成结构体
				
				var result = respRecord.result;
				var message = respRecord.data[0].message;
				
				if(result)
				{									
					alert(message);				
					var store = Ext.ComponentQuery.query('authloglist')[0].getStore();
					store.load();																	
				}
				else
				{
					alert("标记失败");					
				}
				
			}
			catch(e){
				alert(e.message);
			}
							
		},
		failure: function(resp, opts){
			var resqText = eval("(" + resqText + ")");
			alert('错误', resqText.error);
		} 
		
	});
		
  },
	   
  hotmarkruleno:function(thisBtn){
		
  	g_authflag = ["0"];
		g_ssid = [];  	
		
		/* 获取用户在热点信息查询选择框内容 */	
		//获取所有选中行
		var rows = Ext.getCmp('id_hotspottable').getSelectionModel(); 
	
		for(var i = 0; i <rows.selected.items.length;i++){					
			g_ssid.push([rows.selected.items[i].data.ssid]);
		}
		
		//alert(g_authflag);
		//alert(g_ssid);
		
		
		Ext.Ajax.request({			
		url: '/pronline/Msg?FunName@ncsHotSpot_MarkRuleorNot&authflag@' 
					+ g_authflag + '&ssid@' + g_ssid, 
		
		method: 'GET',		
		success: function(resp, opts){			
			var respText = resp.responseText; 			//获取整个 JSON 数据的字符串
			try{
				var respRecord = eval("("+respText+")");	//字符串转成结构体
				
				var result = respRecord.result;
				var message = respRecord.data[0].message;
				
				if(result)
				{									
					alert(message);
					var store = Ext.ComponentQuery.query('authloglist')[0].getStore();
					store.load();																						
				}
				else
				{					
					alert("标记失败");
				}
				
			}
			catch(e){
				alert(e.message);
			}
							
		},
		failure: function(resp, opts){
			var resqText = eval("(" + resqText + ")");
			alert('错误', resqText.error);
		} 
		
	});
		
         
  },
	   
		
	//电子地图
	placeelectricmap: function(thisBtn){
		var tabPanelchecktable = new Ext.Panel({
            //renderTo: "grid",
			frame: true,
            layout: 'form',
            activeTab: 0,
            items: [{             
              //html: '<iframe src="/mac/infoquery/hotinfo/peoplecrew/crowd/crowd.htm" frameborder="no" style="width:100%;height:1000px;"></iframe>'
              html: '<iframe src="/mac/datamining/track/hotspot.htm" frameborder="no" style="width:100%;height:540px;"></iframe>'
            }]
        });
		
		var win5 = Ext.widget('window', {
            title: '电子地图',
//            closeAction: 'hide',
            x:150,
            y:60,
            width: 800,
			height: 550,
//            height: 330,
            //minHeight: 330,
//            layout: 'fit',
            resizable: true,
            draggable:true,
            modal:false,
            items: tabPanelchecktable
        });
       
        win5.show();
		
	},
	
	infoexport: function(thisBtn){
		
		var form1 = document.getElementById('form1');	
		form1.hotinfoexport.value = 'export';
		form1.time_flag.value =  Ext.getCmp('time_flag').value;	
		form1.submit();
		
	},
  
    /**************************************
    * 策略标签 
    ***************************************/  
    showTips: function( thisTV, eOpts ){
      thisTV.tip = Ext.create('Ext.tip.ToolTip', {
        target: thisTV.el,
        trackMouse: true,
        dismissDelay : 60000,
        html: '<p>例如：</p><p>&nbsp;&nbsp;&nbsp;单个端口：80,21</p><p>&nbsp;&nbsp;&nbsp;端口段：2000~3000</p><p>&nbsp;&nbsp;&nbsp;组合：80,2000~3000,3005</p>'
      });
    },
    /**************************************
    * 全局函数 
    ***************************************/
    inheritableStatics:{
        loadProcyListStore:function(){
            var store = Ext.ComponentQuery.query('authloglist')[0].getStore();
            var keyword = Ext.getCmp('keyword_mobileaccount').value;
         
            store.load();
        },
        SetPage:function(curpage){
            var store = Ext.ComponentQuery.query('authloglist')[0].getStore();
            store.currentPage = curpage;
        },
        setTitle: function(title){
             document.getElementById("titledx").innerHTML = 
                 '&nbsp'+ title +'&nbsp;&nbsp;';   
        }
    }
   
});

