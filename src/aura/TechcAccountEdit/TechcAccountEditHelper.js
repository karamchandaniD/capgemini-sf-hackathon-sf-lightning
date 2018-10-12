({
	loadData : function(cmp, recId){
        $A.util.removeClass(cmp.find('editSpinner'), 'slds-hide');
        cmp.find('recordHandler').set('v.recordId',recId);
        $A.util.addClass(cmp.find('editSpinner'), 'slds-hide');
    },
    
    handleSaveRecord: function(cmp){
        var self = this;
        var accname = cmp.get('v.simpleNewAccount.Name');
        if(accname){
            accname = accname.trim()
        }
        if(!accname){
            self._showToast(cmp, {title:'Account Creation',
                                  message:'Account Name is required!',
                                  type:'error'});
            return;
        }
        $A.util.removeClass(cmp.find('editSpinner'), 'slds-hide');
        cmp.find("recordHandler").saveRecord(
            $A.getCallback(function(saveResult) {
                // NOTE: If you want a specific behavior(an action or UI behavior) when this action is successful 
                // then handle that in a callback (generic logic when record is changed should be handled in recordUpdated event handler)
                if (saveResult.state === "SUCCESS" || saveResult.state === "DRAFT") {
                    // handle component related logic in event handler
                    //self._showToast(cmp,);
                    self.loadAccount(cmp,saveResult.recordId);
                    self._showToast(cmp, {title:'Edit Account',
                                          message:'Account Saved Successfully!',
                                          type:'success'});
                } else if (saveResult.state === "INCOMPLETE") {
                    console.log("User is offline, device doesn't support drafts.");
                    self._showToast(cmp, {title:'Edit Account',
                                          message:'Incompletion',
                                          type:'error'});
                    $A.util.addClass(cmp.find('editSpinner'), 'slds-hide');
                    window.setTimeout(
                        $A.getCallback(function() {
                            cmp.set("v.isEdit", false);
                        }), 100
                    );
                        
                } else if (saveResult.state === "ERROR") {
                    console.log('Problem saving record, error: ' + JSON.stringify(saveResult.error));
                    self._showToast(cmp, {title:'Edit Account',
                                          message:JSON.stringify(saveResult.error),
                                          type:'error'});
                    $A.util.addClass(cmp.find('editSpinner'), 'slds-hide');
                    window.setTimeout(
                        $A.getCallback(function() {
                            cmp.set("v.isEdit", false);
                        }), 100
                    );
                } else {
                    console.log('Unknown problem, state: ' + saveResult.state + ', error: ' + JSON.stringify(saveResult.error));
                }
            })
        );
    },

    /**
     * Control the component behavior here when record is changed (via any component)
     */
    handleRecordUpdated: function(component, event, helper) {
        var eventParams = event.getParams();
        if(eventParams.changeType === "CHANGED") {
            // get the fields that changed for this record
            var changedFields = eventParams.changedFields;
            console.log('Fields that are changed: ' + JSON.stringify(changedFields));
            // record is changed, so refresh the component (or other component logic)
            var resultsToast = $A.get("e.force:showToast");
            resultsToast.setParams({
                "title": "Saved",
                "message": "The record was updated."
            });
            resultsToast.fire();

        } else if(eventParams.changeType === "LOADED") {
            // record is loaded in the cache
        } else if(eventParams.changeType === "REMOVED") {
            // record is deleted and removed from the cache
        } else if(eventParams.changeType === "ERROR") {
            // there’s an error while loading, saving or deleting the record
        }
    },
    loadAccount : function(cmp, recId){
        // create a one-time use instance of the serverEcho action
        // in the server-side controller
        var action = cmp.get("c.getAccount");
        action.setParams({accId:recId});
        // Create a callback that is executed after 
        // the server-side action returns
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {

                var accList = response.getReturnValue();
                var techCAccountDML = $A.get("e.c:TechcAccountDML");
                techCAccountDML.setParams(
                    {
                        data:{
                            source:'edit',
                            rec:accList[0]
                        }
                    }
                )
                techCAccountDML.fire();
                cmp.set("v.isEdit", false);
            }else if (state === "INCOMPLETE") {
                // do something
            }else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                    errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        
        // optionally set storable, abortable, background flag here
        
        // A client-side action could cause multiple events, 
        // which could trigger other events and 
        // other server-side action calls.
        // $A.enqueueAction adds the server-side action to the queue.
        $A.enqueueAction(action);
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