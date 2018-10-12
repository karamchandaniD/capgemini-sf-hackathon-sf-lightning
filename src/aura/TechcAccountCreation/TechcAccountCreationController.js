({
    doInit : function(cmp, evt, hlpr){
        hlpr.initAccountRecCreator(cmp);
    },
    handleSaveAccount : function(cmp, evt, hlpr){
        hlpr.handleSaveAccount(cmp);
    },
    handleClose : function(cmp, evt, hlpr){
        cmp.set('v.isCreate', false);
    }
})