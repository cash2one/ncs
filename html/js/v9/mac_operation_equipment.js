
 Ext.define('ncViewer.mac_operation_equipment', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.mac_operation_equipment',
    height:900,
     autoscroll:false,  
    initComponent: function(){
        Ext.apply(this,{   
        	 margins: '0 0 0 0',      
        	 frame: false,
           html: '<iframe id="lan_itm_operation_equipment_s" name="lan_itm_operation_equipment_s" src="/dwgl/apset/proauth_apset.htm" scrolling="no" width=100% height=900 FrameBorder=0 ></iframe>' 
    
        });

        this.callParent(arguments);
    }
});