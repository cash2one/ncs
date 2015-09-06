
var store_macgroup = Ext.create('Ext.data.Store',{pageSize: 40,fields: ['classname', 'classid'],idProperty: 'userid',autoLoad: true,remoteSort: true,
        		proxy: {type: 'ajax',url: '/pronline/Msg?FunName@ncsMacGroupComp',reader: {type:'json',root: 'eimdata',totalProperty: 'totalCount'},simpleSortMode: true
        		},sorters:[{property: '',direction: 'DESC'}]});
Ext.define('proauthMobileAccount.view.common.macKeywordBk' ,{
  extend: 'Ext.grid.Panel',
  alias : 'widget.mackeylist',
//  store : this.field2, 
  store:'MacStore',
  height: 900,
  title:'MAC关键字布控',
  field1: this.field1,
  columnLines: true,
  initComponent: function() {


    var sm = Ext.create('Ext.selection.CheckboxModel',{
        listeners: {
            selectionchange: function(sm, selections) {  
          	var grid=Ext.ComponentQuery.query('mackeylist')[0];
                  
           grid.down('#removeButton2').setDisabled(selections.length == 0);
    //          grid.down('#moveGroupButton').setDisabled(selections.length == 0);
    
                
            }
        }
    
    });
    this.selModel=sm;

      var rowEditing1 = Ext.create('Ext.ux.grid.plugin.RowEditing', {
    	      pluginId:'rowEditing2', 
            saveBtnText: "保存", 
            cancelBtnText: "取消", 
            autoRecoverOnCancel:true,
            autoCancel: true,
            filed1:'sid',
            filed2:'gname',
            filed3:'flags',
            filed4:'mac'
 //       clicksToMoveEditor: 1,
 //       autoCancel: false
    });
    
   
    this.plugins=rowEditing1;
    this.tbar = Ext.create('Ext.PagingToolbar',{
    	store: 'MacStore',
      displayInfo: true,
      displayMsg: '显示{0} - {1}条记录 共{2}条记录',
     emptyMsg: "没有记录可显示",
     items:[
              {
               xtype:'textfield',
               id:'keyword_mac',
               width:140,
               name:'keyword5',
               style:'color:#7aa7d5',             
               emptyText:'请输入MAC查询',
               enableKeyEvents:true,
               listeners:{
                 'focus':function(){
        
                 },
         
                 'keydown' : function(i,e){
                var aae=e.getKey() ; 
                if(aae==13){

                }
               }
               }
             },
             {
                text:'查询',
                iconCls:'accept',
                action:'keycx_macbk'
   
            },
         '-',
     	 {
     	 	text:'添加规则',
     	 	iconCls:'add',
     	 	 handler : function() {
                rowEditing1.cancelEdit();    
                  
                 var r = Ext.create('proauthMobileAccount.model.macModel', {  
                 	  flags:'0',             	  
                    gid: ''                  
                                   
                });
               var store = Ext.ComponentQuery.query('mackeylist')[0].getStore();

              store.insert(0, r);
               rowEditing1.startAdd1(0,0);
            
       //     rowEditing.startEdit(0, 0);
              }
     	 	
     	 	
//     	 	action:'add'
     	},'-',
     	 {
     	 	text:'删除',
     	 	itemId: 'removeButton2',
     	 	iconCls:'remove',
     	 	disabled: true,
     	 	action:'del'
     	},'-'
     	]
    }
    );
    
    
   
  	
    this.columns = [
      {header: 'MAC关键字组', dataIndex: 'gname', width:160, sortable: true,
       editor: {
          xtype: 'combo', emptyText:'选择关键字组，不选该字段不生效',
          store:store_macgroup,
           displayField: 'classname',
           valueField:'classid',
            queryMode: 'local',
				   value:'',
           allowBlank: true
    
          }
      	
      	
      	},
      {header: 'MAC',dataIndex: 'mac',width:160, sortable: false,editor: {emptyText:'选择状态',allowBlank:true}},
      {header: '状态', dataIndex: 'flags',  
      	renderer:function(value,metaData,record){
      		if(value=='0'){return '<font  color=green>启用</font'}
                else  if(value=='1'){return '<font color=red>停用</font'}
					   
      	},
      	
      	 flex:1,editor: {
          xtype: 'combo',
          store: Ext.create('Ext.data.Store', {
                                    fields : ['classname', 'classid'],
                                    data   : [
                                   {"classid":"0","classname":"启用"},
                                   {"classid":"1","classname":"停用"}                                                                     
                                    ]
            }),
           displayField: 'classname',
           valueField:'classid',
            queryMode: 'local',
				   value:'0',
           allowBlank: true
    
            }},      
   
          {
          	flex:1,
          	width:20
          }

      
      
    ];

    this.callParent(arguments);
  }
    
});