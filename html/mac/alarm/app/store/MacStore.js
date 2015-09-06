Ext.define('proauthMobileAccount.store.MacStore', {
  extend: 'Ext.data.Store',
  id:'MacStore',
  pageSize: 40,
  model: 'proauthMobileAccount.model.macModel',
 remoteSort: true,
  proxy: {
    type: 'ajax',
    url : '/pronline/Msg?FunName@ncsSys_MacProcy',
    reader: {
      type: 'json',
      root: 'eimdata',
      totalProperty: 'totalCount'
    },
     simpleSortMode: true
  },
   sorters: {
            property: 'sid',
            direction: 'DESC'
        }
});
