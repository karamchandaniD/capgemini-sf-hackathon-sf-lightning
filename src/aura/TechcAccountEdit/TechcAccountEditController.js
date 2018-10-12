({
	loadData : function(cmp, evt, hlpr){
        var recId = cmp.get('v.recId');
        if(recId){
            hlpr.loadData(cmp, recId);
        }
    },
    handleClose : function(cmp, evt, hlpr){
        cmp.set('v.isEdit', false);
    },
    handleSaveRecord : function(cmp, evt, hlpr){
        hlpr.handleSaveRecord(cmp);
    }
})