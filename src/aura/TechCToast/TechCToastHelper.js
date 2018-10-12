({
	doInit : function(cmp) {
		var self = this;
        window.setTimeout(
            $A.getCallback(function() {
                self.hideTaost(cmp);
            }), 2000
        );
    },
    hideTaost : function(cmp) {
        cmp.set("v.toast.message",'');
        cmp.set("v.toast.type",'');
    }
})