({
    loadData : function(cmp, recId){
        cmp.find('recordHandler').set('v.recordId',recId);
    },
    handleDeleteRecord: function(cmp){
        $A.util.removeClass(cmp.find('delSpinner'), 'slds-hide');
        cmp.find("recordHandler").deleteRecord(
            $A.getCallback(function(deleteResult) {
                $A.util.addClass(cmp.find('delSpinner'), 'slds-hide');
                // NOTE: If you want a specific behavior(an action or UI behavior) when this action is successful 
                // then handle that in a callback (generic logic when record is changed should be handled in recordUpdated event handler)
                if (deleteResult.state === "SUCCESS" || deleteResult.state === "DRAFT") {
                    // record is deleted
                    console.log("Record is deleted.");
                } else if (deleteResult.state === "INCOMPLETE") {
                    console.log("User is offline, device doesn't support drafts.");
                } else if (deleteResult.state === "ERROR") {
                    console.log('Problem deleting record, error: ' + JSON.stringify(deleteResult.error));
                } else {
                    console.log('Unknown problem, state: ' + deleteResult.state + ', error: ' + JSON.stringify(deleteResult.error));
                }
            })
        );
    },
    /**
     * Control the component behavior here when record is changed (via any component)
     */
    handleRecordUpdated: function(cmp, evt) {
        var self = this;
        var eventParams = evt.getParams();
        if(eventParams.changeType === "CHANGED") {
           // record is changed
        } else if(eventParams.changeType === "LOADED") {
            // record is loaded in the cache
        } else if(eventParams.changeType === "REMOVED") {
            var techCAccountDML = $A.get("e.c:TechcAccountDML");
            techCAccountDML.setParams(
                {
                    data:{
                        source:'delete',
                        recId:cmp.get('v.recId')
                    }
                }
            )
            techCAccountDML.fire();
            // record is deleted, show a toast UI message
            self._showToast(cmp, {title:'Account Deletion',
                                  message:'Account Deleted Successfully!',
                                  type:'success'});
            window.setTimeout(
                $A.getCallback(function() {
                    cmp.set("v.isDelete", false);
                }), 100
            );
        } else if(eventParams.changeType === "ERROR") {
            self._showToast(cmp, {title:'Account Deletion',
                                  message:JSON.stringify(eventParams),
                                  type:'error'});
        }
    },
    _showToast: function(cmp, toast) {
        var toastEvent = $A.get("e.force:showToast");
        if (toastEvent != 'undefined' && toastEvent != undefined) {
            toastEvent.setParams({
                "title": toast.title,
                "message": toast.message,
                "duration": toast.duration,
                "type": toast.type
            });
            toastEvent.fire();
        } else {
            var techCToast = cmp.find('TechCToast');
            if(techCToast){
                techCToast.set('v.toast',toast);
            }else{
                cmp.set('v.toast',toast);
            }
        }
    },
})