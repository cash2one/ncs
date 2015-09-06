Ext.define('proauthRzSmslog.store.List', {
  extend: 'Ext.data.Store',
  pageSize: 40,
  model: 'proauthRzSmslog.model.List',
 remoteSort: true,
  proxy: {
    type: 'ajax',
    url : '/pronline/Msg?FunName@proauthRzsmslist',
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
