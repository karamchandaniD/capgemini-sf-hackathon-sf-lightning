({
    doInit : function(cmp, evt, hlpr){
        hlpr.doInit(cmp);
    },
    toastChange : function(cmp, evt, hlpr){
        var msg = cmp.get("v.toast.message");
        if(msg){
            hlpr.doInit(cmp);
        }
    },
    handleHide : function(cmp, evt, hlpr){
        hlpr.hideTaost(cmp);
    }
})