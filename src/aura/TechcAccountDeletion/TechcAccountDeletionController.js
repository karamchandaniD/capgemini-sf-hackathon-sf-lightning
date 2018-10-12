({
    loadData : function(cmp, evt, hlpr){
        var recId = cmp.get('v.recId');
        if(recId){
            hlpr.loadData(cmp, recId);
        }
    },
    handleClose : function(cmp, evt, hlpr){
        cmp.set('v.isDelete', false);
    },
    handleDeleteRecord : function(cmp, evt, hlpr){
        hlpr.handleDeleteRecord(cmp);
    },
    handleRecordUpdated : function(cmp, evt, hlpr){
        hlpr.handleRecordUpdated(cmp, evt);
    }
})